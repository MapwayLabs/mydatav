import { SCALE_FUNC, SCALE_TYPES } from './config';
import { onWebGLInitialized } from './gl-utils';
import { ALL_FIELD_TYPES } from './config';
import {
  getSortingFunction,
  getValueAccessor
} from './utils/data-utils';
import {
  getQuantileDomain,
  getOrdinalDomain,
  getLinearDomain
} from './utils/data-scale-utils';
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

    get visualChannels() {
      return {};
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

    calculateLayerDomain(data, visualChannel) {
      const filteredIndexForDomain = new Array(data.length).fill(-1).map((v, i) => i);
      // const {allData, filteredIndexForDomain} = dataset;
      const defaultDomain = [0, 1];
      const {scale} = visualChannel;
      const scaleType = this.config.visConfig[scale];
  
      const field = this.config.visConfig[visualChannel.field];
      const fieldType = this.config.visConfig[visualChannel.fieldType];
      if (!field) {
        // if colorField or sizeField were set back to null
        return defaultDomain;
      }
  
      if (!SCALE_TYPES[scaleType]) {
        Console.error(`scale type ${scaleType} not supported`);
        return defaultDomain;
      }

      const isTime = fieldType === ALL_FIELD_TYPES.timestamp;
      const valueAccessor = getValueAccessor.bind(null, isTime, null);
      const indexValueAccessor = i => valueAccessor(data[i]['properties'][field]);
  
      const sortFunction = getSortingFunction(fieldType);
  
      switch (scaleType) {
        case SCALE_TYPES.ordinal:
        case SCALE_TYPES.point:
          // do not recalculate ordinal domain based on filtered data
          // don't need to update ordinal domain every time
          // return getOrdinalDomain(allData, valueAccessor);
  
        case SCALE_TYPES.quantile:
          return getQuantileDomain(filteredIndexForDomain, indexValueAccessor, sortFunction);
  
        case SCALE_TYPES.quantize:
        case SCALE_TYPES.linear:
        case SCALE_TYPES.sqrt:
        default:
          return getLinearDomain(filteredIndexForDomain, indexValueAccessor);
      }
    }
}