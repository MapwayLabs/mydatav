var customTileLayer = L.TileLayer.extend({
    getTileUrl: function (coords) {
		var data = {
			x: coords.x + 1706,
			y: coords.y + 304,
			z: this._getZoomForUrl()
		};
		if (this._map && !this._map.options.crs.infinite) {
			var invertedY = this._globalTileRange.max.y - coords.y;
			if (this.options.tms) {
				data['y'] = invertedY;
			}
			data['-y'] = invertedY;
		}
		return L.Util.template(this._url, data);
    }
});