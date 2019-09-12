<template>
  <div class="map">
    <div id="map"></div>
  </div>
</template>

<script>
/* eslint-disable */
import vue from 'vue';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '../../node_modules/mapbox-gl/dist/mapbox-gl-unminified';
import {MapboxLayer} from '@deck.gl/mapbox';
import {ScatterplotLayer} from '@deck.gl/layers';
import scatterData from '../data/bart-stations.json';
import geojsonData from '../data/110100.json';
import hexagonData from '../data/sf-bike-parking.json';
import {GeoJsonLayer} from '@deck.gl/layers';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import {IconLayer} from '@deck.gl/layers';
import addHeatMap from '../js/heatmap';
import addArcLayer from '../js/arcmap';
import poinData from '../data/pointData.json';
import {PointLayer} from '../layers/index';

mapboxgl.accessToken = 'pk.eyJ1IjoibGluZ2h1YW0iLCJhIjoiY2o1dWYzYzlqMDQ4OTJxbzRiZWl5OHdtcyJ9._Ae66CF7CGUIoJlVdrXjqA';

export default {
  name: 'Map',
  mounted() {
    vue.$mapboxgl = mapboxgl;
    this.map = vue.$map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        // style: 'mapbox://styles/linghuam/cjxlossd012rv1ckcsbpsvrp1',
        center: [116, 40], // starting position [lng, lat]
        zoom: 6, // starting zoom,
        bearing: 0, // 方位角，以正北方的逆时针转动度数计量。
        pitch: 0, // 地图的初始倾斜度，按偏离屏幕水平面的度数计量（0-60）。
        renderWorldCopies: false,
        attributionControl: false,
        preserveDrawingBuffer: true, // 如果为  true ，即可使用  map.getCanvas().toDataURL() 将地图画布输出到 PNG。
        trackResize: true,
        antialias: true
    });

    this.map.on('load', this._mapLoaded);
  },
  methods: {
    _mapLoaded() {
       
      this.map.addLayer(new PointLayer({
        id: 'point-layer',
        name: '点图层',
        data: poinData.features,
        isVisible: true,
        visConfig: {}
      }));

      // const myDeckLayer = new MapboxLayer({
      //     id: 'my-scatterplot',
      //     type: ScatterplotLayer,
      //     data: scatterData,
      //     getPosition: d => d.coordinates,
      //     getRadius: e => Math.sqrt(e.exits),
      //     // getRadius: 100,
      //     getFillColor: [255, 0, 0],
      //     getLineColor: [255, 0, 0]
      // });
      // this.map.addLayer(myDeckLayer);
      // this.$nextTick(e => {
      //   this.map.setCenter([-122.123801,37.893394]);
      // });
      // const ICON_MAPPING = {
      //   marker: {x: 0, y: 0, width: 32, height: 32, mask: true}
      // };

      // const myIconLayer = new MapboxLayer({
      //     id: 'my-iconLayer',
      //     type: IconLayer,
      //     data: scatterData,
      //     // iconAtlas: './icon-atlas.png',
      //     // iconMapping: ICON_MAPPING,
      //     pickable: true,
      //     autoHighlight: true,
      //     sizeScale: 15,
      //     getSize: d => 1,
      //     getIcon: d => ({
      //       url: './water.svg',
      //       width: 256,
      //       height: 256,
      //       anchorY: 0
      //     }),
      //     // getColor: d => [Math.sqrt(d.exits), 140, 0],
      //     getColor: d => [0, 255, 0],
      //     getPosition: d => d.coordinates
      // });
      // this.map.addLayer(myIconLayer);
      // this.$nextTick(e => {
      //   this.map.setCenter([-122.123801,37.893394]);
      // });

      // const myGeojsonlayer = new MapboxLayer({
      //   id: 'geojson-layer',
      //   type: GeoJsonLayer,
      //   data: geojsonData,
      //   getFillColor: [160, 160, 180, 200]
      // });
      // this.map.addLayer(myGeojsonlayer);
      
      // console.log('hexagonData', hexagonData);
      // const myHexagonLayer = new MapboxLayer({
      //   id: 'hexagon-layer',
      //   type: HexagonLayer,
      //   data: hexagonData,
      //   extruded: false,
      //   radius: 200,
      //   elevationScale: 4,
      //   autoHighlight: true,
      //   getPosition: d => d.COORDINATES,
      //   pickable: true,
      //   // onHover: (e) => {
      //   //   console.log('onHover', e);
      //   // },
      //   // onClick: (e) => {
      //   //   console.log('onClick', e);
      //   // }
      // });
      // this.map.addLayer(myHexagonLayer);
      // myHexagonLayer.implementation.setProps({extruded:true});
      // this.$nextTick(e => {
      //   this.map.setCenter([-122.42177834,37.78346622]);
      // });

      // addHeatMap(this.map);
      // addArcLayer(this.map);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  position:absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0;
}
</style>
