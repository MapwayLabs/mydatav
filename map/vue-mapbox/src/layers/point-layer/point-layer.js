import BaseLayer from '../base-layer';
import { MapboxLayer } from '@deck.gl/mapbox';
import ScatterplotBrushingLayer from '../deckgl-layers/scatterplot-brushing-layer/scatterplot-brushing-layer';
import { IconLayer } from '@deck.gl/layers';
import { SCALE_TYPES } from '../config';
import * as d3Color from 'd3-color';
import _ from 'lodash';
import IconMapping from './sprite.json';

function getColorArray(color) {
  const dColor = d3Color.color(color);
  return [dColor.r, dColor.g, dColor.b, dColor.opacity * 255]; 
};

function* generateColor(colors) {
  let index = 0;
  while(index < colors.length + 1) {
    if (index === colors.length) {
      index = 0;
    }
    yield colors[index++];
  }
}

export default class PointLayer extends BaseLayer {

    constructor(props) {
      super(props);
    }

    onAdd(map, gl) {
      super.onAdd(map, gl);
      this._iconLayer = new MapboxLayer(this.getIconLayerProps());
      this._scatterLayer = new MapboxLayer(this.getScatterLayerProps());
      if (this.config.visConfig.pointType === 'scatter' 
      && this.config.visConfig.iconType === 'icon') {
        this._iconLayer.setProps({visible: true});
        this._scatterLayer.setProps({visible: false});
      } else {
        this._iconLayer.setProps({visible: false});
        this._scatterLayer.setProps({visible: true});
      }
      this.map.addLayer(this._iconLayer);
      this.map.addLayer(this._scatterLayer);
    }

    onRemove() {}

    render() {}

    setProps(props) {
      super.setProps(props);
      if (this.config.visConfig.pointType === 'scatter' 
      && this.config.visConfig.iconType === 'icon') {
        // this._iconLayer.setProps({visible: true});
        this._scatterLayer.setProps({visible: false});
        this._iconLayer.setProps(Object.assign({ visible: true } ,this.getIconLayerProps()));
      } else {
        this._iconLayer.setProps({visible: false});
        // this._scatterLayer.setProps({visible: true});
        this._scatterLayer.setProps(Object.assign({ visible: true }, this.getScatterLayerProps()));
      }
    }

    getDefaultLayerConfig(props = {}) {
      return this.mergeConfig({
        id: `${this.id}`,
        name: '点图层',
        visConfig: {
          pointType: 'scatter', // 'scatter' or 'bubble'  点类型：散点或气泡类型
          iconType: 'vector', //  'vector' or 'icon' 图标类型：矢量或图标
          iconName: 'airport-11', // 图标名称
          filled: true, // 是否填充
          fillType: 'single', // 'single' or mutiple 填充类型：单色或多色
          fillColorField: null, // 填充颜色字段名
          fillColorDomain: [0, 1],
          fillColorScale: SCALE_TYPES.quantile,
          fillColor: '#f00', // 填充颜色
          opacity: 1, // 图层透明度
          stroked: false, // 是否描边
          strokeColor: null, // 轮廓颜色
          strokeWidth: 1, // 轮廓宽度
          radius: 10, // 尺寸
          sizeField: null, // 尺寸基于字段名
          sizeScale: SCALE_TYPES.linear,
          sizeDomain: [0, 1],
          minRadius: 1, // 最小半径
          maxRadius: 10, /// 最大半径,
          fixedRadius: false, // 半径是否固定为米
        },
        interactionConfig: {
          pickable: false,
          highlightColor: 'rgba(0, 0, 128, 128)',
          autoHighlight: false,
        }
      }, super.getDefaultLayerConfig(props));
    }

    getScatterLayerProps() {
      const interactionConfig = this.config.interactionConfig;
      const visConfig = this.config.visConfig;
      const enableBrushing = interactionConfig.brush.enabled;
      const radiusScale = this.getRadiusScaleByZoom(this.getMapState());

      const layerProps = {
        stroked: visConfig.stroked,
        filled: visConfig.filled,
        radiusMinPixels: 1,
        lineWidthMinPixels: visConfig.strokeWidth,
        radiusScale: radiusScale,
        opacity: visConfig.opacity,
        ...(visConfig.fixedRadius ? {} : {radiusMaxPixels: 500})
      };

      const interaction = {
        pickable: interactionConfig.pickable,
        highlightColor: getColorArray(interactionConfig.highlightColor),
        autoHighlight: interactionConfig.autoHighlight,
        enableBrushing,
        brushRadius: interactionConfig.brush.config.size * 1000
      };
      if (interactionConfig.tooltip.enabled) {
        const triggerType = interactionConfig.tooltip.config.triggerType === 'hover' ? 'onHover' : 'onClick';
        const displayField = interactionConfig.tooltip.config.displayField;
        interaction[triggerType] = (info, event) => {
          if (info.picked) {
            const keyValuePairs = [];
            displayField.forEach(f => {
              keyValuePairs.push({
                key: f.name,
                value: info.object['properties'][f.name]
              });
            });
            const lnglat = info.lngLat;
            this.map.tooltip.open(keyValuePairs, lnglat);
          } else {
            this.map.tooltip.close();
          }
          return true;
        };
      }

      const dataAccessors = {
        getPosition: d => d.geometry.coordinates,
        getRadius: this.getRadius(),
        getFillColor: this.getFillColor(),
        getLineColor: this.getLineColor(),
        getLineWith: this.getLineWidth()
      };
    
      // 定义数据变化的依赖，只有依赖的属性变化时才更新相应方法
      const updateTriggers = {
        getRadius: {
          pointType: visConfig.pointType,
          sizeField: visConfig.sizeField,
          minRadius: visConfig.minRadius,
          maxRadius: visConfig.maxRadius,
          radius: visConfig.radius,
          fixedRadius: visConfig.fixedRadius,
        },
        getFillColor: {
          fillType: visConfig.fillType,
          fillColor: visConfig.fillColor.toString(),
          fillColorField: visConfig.fillColorField,
          fixedRadius: visConfig.fixedRadius
        },
        getLineColor: {
          stroked: visConfig.stroked,
          strokeColor: visConfig.strokeColor
        },
        getLineWith: {
          stroked: visConfig.stroked,
          strokeWidth: visConfig.strokeWidth
        }
      };

      return {
        id: `${this.id}-scatter`,
        type: ScatterplotBrushingLayer,
        data: this.data,
        ...layerProps,
        ...interaction,
        ...dataAccessors,
        updateTriggers
      };
    }

    getIconLayerProps() {
      const interactionConfig = this.config.interactionConfig;
      const visConfig = this.config.visConfig;
      const radiusScale = this.getRadiusScaleByZoom(this.getMapState());

      const layerProps = {
        opacity: visConfig.opacity,
        iconAtlas: './sprite.png',
        iconMapping: IconMapping,
        sizeScale: radiusScale,
        sizeUnits: 'pixels',
        sizeMinPixels: 0,
        sizeMaxPixels: 500
      };

      const interaction = {
        pickable: interactionConfig.pickable,
        highlightColor: getColorArray(interactionConfig.highlightColor),
        autoHighlight: interactionConfig.autoHighlight
      };

      const dataAccessors = {
        getIcon: d => visConfig.iconName,
        // 方法二：通过文件路径引入图标
        // getIcon: d => ({
        //   url: './water.svg',
        //   width: 128,
        //   height: 128,
        //   anchorY: 128
        // }),
        getPosition: d => d.geometry.coordinates
      };

      const updateTriggers = {
        getIcon: {
          iconName: visConfig.iconName
        }
      };

      return {
        id: `${this.id}-icon`,
        type: IconLayer,
        data: this.data,
        ...layerProps,
        ...interaction,
        ...dataAccessors,
        updateTriggers
      };
    }

    getFillColor() {
      const visConfig = this.config.visConfig;
      if (visConfig.fillType === 'single') {
        return getColorArray(visConfig.fillColor);
      } else {
        if (visConfig.fillColorField) {
          const colorDomain = this.getFieldMinMaxValue(visConfig.fillColorField);
          const colorRange = Array.isArray(visConfig.fillColor) ? visConfig.fillColor : [visConfig.fillColor];
          const scale = this.getVisChannelScale(visConfig.fillColorScale, colorDomain, colorRange, visConfig.fixedRadius);
          return d => {
            const value = Number(d['properties'][visConfig.fillColorField]);
            return value == undefined ? [0,0,0,0] : getColorArray(scale(value));
          }
        } else {
          const g = generateColor(visConfig.fillColor);
          return d => getColorArray(g.next().value);
        }
      }
    }

    getFieldMinMaxValue(field) {
      const array = this.data.map(d => Number(d['properties'][field]));
      return [Math.min(...array), Math.max(...array)];
    };
    
    getLineColor() {
      const visConfig = this.config.visConfig;
      if (visConfig.strokeColor) {
        return getColorArray(visConfig.strokeColor);
      }
      return [0, 0, 0, 255];
    }
    
    getLineWidth() {
      const visConfig = this.config.visConfig;
      if (visConfig.stroked) {
        return visConfig.strokeWidth;
      }
      return 1;
    }
    
    getRadius() {
      const visConfig = this.config.visConfig;
      if (visConfig.pointType === 'bubble' && visConfig.sizeField) {
        const sizeDomain = this.getFieldMinMaxValue(visConfig.sizeField);
        const radiusRange = [visConfig.minRadius, visConfig.maxRadius];
        const scale = this.getVisChannelScale(visConfig.sizeScale, sizeDomain, radiusRange, visConfig.fixedRadius);
        return d => {
          const value = Number(d['properties'][visConfig.sizeField]);
          return value == undefined ? 0 : scale(value);
        }
      }
      return visConfig.radius;
    }
}