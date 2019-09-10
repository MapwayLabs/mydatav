import arcData from '../data/arc-layer.json';
import {ArcLayer} from '@deck.gl/layers';
import {MapboxLayer} from '@deck.gl/mapbox';

export default function addArcLayer(map) {
    const arcLayer = new MapboxLayer({
        id: 'arc-layer',
        type: ArcLayer,
        data: arcData,
        autoHighlight: true,
        pickable: true,
        getWidth: 4,
        getSourcePosition: d => d.from.coordinates,
        getTargetPosition: d => d.to.coordinates,
        getSourceColor: [255, 0, 0],
        getTargetColor: [255, 0, 0],
        getHeight: 0.5,
        onHover: e => {
            console.log('onHover', e);
        //   const tooltip = `${object.from.name} to ${object.to.name}`;
          /* Update tooltip
             http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
          */
        }
    });
    map.addLayer(arcLayer);
    requestAnimationFrame(e => {
        // map.setCenter([26.004,52.239]);
    });
}