import keyMirror from 'keymirror';
import {
  scaleLinear,
  scaleQuantize,
  scaleQuantile,
  scaleOrdinal,
  scaleSqrt,
  scaleLog,
  scalePoint
} from 'd3-scale';

export const SCALE_TYPES = keyMirror({
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

// https://drawpaintacademy.com/subtractive-additive-color/
// http://www.colorbasics.com/AdditiveSubtractiveColors/
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

  export const ALL_FIELD_TYPES = keyMirror({
    boolean: null,
    date: null,
    geojson: null,
    integer: null,
    real: null,
    string: null,
    timestamp: null,
    point: null
  });

  export const AGGREGATION_TYPES = {
    // default
    count: 'count',
    // linear
    average: 'average',
    maximum: 'maximum',
    minimum: 'minimum',
    median: 'median',
    sum: 'sum',
    // ordinal
    mode: 'mode',
    countUnique: 'count unique'
  };