// googlelayer
const GOOGLE_URL = 'http://mt2.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&s=Gal&z={z}&x={x}&y={y}';
L.GoogleLayer = L.TileLayer.extend({

    initialize: function (url = GOOGLE_URL, options) {
        L.TileLayer.prototype.initialize.call(this, url, options);
    },

    getTileUrl: function (tilePoint) {
        return L.Util.template(this._url, {
            x: tilePoint.x,
            y: tilePoint.y,
            z: tilePoint.z
        })
    }
});