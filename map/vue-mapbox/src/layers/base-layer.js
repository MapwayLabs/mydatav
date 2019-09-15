import { SCALE_FUNC } from './config';
import { onWebGLInitialized } from './gl-utils';
import _ from 'lodash';

export default class BaseLayer {

    constructor(props) {
        this.id = props.id;
        this.type = 'custom';
        this.renderingMode = props.renderingMode || '3d';
        
        this.layerType = 'unKnown';
        this.map = null;
        this.data = props.data || null;
        this.config = this.getDefaultLayerConfig(props);
    }

    onAdd(map, gl) {
        this.map = map;
        onWebGLInitialized(gl);
    }

    onRemove() {}

    prerender(gl, matrix) {}

    render(gl, matrix) {}

    setProps(props) {
      console.log('oldProps', this.config);
      this.data = props.data || this.data;
      this.mergeConfig(this.config, props);
      console.log('newProps', this.config);
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

    mergeConfig(config, props = {}) {
      config = config || {};
      config.id = props.id || null;
      config.name = props.name || '新图层',
      config.visConfig = Object.assign(config.visConfig, props.visConfig);
      config.interactionConfig = Object.assign(config.interactionConfig, props.interactionConfig);
      return config;
    }

    getDefaultLayerConfig(props = {}) {
      return this.mergeConfig({
        id: null,
        name: '新图层',
        visConfig:{
            isVisible: true,
            fixedRadius: false,
            sizeField: null
        },
        interactionConfig: {
          tooltip: {
              id: 'tooltip',
              enabled: true,
              config: {
                style: 'font-size:12px;', // css样式
                triggerType: 'hover', // 触发方式， 'hover' or 'click'
                displayField: [], //显示字段，对象数组 [{name: '字段名', type:'字段类型', ... }]
              }
          },
          brush: {
              id: 'brush',
              enabled: false,
              config: {
                  size: .5
              }
          },
          coordinate: {
              id: 'coordinate',
              enabled: false,
              position: null
          }
        }
      }, props);
    }

    getRadiusScaleByZoom(mapState, fixedRadius) {
      const fixed = fixedRadius === undefined ? this.config.visConfig.fixedRadius : fixedRadius;
      const {radius} = this.config.visConfig;
      return fixed ? 1 : (this.config.visConfig['sizeField'] ? 1 : radius) * this.getZoomFactor(mapState);
    }

    getZoomFactor({zoom, zoomOffset = 0}) {
        return Math.pow(2, Math.max(14 - zoom + zoomOffset, 0));
    }

    getVisChannelScale(scale, domain, range, fixed) {
      return SCALE_FUNC[fixed ? 'linear' : scale]()
        .domain(domain)
        .range(fixed ? domain : range);
    }
}