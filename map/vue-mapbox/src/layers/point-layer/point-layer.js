import BaseLayer from '../base-layer';
import { MapboxLayer } from '@deck.gl/mapbox';
import ScatterplotBrushingLayer from '../deckgl-layers/scatterplot-brushing-layer/scatterplot-brushing-layer';
import { SCALE_TYPES } from '../config';
import * as d3Color from 'd3-color';
import _ from 'lodash';

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
      if (this.config.visConfig.pointType === 'scatter' 
         && this.config.visConfig.iconType === 'icon') {
          const sourceId = `${this.id}-${this.config.visConfig.pointType}-${this.config.visConfig.iconType}-source`;
          this.map.addSource(sourceId, {
            type: 'geojson',
            data: {type:'FeatureCollection', features: this.data} 
          });
          this.map.addLayer({
            id: `${this.id}-${this.config.visConfig.pointType}-${this.config.visConfig.iconType}`,
            type: 'symbol',
            source: sourceId,
            layout: {
              'visibility': this.config.isVisible ? 'visible' : 'none',
              'icon-size': this.config.visConfig.radius,
              'icon-image': this.config.visConfig.iconName,
            },
            paint: {
              'icon-opacity': this.config.visConfig.opacity
            }
          });
      } else {
        const scatterLayer = window.scatterLayer = new MapboxLayer(this.getDeckProps());
        this.map.addLayer(scatterLayer);
      }
    }

    onRemove() {}

    render() {
      if (window.scatterLayer) {
        const options = this.getDeckProps();
        delete options.id;
        window.scatterLayer.setProps(options);
      }
    }

    getDefaultLayerConfig(props = {}) {
      return _.merge({
        id: `${this.id}-scatter`,
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

    getMapState() {
      return {
        zoom: this.map.getZoom(),
        minZoom: this.map.getMinZoom(),
        maxZoom: this.map.getMaxZoom(),
        pitch: this.map.getPitch(),
        bearing: this.map.getBearing(),
        latitude: this.map.getCenter()[1],
        longitude: this.map.getCenter()[0]
      };
    }

    getDeckProps() {
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

      const dataAccessors = {
        getPosition: d => d.geometry.coordinates,
        getRadius: this.getRadius(),
        getColor: [0, 0, 0, 255],
        getFillColor: this.getFillColor(),
        getLineColor: this.getLineColor(),
        getLineWith: this.getLineWidth()
      };

      return {
        id: `${this.id}-scatter`,
        type: ScatterplotBrushingLayer,
        data: this.data,
        ...layerProps,
        ...interaction,
        ...dataAccessors
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