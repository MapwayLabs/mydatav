// export default LayoutShareInstance;

// NodesPinManager 38280
var LayoutShareInstance = (function (){
    var instance;
	function e(t) {
		this.layout = t;
        this.eventTypes = {
            change: "change"
        };
        this.events = {
            change: {}
        };
	}
	e.prototype = {
		constructor: e,
		on: function(e, t, n) {
            this.events[e] && t ? (n = n || t.name,
            this.events[e][n] = t) : this.events[e] && !t && this.events[e][n] ? delete this.events[e][n] : console.warn("Only support the events :", Object.keys(this.events))
        },
        _handleEvent: function(e, t) {
            console.log("Select Changed :", e),
            this.events[e] && _.size(this.events[e]) > 0 && _.forEach(this.events[e], function(e) {
                e()
            })
        },
        pinNodeIds: function(e, t) {
            if (!e || !Array.isArray(e) && "string" != typeof e)
                return console.warn("Miss parmater nodeIds");
            Array.isArray(e) || (e = [e]);
            var n = Object.keys(this.layout.pinNodes);
            this.layout.pinNodeIds(e, t),
            this.handlePin(e, t);
            var r = Object.keys(this.layout.pinNodes);
            _.isEqual(n, r) || this._handleEvent(this.eventTypes.change, {
                isUnPin: t,
                nodeIds: e
            })
        },
        checkPinStatus: function(e) {
            var t = this;
            return !(!e || !Array.isArray(e) && "string" != typeof e || 0 == _.size(e)) && !_.find(e, function(e) {
                return t.layout.graph.nodeSet[e] && !t.layout.pinNodes[e]
            })
        },
        handlePin: function(e, t) {
            var n = this;
            _.forEach(e, function(e) {
                n.layout.graph.nodeSet[e] && (n.layout.graph.nodeSet[e].pinned = !t)
            })
        }
	};
    return e.shareInstance = function() {
        return instance || (instance = new this), instance;
    },
    e.bindLayout = function(e) {
        return this.shareInstance().layout = e,
        this.shareInstance()
    },
    e.pinNodeIds = function(e, t) {
        return this.shareInstance().pinNodeIds(e, t),
        this.shareInstance()
    },
    e.on = function(e, t, n) {
        return this.shareInstance().on(e, t, n),
        this.shareInstance()
    },
    e.checkPinStatus = function(e) {
        return this.shareInstance().checkPinStatus(e)
    },
    e;
})();