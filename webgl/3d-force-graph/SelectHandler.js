function SelectHandler(el) {
    this._isEnabled = false;
    this._el = el;
    this._x1 = null;
    this._y1 = null;
    this._x2 = null;
    this._y2 = null;
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
}
SelectHandler.prototype = {
    constructor: SelectHandler,
    startSelect: function() {
        if (this._isEnabled) return this;
        this._el.addEventListener('mousedown', this._onMouseDown, false);
        this._isEnabled = true;
        return this;
    },
    stopSelect: function() {
        this._el.removeEventListener('mousedown', this._onMouseDown, false);
        this._isEnabled = false;
        this._x1 = this._y1 = this._x2 = this._y2 = undefined;
        return this;
    },
    onStart: function(cb) {
        this._onStartCallback = cb || function() {};
        return this;
    },
    onSelect: function(cb) {
        this._onSelectCallback = cb || function() {};
        return this;
    },
    onEnd: function(cb) {
        this._onEndCallback = cb || function() {};
        return this;
    },
    getRect: function() {
        return ( this._x1 != null && this._x2 != null ) ? {
            x: Math.min(this._x1, this._x2),
            y: Math.min(this._y1, this._y2),
            width: Math.abs(this._x2 - this._x1),
            height: Math.abs(this._y2 - this._y1)
        } : null;
    },
    _onMouseDown: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this._x1 = event.offsetX;
        this._y1 = event.offsetY; 
        this._el.addEventListener('mousemove', this._onMouseMove, false);
        document.addEventListener('mouseup', this._onMouseUp, false);
        if (typeof this._onStartCallback === 'function') {
            this._onStartCallback.call(this, {
                e: event,
                rect: this.getRect()
            });
        }
    },
    _onMouseMove: function(event) {
        if (!this._isEnabled) return;
        this._x2 = event.offsetX;
        this._y2 = event.offsetY;
        if (typeof this._onSelectCallback === 'function') {
            this._onSelectCallback.call(this, {
                e: event,
                rect: this.getRect()
            });
        }
    },
    _onMouseUp: function(event) {
        if (!this._isEnabled) return;
        if (typeof this._onEndCallback === 'function') {
            this._onEndCallback.call(this, {
                e: event,
                rect: this.getRect()
            });
        }
        this._el.removeEventListener('mousemove', this._onMouseMove, false);
        document.removeEventListener('mouseup', this._onMouseUp, false);
        this._x1 = this._y1 = this._x2 = this._y2 = undefined;
    }
}