<template>
  <div class="map-container">
    <div id="map"></div>
    <!-- <canvas id="deck-canvas"></canvas> -->
  </div>
</template>

<script>
/* eslint-disable */
import vue from 'vue';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '../../node_modules/mapbox-gl/dist/mapbox-gl-unminified';
import {Deck} from '@deck.gl/core';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import ScatterplotBrushingLayer from '../layers/deckgl-layers/scatterplot-brushing-layer/scatterplot-brushing-layer';
import { onWebGLInitialized, setLayerBlending } from '../layers/gl-utils';
import ToolTip from '../layers/tooltip';
import { SCALE_TYPES } from '../layers/config';

import scatterData from '../data/bart-stations.json';
import poinData from '../data/sample-geojson-points.json';
import {PointLayer, HeatMapLayer} from '../layers/index';

mapboxgl.accessToken = 'pk.eyJ1IjoibGluZ2h1YW0iLCJhIjoiY2o1dWYzYzlqMDQ4OTJxbzRiZWl5OHdtcyJ9._Ae66CF7CGUIoJlVdrXjqA';

const INITIAL_VIEW_STATE = {
  latitude: 37.75408115730713,
  longitude: -122.30032769568463,
  zoom: 9,
  bearing: 0,
  pitch: 0
};

export default {
  mounted() {
    this._initMap();
  },
  methods: {

    _initMap() {
      window.mapboxgl = mapboxgl;
      this.map = window.map = new mapboxgl.Map({
          container: 'map',
          // style: 'mapbox://styles/mapbox/streets-v11', 
          style: 'mapbox://styles/linghuam/cjxlossd012rv1ckcsbpsvrp1',
          // center: [116, 40],
          center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
          zoom: INITIAL_VIEW_STATE.zoom,
          bearing: INITIAL_VIEW_STATE.bearing,
          pitch: INITIAL_VIEW_STATE.pitch,
          renderWorldCopies: false,
          antialias: true,
          interactive: true,
      });
      this.map.on('load', this._mapLoaded);
    },

    _mapLoaded(e) {
      this.gl = this.map.painter.context.gl;
      onWebGLInitialized(this.gl);
      this.map.setLayerBlending = e => {
        setLayerBlending(this.gl, e);
      }
      this.map.setLayerBlending('normal');
      this.addScatterLayer();
      this.map.tooltip = new ToolTip(this.map, null, 'theme-light');
      // this.addDeckLayr();
    },

    addDeckLayr() {
      const deck = new Deck({
        canvas: 'deck-canvas',
        width: '100%',
        height: '100%',
        initialViewState: INITIAL_VIEW_STATE,
        controller: true,
        onWebGLInitialized: onWebGLInitialized,
        onViewStateChange: ({viewState}) => {
          this.map.jumpTo({
            center: [viewState.longitude, viewState.latitude],
            zoom: viewState.zoom,
            bearing: viewState.bearing,
            pitch: viewState.pitch
          });
        },
        layers: [
          new ScatterplotBrushingLayer({
            id: 'scatterlayer',
            data: poinData.features,
            pickable: true,
            opacity: 0.8,
            stroked: true,
            filled: true,
            radiusScale: 6,
            radiusMinPixels: 50,
            radiusMaxPixels: 500,
            lineWidthMinPixels: 1,
            getPosition: d => d.geometry.coordinates,
            getRadius: d => Math.sqrt(d.exits),
            getFillColor: d => [255, 140, 0],
            getLineColor: d => [0, 0, 0],
          }),
          // new GeoJsonLayer({
          //   id: 'airports',
          //   data: AIR_PORTS,
          //   // Styles
          //   filled: true,
          //   pointRadiusMinPixels: 2,
          //   opacity: 1,
          //   pointRadiusScale: 2000,
          //   getRadius: f => 11 - f.properties.scalerank,
          //   getFillColor: [200, 0, 80, 180],
          //   // Interactive props
          //   pickable: true,
          //   autoHighlight: true,
          //   onClick: info =>
          //     // eslint-disable-next-line
          //     info.object && alert(`${info.object.properties.name} ($      {info.object.properties.abbrev})`)
          // }),
          // new ArcLayer({
          //   id: 'arcs',
          //   data: AIR_PORTS,
          //   dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
          //   // Styles
          //   getSourcePosition: f => [-0.4531566, 51.4709959], // London
          //   getTargetPosition: f => f.geometry.coordinates,
          //   getSourceColor: [0, 128, 200],
          //   getTargetColor: [200, 0, 80],
          //   getWidth: 1
          // })
        ]
      });
    },

    addScatterLayer() {
      const pointLayer = window.pointLayer = new PointLayer({
        id: 'point-layer',
        name: '点图层',
        data: poinData.features.map(f => {
          f.properties.exits = Number(f.properties.exits);
          return f;
        }),
        // data: scatterData.map(e => ({type: 'Feature', 'properties': {weight:Math.sqrt(e.exits)}, geometry:{type:'Point',coordinates: e.coordinates}})),
        visConfig: {
          pointType: 'bubble', // 'scatter' or 'bubble'  点类型：散点或气泡类型
          iconType: 'vector', //  'vector' or 'icon' 图标类型：矢量或图标
          iconName: 'airport-11', // 图标名称
          filled: true, // 是否填充
          fillType: 'single', // 'single' or mutiple 填充类型：单色或多色
          fillColorField: 'exits', // 填充颜色字段名
          // fillColor: ["#5A1846", "#900C3F", "#C70039", "#E3611C", "#F1920E", "#FFC300"],
          fillColor: '#f00', // 填充颜色
          opacity: 0.8, // 图层透明度
          stroked: false, // 是否描边
          strokeColor: '#0f0', // 轮廓颜色
          strokeWidth: 1, // 轮廓宽度
          radius:17.3, // 尺寸
          sizeField: 'exits', // 尺寸基于字段名
          sizeScale: SCALE_TYPES.sqrt,
          sizeRange: [0, 51.5],
          // minRadius: 0, // 最小半径
          // maxRadius: 10.4, /// 最大半径,
          fixedRadius: false, // 半径是否固定为米
        },
        interactionConfig: {
          pickable: false,
          highlightColor: '#f00',
          autoHighlight: true,          
          tooltip: {
              id: 'tooltip',
              enabled: true,
              config: {
                style: 'font-size:12px;', // css样式
                triggerType: 'hover', // 触发方式， 'hover' or 'click'
                displayField: [{name:'exits'}], //显示字段，对象数组 [{name: '字段名', type:'字段类型', ... }]
              }
          }
        }
      });
      const pointLayer2 = window.pointLayer2 = new PointLayer({
        id: 'point-layer2',
        name: '点图层2',
        data: poinData.features.map(f => {
          f.properties.exits = Number(f.properties.exits);
          return f;
        }),
        // data: scatterData.map(e => ({type: 'Feature', 'properties': {weight:Math.sqrt(e.exits)}, geometry:{type:'Point',coordinates: e.coordinates}})),
        visConfig: {
          pointType: 'bubble', // 'scatter' or 'bubble'  点类型：散点或气泡类型
          iconType: 'vector', //  'vector' or 'icon' 图标类型：矢量或图标
          iconName: 'airport-11', // 图标名称
          filled: true, // 是否填充
          fillType: 'mutiple', // 'single' or mutiple 填充类型：单色或多色
          fillColorField: 'exits', // 填充颜色字段名
          fillColor: ["#5A1846", "#900C3F", "#C70039", "#E3611C", "#F1920E", "#FFC300"],
          // fillColor: '#f00', // 填充颜色
          opacity: 0.6, // 图层透明度
          stroked: false, // 是否描边
          strokeColor: '#0f0', // 轮廓颜色
          strokeWidth: 1, // 轮廓宽度
          radius:17.3, // 尺寸
          sizeField: 'exits', // 尺寸基于字段名
          sizeScale: SCALE_TYPES.sqrt,
          sizeRange: [0, 100],
          // minRadius: 0, // 最小半径
          // maxRadius: 10.4, /// 最大半径,
          fixedRadius: false, // 半径是否固定为米
        },
        interactionConfig: {
          pickable: false,
          highlightColor: '#f00',
          autoHighlight: true,          
          tooltip: {
              id: 'tooltip',
              enabled: true,
              config: {
                style: 'font-size:12px;', // css样式
                triggerType: 'hover', // 触发方式， 'hover' or 'click'
                displayField: [{name:'exits'}], //显示字段，对象数组 [{name: '字段名', type:'字段类型', ... }]
              }
          }
        }
      });
      const heatmapLayer = window.heatmapLayer = new HeatMapLayer({
        id: 'heatmapLayer',
        name: '热力图',
        data: poinData,      
        visConfig: {
          isVisible: true, // 热力图是否可见
          heatMapType: 'grid', // 热力图类型：
          weightField: 'exits', // 热度基于字段
          colorRange: ["#f00","#0f0", "#00f", "#ff0"], // 热力颜色
          aggregationType: 'maximum',
          opacity: 1, // 热力透明度
          radius: 2000 // 热力半径（单位：pixels）
        },
        interactionConfig: {
          pickable: true,
          autoHighlight: true,          
          tooltip: {
              id: 'tooltip',
              enabled: true,
              config: {
                style: 'font-size:12px;', // css样式
                triggerType: 'hover', // 触发方式， 'hover' or 'click'
                displayField: [{name:'exits'}], //显示字段，对象数组 [{name: '字段名', type:'字段类型', ... }]
              }
          }
        }
      });
      // this.map.addLayer(pointLayer);
      // this.map.addLayer(pointLayer2);
      this.map.addLayer(heatmapLayer);
      // this.$nextTick(e => {
      //   this.map.setCenter([-122.123801,37.893394]);
      // });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.map-container * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
