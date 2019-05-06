// 116745
// Subject 23892
function MouseStream(t) {
    var n = this;
    this.enable = true,
    this.movable = true,
    this.dom = t,
    this.move = new s.default.Subject,
    this.up = new s.default.Subject,
    this.down = new s.default.Subject,
    this.out = new s.default.Subject,
    this.dbClick = new s.default.Subject,
    this.wheel = new s.default.Subject,
    this.drag = this.down.flatMap(function() {
        var e = n.latestMousePoint.x
          , t = n.latestMousePoint.y;
        return n.move.map(function(n) {
            return i({}, n, {
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
            var t = e.clientX / window.innerWidth * 2 - 1
              , n = -e.clientY / window.innerHeight * 2 + 1;
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
            x: e.clientX / window.innerWidth * 2 - 1,
            y: -e.clientY / window.innerHeight * 2 + 1
        }),
        this._wheelTimeout && clearTimeout(this._wheelTimeout),
        this._wheelTimeout = setTimeout(function() {
            t.mouseUp(e)
        }, 250))
    },
	mouseEnter: function(e) {
        this.enable && this.movable && (this.latestMousePoint.x = e.clientX / window.innerWidth * 2 - 1,
        this.latestMousePoint.y = -e.clientY / window.innerHeight * 2 + 1,
        this.latestMousePoint.screenX = e.clientX,
        this.latestMousePoint.screenY = e.clientY)
    },
	mouseMove: function(e) {
        this.enable && this.movable && (this.latestMousePoint.x = e.clientX / window.innerWidth * 2 - 1,
        this.latestMousePoint.y = -e.clientY / window.innerHeight * 2 + 1,
        this.latestMousePoint.screenX = e.clientX,
        this.latestMousePoint.screenY = e.clientY,
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
        if (this.latestMousePoint.x = e.clientX / window.innerWidth * 2 - 1,
        this.latestMousePoint.y = -e.clientY / window.innerHeight * 2 + 1,
        this.latestMousePoint.screenX = e.clientX,
        this.latestMousePoint.screenY = e.clientY,
        this.latestMousePoint.buttons = e.buttons,
        !this.needFilter(e)) {
            var t = e.clientX / window.innerWidth * 2 - 1
              , n = -e.clientY / window.innerHeight * 2 + 1;
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
            var t = e.clientX / window.innerWidth * 2 - 1
              , n = -e.clientY / window.innerHeight * 2 + 1;
            this.up.next({
                x: t,
                y: n
            })
        }
    },
	mouseOut: function(e) {
        this.enable && this.out.next()
    }
};

function KeyStream() {
    this.enable = true,
    this.down = new s.default.Subject,
    this.up = new s.default.Subject,
    document.addEventListener("keydown", this.keydown.bind(this), false),
    document.addEventListener("keyup", this.keyup.bind(this), false),
    this.controlDown = this.down.filter(function(e) {
        return "Control" == e
    }),
    this.controlUp = this.up.filter(function(e) {
        return "Control" == e
    })
}
KeyStream.prototype = {
	constructor: KeyStream,
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