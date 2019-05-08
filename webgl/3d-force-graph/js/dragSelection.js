// export default DragSelection;

// 111519
function DragSelection(options, drawing) {
	var n = this;
	this.options = {
	    enable: !0,
	    autoBindDom: !0,
	    // domId: null,
        dom: null
	},
	this.eventNames = {
	    end: "end",
	    keyChange: "keyChange"
	},
	this.keyboard = drawing.keyboardState,
	this.options = Object.assign(this.options, options || {}),
    this.dom = this.options.dom || document.body,
	this.wId = "w",
	this.index = 0,
	this.startX = 0,
	this.startY = 0,
	this.combineKey = "",
	this.dragRect = {
	    left: 0,
	    top: 0,
	    height: 0,
	    width: 0
	},
	this.bindDom = this.bindDom.bind(this),
    // (this.options.autoBindDom || this.options.domId) && this.bindDom(document.getElementById(this.options.domId) || document),
	(this.options.autoBindDom || this.options.dom) && this.bindDom(this.options.dom || document),
	this.events = {},
	Object.keys(this.eventNames).forEach(function(e) {
	    n.events[e] = []
	}, this),
	document.addEventListener("keydown", this._handleKeyDown.bind(this), !1),
	document.addEventListener("keyup", this._handleKeyUp.bind(this), !1);

	Object.defineProperty(this, 'enable', {
		enumerable: false,
		configurable: true,
		get: function() {
			return this.options.enable
		},
		set: function(e) {
            this.options.enable = e,
            this.options.enable || this.clear()
		}
	});
}

DragSelection.prototype = {
	constructor: DragSelection,
	on: function(e, t) {
        if (this.events[e] && t) {
            var n = this.events[e].filter(function(e) {
                return e.toString() == t.toString()
            });
            n && n.length > 0 ? console.log("Already exsit the  :", t, " on ", e) : this.events[e].push(t)
        } else
            console.warn("Only support the events :", Object.keys(this.events))
    },
	_handleEvent: function(e, t) {
        var n = this;
        this.enable && this.events[e] && this.events[e].length > 0 && this.events[e].forEach(function(e) {
            e(t, n.combineKey)
        })
    },
	getDragRect: function() {
        return this.dragRect
    },
	getRect: function() {
        return {
            x1: this.dragRect.left,
            y1: this.dragRect.top,
            x2: this.dragRect.left + this.dragRect.width,
            y2: this.dragRect.top + this.dragRect.height
        }
    },
	clear: function() {
        try {
            this.getDomById(this.wId + this.index) && (this.dragRect = {
                left: 0,
                top: 0,
                height: 0,
                width: 0
            },
            this.dom.removeChild(this.getDomById(this.wId + this.index)))
        } catch (e) {
            console.error(e)
        }
    },
	getDomById: function(e) {
        return e = e || this.getID(),
        document.getElementById(e)
    },
	getID: function() {
        return this.wId + this.index
    },
	bindDom: function(e) {
        var t = this;
        window.addEventListener("mousedown", function(e) {
            t.clear();
            e.shiftKey || e.altKey;
            var n = e.which && 3 == e.which || e.button && 2 == e.button
              , r = e.fromReact && (e.target.onclick || e.target.onchange || e.target.onmousedown || $(e.target).parents(".modal").length > 0 || $(e.target).parents(".CodeMirror").length > 0 || $(e.target).parents(".rc-slider").length > 0 || $(e.target).parents(".ui-draggable-handle").length > 0 || $(e.target).hasClass("ui-resizable-handle") || ["input", "button", "a", "select", "option", "textarea", "label", "span", "i", "td"].includes(e.target.tagName.toLocaleLowerCase()) > 0);
            !t.enable || e.fromControl || t.keyboard.pressed("3") || !e.fromReact && "renderer" != e.target.id || r || n || (t._mouseDown = !0,
            t._mouseMove = !1,
            t._handleMouseDown(e))
        }
        .bind(this), !1),
        window.addEventListener("mouseup", function(e) {
            if (t._mouseDown) {
                var n = t.getDragRect();
                t._mouseMove && n.width > 10 && n.height > 10 && t._handleEvent(t.eventNames.end, n),
                e.preventDefault(),
                t.clear()
            }
            t._mouseDown = !1,
            t._mouseMove = !1
        }
        .bind(this), !1),
        e.addEventListener("mousemove", function(e) {
            t.enable && t._mouseDown && (t._mouseMove = !0,
            t._handleMouseMove(e))
        }
        .bind(this), !1),
        this.enable || this.clear()
    },
	_handleMouseDown: function(e) {
        try {
            var t = window.event || e;
            if (!this.options.enable)
                return;
            var n = document.body.scrollTop || document.documentElement.scrollTop
              , r = document.body.scrollLeft || document.documentElement.scrollLeft;
            this.startX = t.offsetX + r,
            this.startY = t.offsetY + n
        } catch (e) {
            console.error(e)
        }
    },
	_handleKeyDown: function(e) {
        "Control" != e.key && "Shift" != e.key && "Alt" != e.key || (this.enable ? this.combineKey = e.key : this.combineKey = "",
        this._handleEvent(this.eventNames.keyChange, this.combineKey))
    },
	_handleKeyUp: function(e) {
        "Control" != e.key && "Shift" != e.key && "Alt" != e.key || (this.combineKey = "",
        this._handleEvent(this.eventNames.keyChange, this.combineKey))
    },
	_handleMouseMove: function(e) {
        try {
            var t = window.event || e;
            e.preventDefault();
            var n = this.getDomById();
            n || ((n = document.createElement("div")).id = this.getID(),
            n.className = "drag-selection",
            n.style.marginLeft = this.startX + "px",
            n.style.marginTop = this.startY + "px",
            n.style.position = "absolute",
            n.style.border = "1px dashed gray",
            n.style.width = "0px",
            n.style.height = "0px",
            n.style.left = "0px",
            n.style.top = "0px",
            n.style.overflow = "hidden",
            n.style.pointerEvents = "none",
            n.style.zIndex = "9999",
            this.dom.appendChild(n));
            var r = document.body.scrollTop || document.documentElement.scrollTop
              , i = document.body.scrollLeft || document.documentElement.scrollLeft;
            this.dragRect.left = this.startX - t.offsetX - i > 0 ? t.offsetX + i : this.startX,
            this.dragRect.top = this.startY - t.offsetY - r > 0 ? t.offsetY + r : this.startY,
            this.dragRect.height = Math.abs(this.startY - t.offsetY - r),
            this.dragRect.width = Math.abs(this.startX - t.offsetX - i),
            n.style.marginLeft = this.dragRect.left + "px",
            n.style.marginTop = this.dragRect.top + "px",
            n.style.width = this.dragRect.width + "px",
            n.style.height = this.dragRect.height + "px"
        } catch (e) {
            console.error(e)
        }
    }
};