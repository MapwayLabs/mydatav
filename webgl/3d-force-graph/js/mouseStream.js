// export { MouseStream, KeyboardStream }

// 116745
// Subject 23892
// graph2DControl 111766
// handleStream 68385
// 框选 111514
function MouseStream(t) {
    var n = this;
    this.enable = true,
    this.movable = true,
    this.dom = t,
    // NOTE: 需要适配retina屏，size采用style属性的size，而不是canvas的width&height属性值。
    this.dpr = window.devicePixelRatio || 1,
    this.move = new window.Rx.Subject,
    this.up = new window.Rx.Subject,
    this.down = new window.Rx.Subject,
    this.out = new window.Rx.Subject,
    this.dbClick = new window.Rx.Subject,
    this.wheel = new window.Rx.Subject,
    this.drag = this.down.flatMap(function() {
        var e = n.latestMousePoint.x
          , t = n.latestMousePoint.y;
        return n.move.map(function(n) {
            return Object.assign({}, n, {
                startPos: {
                    x: e,
                    y: t
                }
            })
        }).takeUntil(n.up)
    }),
    this.latestMousePoint = {
        x: 0,
        y: 0,
        screenX: 0,
        screenY: 0,
        buttons: 0,
        isFilter: false
    },
    this.startFromEventHandle()
}

MouseStream.prototype = {
	constructor: MouseStream,
	startFromEventHandle: function() {
        window.document.addEventListener("mousemove", this.mouseMove.bind(this), !1),
        window.document.addEventListener("mousedown", this.mouseDown.bind(this), !1),
        window.document.addEventListener("mouseout", this.mouseOut.bind(this), !1),
        window.document.addEventListener("mouseup", this.mouseUp.bind(this), !1),
        window.document.addEventListener("mouseenter", this.mouseEnter.bind(this), !1),
        window.document.addEventListener("dblclick", this.mouseDBClick.bind(this), !1),
        window.document.addEventListener("wheel", this.mouseWheel.bind(this), !1)
    },
	removeAllEvent: function() {
        window.document.removeEventListener("mousemove", this.mouseMove.bind(this), !1),
        window.document.removeEventListener("mousedown", this.mouseDown.bind(this), !1),
        window.document.removeEventListener("mouseout", this.mouseOut.bind(this), !1),
        window.document.removeEventListener("mouseup", this.mouseUp.bind(this), !1),
        window.document.addEventListener("mouseenter", this.mouseEnter.bind(this), !1),
        window.document.removeEventListener("dblclick", this.mouseDBClick.bind(this), !1),
        window.document.removeEventListener("wheel", this.mouseWheel.bind(this), !1)
    },
	mouseDBClick: function(e) {
        if (!this.needFilter(e)) {
            var t = e.offsetX / (this.dom.width / this.dpr) * 2 - 1
              , n = -e.offsetY / (this.dom.height / this.dpr) * 2 + 1;
            this.dbClick.next({
                x: t,
                y: n
            })
        }
    },
	mouseWheel: function(e) {
        var t = this;
        this.needFilter(e) || (this.wheel.next({
            deltaY: e.deltaY,
            x: e.offsetX / (this.dom.width / this.dpr) * 2 - 1,
            y: -e.offsetY / (this.dom.height / this.dpr) * 2 + 1
        }),
        this._wheelTimeout && clearTimeout(this._wheelTimeout),
        this._wheelTimeout = setTimeout(function() {
            t.mouseUp(e)
        }, 250))
    },
	mouseEnter: function(e) {
        this.enable && this.movable && (this.latestMousePoint.x = e.offsetX / (this.dom.width / this.dpr) * 2 - 1,
        this.latestMousePoint.y = -e.offsetY / (this.dom.height / this.dpr) * 2 + 1,
        this.latestMousePoint.screenX = e.offsetX,
        this.latestMousePoint.screenY = e.offsetY)
    },
	mouseMove: function(e) {
        this.enable && this.movable && (this.latestMousePoint.x = e.offsetX / (this.dom.width / this.dpr) * 2 - 1,
        this.latestMousePoint.y = -e.offsetY / (this.dom.height / this.dpr) * 2 + 1,
        this.latestMousePoint.screenX = e.offsetX,
        this.latestMousePoint.screenY = e.offsetY,
        this.latestMousePoint.buttons = e.buttons,
        this.latestMousePoint.isFilter = this.needFilter(e),
        this.latestMousePoint = Object.assign({
            right: e.which && 3 == e.which || e.button && 2 == e.button
        }, this.latestMousePoint),
        this.move.next(this.latestMousePoint))
    },
	needFilter: function(e) {
        var t = e.fromReact && (e.target.onclick || e.target.onchange || e.target.onmousedown || $(e.target).parents(".modal").length > 0 || $(e.target).parents(".CodeMirror").length > 0 || $(e.target).parents(".rc-slider").length > 0 || $(e.target).parents(".ui-draggable-handle").length > 0 || $(e.target).hasClass("ui-resizable-handle") || ["input", "button", "a", "select", "option", "textarea", "label", "span", "i", "td"].includes(e.target.tagName.toLocaleLowerCase()) > 0);
        return !(this.enable && (e.fromReact || e.target.id == this.dom.id) && !t)
    },
	mouseDown: function(e) {
        if (this.latestMousePoint.x = e.offsetX / (this.dom.width / this.dpr) * 2 - 1,
        this.latestMousePoint.y = -e.offsetY / (this.dom.height / this.dpr) * 2 + 1,
        this.latestMousePoint.screenX = e.offsetX,
        this.latestMousePoint.screenY = e.offsetY,
        this.latestMousePoint.buttons = e.buttons,
        !this.needFilter(e)) {
            var t = e.offsetX / (this.dom.width / this.dpr) * 2 - 1
              , n = -e.offsetY / (this.dom.height / this.dpr) * 2 + 1;
            this.down.next({
                x: t,
                y: n,
                right: e.which && 3 == e.which || e.button && 2 == e.button,
                left: e.which && 1 == e.which || e.button && 0 == e.button
            })
        }
    },
	mouseUp: function(e) {
        if (this.enable) {
            var t = e.offsetX / (this.dom.width / this.dpr) * 2 - 1
              , n = -e.offsetY / this.dom.height /  this.dpr * 2 + 1;
            this.up.next({
                x: t,
                y: n,
                offsetX: e.offsetX,
                offsetY: e.offsetY
            })
        }
    },
	mouseOut: function(e) {
        this.enable && this.out.next()
    }
};

function KeyboardStream() {
    this.enable = true,
    this.down = new window.Rx.Subject,
    this.up = new window.Rx.Subject,
    document.addEventListener("keydown", this.keydown.bind(this), false),
    document.addEventListener("keyup", this.keyup.bind(this), false),
    this.controlDown = this.down.filter(function(e) {
        return "Control" == e
    }),
    this.controlUp = this.up.filter(function(e) {
        return "Control" == e
    })
}

KeyboardStream.prototype = {
	constructor: KeyboardStream,
	ingoreFilter: function(e) {
        return ["input", "textarea"].includes(e.target.tagName.toLocaleLowerCase())
    },
    keydown: function(e) {
        this.enable && !this.ingoreFilter(e) && this.down.next(e.key)
    },
    keyup: function(e) {
        this.enable && this.up.next(e.key)
    }
};