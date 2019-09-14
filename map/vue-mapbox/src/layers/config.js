import keymirror from 'keymirror';
import {
    scaleLinear,
    scaleQuantize,
    scaleQuantile,
    scaleOrdinal,
    scaleSqrt,
    scaleLog,
    scalePoint
} from 'd3-scale';

export const SCALE_TYPES = keymirror({
    ordinal: null,
    quantile: null,
    quantize: null,
    linear: null,
    sqrt: null,
    log: null,
  
    // ordinal domain to linear range
    point: null
});

export const SCALE_FUNC = {
    [SCALE_TYPES.linear]: scaleLinear,
    [SCALE_TYPES.quantize]: scaleQuantize,
    [SCALE_TYPES.quantile]: scaleQuantile,
    [SCALE_TYPES.ordinal]: scaleOrdinal,
    [SCALE_TYPES.sqrt]: scaleSqrt,
    [SCALE_TYPES.log]: scaleLog,
    [SCALE_TYPES.point]: scalePoint
};

export const LAYER_BLENDINGS = {
    additive: {
      blendFunc: ['SRC_ALPHA', 'DST_ALPHA'],
      blendEquation: 'FUNC_ADD'
    },
    normal: {
      // reference to
      // https://limnu.com/webgl-blending-youre-probably-wrong/
      blendFunc: [
        'SRC_ALPHA',
        'ONE_MINUS_SRC_ALPHA',
        'ONE',
        'ONE_MINUS_SRC_ALPHA'
      ],
      blendEquation: ['FUNC_ADD', 'FUNC_ADD']
    },
    subtractive: {
      blendFunc: ['ONE', 'ONE_MINUS_DST_COLOR', 'SRC_ALPHA', 'DST_ALPHA'],
      blendEquation: ['FUNC_SUBTRACT', 'FUNC_ADD']
    }
  };