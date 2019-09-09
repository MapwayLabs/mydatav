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

mapboxgl.accessToken = 'pk.eyJ1IjoibGluZ2h1YW0iLCJhIjoiY2o1dWYzYzlqMDQ4OTJxbzRiZWl5OHdtcyJ9._Ae66CF7CGUIoJlVdrXjqA';

export default {
  name: 'Map',
  mounted() {
    this.map = vue.$map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        // style: 'mapbox://styles/linghuam/cjxlh5bfw0vgi1cn19s9nu2o4',
        center: [116, 40], // starting position [lng, lat]
        zoom: 6, // starting zoom,
        bearing: 0, // 方位角，以正北方的逆时针转动度数计量。
        pitch: 0, // 地图的初始倾斜度，按偏离屏幕水平面的度数计量（0-60）。
        renderWorldCopies: false,
        attributionControl: false,
        preserveDrawingBuffer: true, // 如果为  true ，即可使用  map.getCanvas().toDataURL() 将地图画布输出到 PNG。
        trackResize: true,
    });

    this.map.on('load', this._mapLoaded);
  },
  methods: {
    _mapLoaded() {
      const myDeckLayer = new MapboxLayer({
          id: 'my-scatterplot',
          type: ScatterplotLayer,
          data: [
                {position: [116, 40], size: 100},
                {position: [114, 30], size: 10},
          ],
          getPosition: d => d.position,
          getRadius: d => d.size,
          getFillColor: [255, 0, 0],
          getLineColor: [255, 0, 0]
      });
      this.map.addLayer(myDeckLayer);

      const myGeojsonlayer = new MapboxLayer({
        id: 'geojson-layer',
        type: GeoJsonLayer,
        data: geojsonData,
        getFillColor: [160, 160, 180, 200]
      });
      this.map.addLayer(myGeojsonlayer);
      
      console.log('hexagonData', hexagonData);
      const myHexagonLayer = new MapboxLayer({
        id: 'hexagon-layer',
        type: HexagonLayer,
        data: hexagonData,
        extruded: false,
        radius: 200,
        elevationScale: 4,
        getPosition: d => d.COORDINATES
      });
      this.map.addLayer(myHexagonLayer);
      this.$nextTick(e => {
        this.map.setCenter([-122.42177834,37.78346622]);
      });
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
