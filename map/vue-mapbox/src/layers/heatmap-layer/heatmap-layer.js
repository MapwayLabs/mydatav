import BaseLayer from '../base-layer';
import { MapboxLayer } from '@deck.gl/mapbox';
import { SCALE_FUNC, SCALE_TYPES, ALL_FIELD_TYPES, AGGREGATION_TYPES } from '../config';
import { hexToRgb, getColorArray } from '../utils/color-utils';
import { GridLayer } from '@deck.gl/aggregation-layers';
import { aggregate } from '../utils/aggregate-utils';
// import HexagonLayer from '../deckgl-layers/hexagon-layer/enhanced-hexagon-layer';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { PolygonLayer } from '@deck.gl/layers';

/**
 *
 * @param {Object} colorRange
 * @return {Array} [
 *  0, "rgba(33,102,172,0)",
 *  0.2, "rgb(103,169,207)",
 *  0.4, "rgb(209,229,240)",
 *  0.6, "rgb(253,219,199)",
 *  0.8, "rgb(239,138,98)",
 *  1, "rgb(178,24,43)"
 * ]
 */
const heatmapDensity = colorRange => {
  const scaleFunction = SCALE_FUNC.quantize;

  const colors = ['#000000', ...colorRange];

  const scale = scaleFunction()
    .domain([0, 1])
    .range(colors);

  const colorDensity = scale.range().reduce((bands, level) => {
    const invert = scale.invertExtent(level);
    return [
      ...bands,
      invert[0], // first value in the range
      `rgb(${hexToRgb(level).join(',')})` // color
    ];
  }, []);
  colorDensity[1] = 'rgba(0,0,0,0)';
  return colorDensity;
};

export default class HeatMapLayer extends BaseLayer {

  onAdd(map, gl) {
    super.onAdd(map, gl);
    const visConfig = this.config.visConfig;
    if (visConfig.heatMapType === 'basic') {
      this._basicHeatMapSourceId = `${this.id}-${visConfig.heatMapType}-source`;
      this._basicHeatMapLayerId = `${this.id}-${visConfig.heatMapType}-layer`;
      this.map.addSource(this._basicHeatMapSourceId, {
        type: 'geojson',
        data: this.data
      });
      this.map.addLayer(this.getBasicHeatMapLayerProps());
    } else if (visConfig.heatMapType === 'grid') {
      this._gridLayer = new MapboxLayer(this.getGridHeatMapLayerProps());
      this.map.addLayer(this._gridLayer);
    } else if (visConfig.heatMapType === 'hexagon') {
      this._hexagonLayer = new MapboxLayer(this.getHexagonHeatMapLayerProps());
      this.map.addLayer(this._hexagonLayer);
    } else if (visConfig.heatMapType === 'district') {
      this._districtLayer = new MapboxLayer(this.getDistrictHeatMapLayerProps());
      this.map.addLayer(this._districtLayer);
    }
  }

  onRemove() {}

  render() {}

  setProps(props) {
    super.setProps(props);
    const visConfig = this.config.visConfig;
    if (visConfig.heatMapType === 'basic') {
      this.map.getSource(this._basicHeatMapSourceId).setData(this.data);
      this.map.removeLayer(this._basicHeatMapLayerId);
      this.map.addLayer(this.getBasicHeatMapLayerProps());
    }
  }

  get visualChannels() {
    return {
      weight: {
        field: 'weightField',
        fieldType: 'weightFieldType',
        scale: 'weightScale',
        domain: 'weightDomain',
        range: 'weightRange'
      }
    };
  }

  getDefaultLayerConfig(props = {}) {
    return this.mergeConfig({
      id: `${this.id}`,
      name: '热力图层',
      visConfig: {
        isVisible: true, // 热力图是否可见
        heatMapType: 'basic', // 热力图类型：'basic' | 'grid' | 'hexagon' | 'district'

        weightField: null, // 热度基于字段名
        weightFieldType: ALL_FIELD_TYPES.real,
        weightDomain: [0, 1],
        weightScale: SCALE_TYPES.linear,
        weightRange: [0, 1],
        
        colorRange: ["#5A1846", "#900C3F", "#C70039"], // 热力颜色
        opacity: 1, // 热力透明度
        radius: 30, // 热力半径（basic单位：pixels, grid单位：meters）

        // grid、hexagon 类型独有
        aggregationType: AGGREGATION_TYPES.count, // 聚合类型：'count' | 'average' | 'maximum' | 'minimum' | 'median' | 'sum'
        sizeUnit: 'meters', // 尺寸单位： 'pixels' | 'meters',
        
        // district 独有
        stroked: true,
        strokeColor: '#f00',
        strokeWidth: 1,
        regionCode: '100000'
      },
      interactionConfig: {
        pickable: false
      }
    }, super.getDefaultLayerConfig(props));
  }

  getTooltipInterAction() {
    const interactionConfig = this.config.interactionConfig;
    if (interactionConfig.tooltip.enabled) {
      const triggerType = interactionConfig.tooltip.config.triggerType === 'hover' ? 'onHover' : 'onClick';
      const displayField = interactionConfig.tooltip.config.displayField;
      return {
        [triggerType]: (info, event) => {
          if (info.picked) {
            const keyValuePairs = [];
            displayField.forEach(f => {
              info.object.points.forEach(p => {
                keyValuePairs.push({
                  key: f.name,
                  value: p['properties'][f.name]
                });
              });
            });
            const lnglat = info.lngLat;
            this.map.tooltip.open(keyValuePairs, lnglat);
          } else {
            this.map.tooltip.close();
          }
          return true;
        }
      }
    };
    return {};
  }
  
  // 行政区热力图的信息气泡
  getDistrictTooltipInterAction() {
    const interactionConfig = this.config.interactionConfig;
    if (interactionConfig.tooltip.enabled) {
      const triggerType = interactionConfig.tooltip.config.triggerType === 'hover' ? 'onHover' : 'onClick';
      const displayField = interactionConfig.tooltip.config.displayField;
      return {
        [triggerType]: (info, event) => {
          if (info.picked) {
            const keyValuePairs = [];
            displayField.forEach(f => {
              keyValuePairs.push({
                key: f.name,
                value: info.object['properties'][f.name]
              });
            });
            const lnglat = info.lngLat;
            this.map.tooltip.open(keyValuePairs, lnglat);
          } else {
            this.map.tooltip.close();
          }
          return true;
        }
      }
    };
    return {};
  }

  getBasicHeatMapLayerProps() {
    const visConfig = this.config.visConfig;
    const maxZoom = this.map.getMaxZoom();
    const weightDomain = this.calculateLayerDomain(this.data.features || [], this.visualChannels.weight);
    return {
      id: this._basicHeatMapLayerId,
      type: 'heatmap',
      source: this._basicHeatMapSourceId,
      maxzoom: maxZoom,
      layout: {
        visibility: visConfig.isVisible ? 'visible' : 'none'
      },
      paint: {
        'heatmap-weight': visConfig.weightField ? [
          'interpolate',
          ['linear'],
          ['get', visConfig.weightField],
          weightDomain[0],
          0,
          weightDomain[1],
          1
        ] : 1,
        'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          1,
          maxZoom,
          3
        ],
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          ...heatmapDensity(visConfig.colorRange)
        ],
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          2,
          maxZoom,
          visConfig.radius
        ],
        'heatmap-opacity': visConfig.opacity
      }
    };
  }

  getGridHeatMapLayerProps() {
    const visConfig = this.config.visConfig;
    const interactionConfig = this.config.interactionConfig;

    const layerProps = {
      isVisible: visConfig.isVisible,
      opacity: visConfig.opacity,
      cellSize: visConfig.radius, // meters
      colorRange: visConfig.colorRange.map(e => getColorArray(e)),
      coverage: 1,
      extruded: false
    };

    const interaction = {
      pickable: interactionConfig.pickable,
      highlightColor: getColorArray(interactionConfig.highlightColor),
      autoHighlight: interactionConfig.autoHighlight,
      ...this.getTooltipInterAction()
    };

    const dataAccessors = {
      getPosition: d => d.geometry.coordinates,
      getColorValue: points => {
        const data = points.map(e => e['properties'][visConfig.weightField]);
        return aggregate(data, visConfig.aggregationType);
      }
    };

    const updateTriggers = {
      getColorValue: {
        weightField: visConfig.weightField,
        aggregationType: visConfig.aggregationType
      }
    };

    return {
      id: `${this.id}-${visConfig.heatMapType}-layer`,
      type: GridLayer,
      data: this.data.features,
      ...layerProps,
      ...interaction,
      ...dataAccessors,
      updateTriggers
    };
  }

  getHexagonHeatMapLayerProps() {
    const visConfig = this.config.visConfig;
    const interactionConfig = this.config.interactionConfig;

    const layerProps = {
      isVisible: visConfig.isVisible,
      opacity: visConfig.opacity,
      radius: visConfig.radius, // meters
      colorRange: visConfig.colorRange.map(e => getColorArray(e)),
      coverage: 1,
      extruded: false
    };

    const interaction = {
      pickable: interactionConfig.pickable,
      highlightColor: getColorArray(interactionConfig.highlightColor),
      autoHighlight: interactionConfig.autoHighlight,
      ...this.getTooltipInterAction()
    };

    const dataAccessors = {
      getPosition: d => d.geometry.coordinates,
      getColorValue: points => {
        const data = points.map(e => e['properties'][visConfig.weightField]);
        return aggregate(data, visConfig.aggregationType);
      }
    };

    const updateTriggers = {
      getColorValue: {
        weightField: visConfig.weightField,
        aggregationType: visConfig.aggregationType
      }
    };

    return {
      id: `${this.id}-${visConfig.heatMapType}-layer`,
      type: HexagonLayer,
      data: this.data.features,
      ...layerProps,
      ...interaction,
      ...dataAccessors,
      updateTriggers
    };
  }
  
  getDistrictHeatMapLayerProps() {
    const visConfig = this.config.visConfig;
    const interactionConfig = this.config.interactionConfig;

    const layerProps = {
      isVisible: visConfig.isVisible,
      opacity: visConfig.opacity,
      filled: true,
      stroked: visConfig.stroked,
      extruded: false,
      lineWidthUnits: 'pixels'
    };

    const interaction = {
      pickable: interactionConfig.pickable,
      highlightColor: getColorArray(interactionConfig.highlightColor),
      autoHighlight: interactionConfig.autoHighlight,
      ...this.getDistrictTooltipInterAction()
    };

    const weightDomain = this.calculateLayerDomain(this.data.features, this.visualChannels.weight);
    const colorRange = visConfig.colorRange;
    const scale = this.getVisChannelScale(SCALE_TYPES.linear, weightDomain, colorRange, visConfig.fixedRadius);
    const dataAccessors = {
      getPolygon: d => d.geometry.coordinates,
      getFillColor: d => {
        const value = d['properties'][visConfig.weightField];
        return value == undefined ? [0,0,0,0] : getColorArray(scale(value));
      },
      getLineColor: d => visConfig.strokeColor,
      getLineWidth: d => visConfig.strokeWidth
    };

    const updateTriggers = {
      getFillColor: {
        weightField: visConfig.weightField,
        colorRange: visConfig.colorRange
      },
      getLineColor: [visConfig.strokeColor],
      getLineWidth: [visConfig.strokeWidth]
    };

    return {
      id: `${this.id}-${visConfig.heatMapType}-layer`,
      type: PolygonLayer,
      data: this.data.features,
      ...layerProps,
      ...interaction,
      ...dataAccessors,
      updateTriggers
    };
  }
}
