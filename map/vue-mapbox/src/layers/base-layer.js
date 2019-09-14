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
        // this.props = props;
        this.config = this.getDefaultLayerConfig(props);
        this.needUpdate = false;
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
        _.merge(this.config, props);
        console.log('newProps', this.config);
        this.needUpdate = true;
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

    getDefaultLayerConfig(props = {}) {
      return _.merge({
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
              enabled: false,
              config: {}
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