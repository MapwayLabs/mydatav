// 抽象类
// 自己实现 project方法、draw方法
L.CanvasLayer = L.Layer.extend({

    options: {
        padding: 0.1,
        tolerance: 0
    },

    initialize: function(options) {
        L.Util.setOptions(this, options);
        L.Util.stamp(this);
    },
    
    onAdd: function() {
        if (!this._container) {
            this._initContainer();
            
            if (this._zoomAnimated) {
                L.DomUtil.addClass(this._container, 'leaflet-zoom-animated');
            }
        }

        this.getPane().appendChild(this._container);

        this.project && this.project();
        
        this.on('update', this._updatePaths, this);

        this._update();
    },

    onRemove: function() {
        this.off('update', this._updatePaths, this);
        this._destroyContainer();
    },

    getEvents: function() {
        // 这些事件被 map 对象注册
        var events = {
            viewreset: this._reset,
            zoom: this._onZoom,
            moveend: this._update,
            zoomend: this._onZoomEnd,
            viewprereset: this._onViewPreReset
        };
        if (this._zoomAnimated) {
            events.zoomanim = this._onAnimZoom;
        }
        return events;
    },

    project: function() {
        // add your code here
    },

    draw: function() {
        // add your code here
    },

    _onViewPreReset: function() {
		// Set a flag so that a viewprereset+moveend+viewreset only updates&redraws once
		this._postponeUpdatePaths = true;
    },

    _onAnimZoom: function(ev) {
        this._updateTransform(ev.center, ev.zoom);
    },

    _onZoom: function() {
        this._updateTransform(this._map.getCenter(), this._map.getZoom());
    },

    _updateTransform: function(center, zoom) {
        var scale = this._map.getZoomScale(zoom, this._zoom),
            position = L.DomUtil.getPosition(this._container),
            viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding),
            currentCenterPoint = this._map.project(this._center, zoom),
            destCenterPoint = this._map.project(center, zoom),
            centerOffset = destCenterPoint.subtract(currentCenterPoint),

            topLeftOffset = viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset);

            if (L.Browser.any3d) {
                L.DomUtil.setTransform(this._container, topLeftOffset, scale);
            } else {
                L.DomUtil.setPosition(this._container, topLeftOffset);
            }
    },

    _reset: function() {
        this.project && this.project();
        this._update();
        this._updateTransform(this._center, this._zoom);
		if (this._postponeUpdatePaths) {
			this._postponeUpdatePaths = false;
			this._updatePaths();
		}
    },

    _onZoomEnd: function() {
        this.project && this.project();
    },

    _updatePaths: function() {
        if (this._postponeUpdatePaths) { return; }
        this._draw();
    },

    _draw: function() {
        this._clear();
        this._ctx.save();
        this._drawing = true;

        // draw
        this.draw && this.draw(this._ctx);

        this._drawing = false;
        this._ctx.restore();
    },

    _clear: function() {
        this._ctx.clearRect(0, 0, this._container.width, this._container.height);
    },

    _update: function() {
        if (this._map._animatingZoom && this._bounds) { return; }

        var p = this.options.padding,
            size = this._map.getSize(),
            min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();

        this._bounds = new L.Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());
        this._center = this._map.getCenter();
        this._zoom = this._map.getZoom();

        var b = this._bounds,
            container = this._container,
            size = b.getSize(),
            m = L.Browser.retina ? 2 : 1;

        L.DomUtil.setPosition(container, b.min);

        // set canvas size (also clearing it); use double size on retina
        container.width = m * size.x;
        container.height = m * size.y;
        container.style.width = size.x + 'px';
        container.style.height = size.y + 'px';

        if (L.Browser.retina) {
            this._ctx.scale(2, 2);
        }

        // translate so we use the same path coordinates after canvas element moves
        this._ctx.translate(-b.min.x, -b.min.y);

        // Tell paths to redraw themselves
		this.fire('update');
    },

    _initContainer: function() {
        var container = this._container = document.createElement('canvas');

        //TODO: add events here

        this._ctx = container.getContext('2d');
    },

    _destroyContainer: function() {
        delete this._ctx;
        L.DomUtil.remove(this._container);
        L.DomEvent.off(this._container);
        delete this._container;
    }
});