import { SCALE_TYPES } from './config';

export default class BaseLayer {

    constructor(props) {
        this.id = props.id;
        this.type = 'custom';
        this.renderingMode = props.renderingMode || '3d';
        
        this.layerType = 'unKnown';
        this.map = null;
        this.data = props.data || null;
        this.props = props;
        this.config = this.getDefaultLayerConfig(props);
    }

    onAdd(map, gl) {
        this.map = map;
    }

    onRemove() {}

    prerender(gl, matrix) {}

    render(gl, matrix) {}

    getDefaultLayerConfig(props = {}) {
        return {
            id: props.id || null,
            name: props.name || '新图层',
            isVisible: props.isVisible || false,
            highlightColor: props.highlightColor || [252, 242, 26, 255],

            // colorField: null,
            // colorDomain: [0, 1],
            // colorScale: SCALE_TYPES.quantile,
            
            // sizeField: null,
            // sizeDomain: [0, 1],
            // sizeScale: SCALE_TYPES.linear,
            
            visConfig: {}
        };
    }
}