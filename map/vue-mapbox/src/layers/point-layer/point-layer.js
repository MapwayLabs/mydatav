import BaseLayer from '../base-layer';
import { MapboxLayer } from '@deck.gl/mapbox';
// import { ScatterplotLayer } from '@deck.gl/layers';
import ScatterplotBrushingLayer from '../deckgl-layers/scatterplot-brushing-layer/scatterplot-brushing-layer';
import {onWebGLInitialized} from '../gl-utils';
import { SCALE_TYPES, SCALE_FUNC } from '../config';
import * as d3Color from 'd3-color';

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
      onWebGLInitialized(gl);
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
        const options = {
          id: `${this.id}-${this.config.visConfig.pointType}-${this.config.visConfig.iconType}`,
          // type: ScatterplotLayer,
          type: ScatterplotBrushingLayer,
          data: this.data,
          visible: this.config.isVisible,
          opacity: this.config.visConfig.opacity,
          
          radiusScale: 1,
          lineWidthUnits: 'pixels',
          lineWidthScale: 1,
          stroked: !!this.config.visConfig.strokeColor,
          filled: !!this.config.visConfig.fillColor,
          // radiusMinPixels: 1,
          // radiusMaxPixels: 100,
          lineWidthMinPixels: 0,
          lineWidthMaxPixels: 100,
          brushRadius: 10,
          outsideBrushRadius: 10,

          getPosition: d => d.geometry.coordinates,
          // getRadius: this.getRadius(),
          getFillColor: this.getFillColor(), 
          getLineColor: this.getLineColor(),
          getLineWidth: this.getLineWidth()
        };
        const scatterLayer = new MapboxLayer(options);
        this.map.addLayer(scatterLayer);
      }
    }

    onRemove() {}

    render() {
        
    }

    getFillColor() {
      const config = this.config;
      if (config.visConfig.fillType === 'single') {
        return getColorArray(config.visConfig.fillColor);
      } else {
        if (config.visConfig.fillColorField) {
          const minMax = this.getFieldMinMaxValue(config.visConfig.fillColorField);
          const scaleFunction = SCALE_FUNC.quantize;
          const colors = config.visConfig.fillColor;
          const scale = scaleFunction().domain([0,1]).range(colors);
          return d => {
            const ratio = d['properties'][config.visConfig.fillColorField] / minMax[1];
            return getColorArray(scale(ratio));
          } 
        } else {
          const g = generateColor(config.visConfig.fillColor);
          return d => getColorArray(g.next().value);
        }
      }
    }

    getFieldMinMaxValue(field) {
      const array = this.data.map(d => Number(d['properties'][field]));
      return [Math.min(...array), Math.max(...array)];
    };
    
    getLineColor() {
      const config = this.config;
      if (config.visConfig.strokeColor) {
        return getColorArray(config.visConfig.strokeColor);
      }
      return [0, 0, 0, 255];
    }
    
    getLineWidth() {
      const config = this.config;
      if (config.visConfig.strokeColor) {
        return config.visConfig.strokeWidth;
      }
      return 1;
    }
    
    getRadius() {
      const config = this.config;
      if (config.visConfig.pointType === 'bubble' && config.visConfig.sizeField) {
        const minMax = this.getFieldMinMaxValue(config.visConfig.sizeField);
        const scaleFunction = SCALE_FUNC.quantize;
        const radius = [config.visConfig.minRadius, config.visConfig.maxRadius];
        const scale = scaleFunction().domain([0,1]).range(radius);
        return d => {
          // const ratio = d['properties'][config.visConfig.sizeField] / minMax[1];
          // return scale(ratio);
          return d['properties'][config.visConfig.sizeField];
        };
      }
      return config.visConfig.radius;
    }

    getDefaultLayerConfig(props = {}) {
      super.getDefaultLayerConfig(props);
      return {
        id: props.id || null,
        name: props.name || '新图层',
        isVisible: props.isVisible || false,
        highlightColor: props.highlightColor || [252, 242, 26, 255],
            
        visConfig: Object.assign({
          pointType: 'scatter', // 'scatter' or 'bubble'  点类型：散点或气泡类型
          iconType: 'vector', //  'vector' or 'icon' 图标类型：矢量或图标
          iconName: 'airport-11', // 图标名称
          fillType: 'single', // 'single' or mutiple 填充类型：单色或多色
          fillColorField: null,
          fillColor: '#f00', // 填充颜色
          opacity: 1, // 图层透明度
          strokeColor: null, // 轮廓颜色
          strokeWidth: 1, // 轮廓宽度
          radius: 10, // 尺寸
          sizeField: null,
          minRadius: 1, // 最小半径
          maxRadius: 10 /// 最大半径
        }, props.visConfig)
      };
    }
}