var LotsOfPointsMode = {};

LotsOfPointsMode.onSetup = function(opts) {
    var state = {};
    state.count = opts.count || 0;
    return state;
}

LotsOfPointsMode.onClick = function(state, e) {
    var point = this.newFeature({
        type: 'Feature',
        properties: {
            count: state.count
        },
        geometry: {
            type: 'Point',
            coordinates: [e.lngLat.lng, e.lngLat.lat]
        }
    });
    this.addFeature(point);
}

LotsOfPointsMode.onKeyUp = function(state, e) {
    if (e.keyCode === 27) return this.changeMode('simple_select');
}

LotsOfPointsMode.toDisplayFeatures = function(state, geojson, display) {
    display(geojson);
}