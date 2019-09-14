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
// import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import ScatterplotBrushingLayer from '../layers/deckgl-layers/scatterplot-brushing-layer/scatterplot-brushing-layer';
import {onWebGLInitialized} from '../layers/gl-utils';

import scatterData from '../data/bart-stations.json';
import poinData from '../data/pointData.json';
import {PointLayer} from '../layers/index';

mapboxgl.accessToken = 'pk.eyJ1IjoibGluZ2h1YW0iLCJhIjoiY2o1dWYzYzlqMDQ4OTJxbzRiZWl5OHdtcyJ9._Ae66CF7CGUIoJlVdrXjqA';

export default {
  mounted() {
    this._initMap();
  },
  methods: {

    _initMap() {
      this.map = window.map = new mapboxgl.Map({
          container: 'map',
          // style: 'mapbox://styles/mapbox/streets-v11', 
          style: 'mapbox://styles/linghuam/cjxlossd012rv1ckcsbpsvrp1',
          center: [116, 40],
          zoom: 8,
          bearing: 0,
          pitch: 0,
          renderWorldCopies: false,
          antialias: true
      });
      this.map.on('load', this._mapLoaded);
    },

    _mapLoaded() {
      this.addScatterLayer();
      // this.addDeckLayr();
    },

    addDeckLayr() {
      const INITIAL_VIEW_STATE = {
        latitude: 40,
        longitude: 116,
        zoom: 8,
        bearing: 0,
        pitch: 0
      };
      const deck = new Deck({
        canvas: 'deck-canvas',
        width: '100%',
        height: '100%',
        initialViewState: INITIAL_VIEW_STATE,
        controller: true,
        onWebGLInitialized: onWebGLInitialized,
        onViewStateChange: ({viewState}) => {
          map.jumpTo({
            center: [viewState.longitude, viewState.latitude],
            zoom: viewState.zoom,
            bearing: viewState.bearing,
            pitch: viewState.pitch
          });
        },
        layers: [
          new ScatterplotBrushingLayer({
            id: 'scatterlayer',
            data: scatterData,
            pickable: true,
            opacity: 0.8,
            stroked: true,
            filled: true,
            radiusScale: 6,
            radiusMinPixels: 50,
            radiusMaxPixels: 100,
            lineWidthMinPixels: 1,
            getPosition: d => d.coordinates,
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
      this.map.addLayer(new PointLayer({
        id: 'point-layer',
        name: '点图层',
        // data: poinData.features,
        data: scatterData.map(e => ({type: 'Feature', 'properties': {weight:Math.sqrt(e.exits)}, geometry:{type:'Point',coordinates: e.coordinates}})),
        isVisible: true,
        visConfig: {
          pointType: 'bubble',
          iconType: 'vector',
          fillType: 'mutiple',
          fillColor: ['#f00', '#0f0', '#00f', '#ff0'],
          // fillColor: '#f00',
          radiusScale: 1,
          radius: 1,
          minRadius: 1,
          maxRadius: 100,
          sizeField: 'weight'
        }
      }));
      this.$nextTick(e => {
        this.map.setCenter([-122.123801,37.893394]);
      });
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
