// export default GraphShareInstance;

// 12392
var GraphShareInstance = function() {
    var i = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value" in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n),
                r && e(t, r),
                t
        }
    }();

    var l;

    return function() {
        function e(t) {
            ! function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this.graph = t,
                this.keyboardState = new THREEx.KeyboardState,
                this.selectNodeIdsMap = {},
                this.eventTypes = {
                    change: "change"
                },
                this.events = {
                    change: {}
                }
        }
        return i(e, null, [{
                key: "shareInstance",
                value: function() {
                    return l || (l = new this),
                        l
                }
            }, {
                key: "bindGraph",
                value: function(e) {
                    return this.shareInstance().graph = e,
                        this.shareInstance()
                }
            }, {
                key: "selectWithNodeIds",
                value: function(e, t) {
                    return this.shareInstance().selectWithNodeIds(e, t),
                        this.shareInstance()
                }
            }, {
                key: "on",
                value: function(e, t, n) {
                    return this.shareInstance().on(e, t, n),
                        this.shareInstance()
                }
            }, {
                key: "getNodeWithId",
                value: function(e) {
                    return this.shareInstance().graph ? this.shareInstance().graph.nodeSet[e] : null
                }
            }, {
                key: "selectTypes",
                get: function() {
                    return {
                        new: "new",
                        append: "append",
                        removeSub: "removeSub"
                    }
                }
            }, {
                key: "center",
                get: function() {
                    return this.shareInstance().center
                }
            }, {
                key: "eventTypes",
                get: function() {
                    return this.shareInstance().eventTypes
                }
            }, {
                key: "singleNode",
                get: function() {
                    return this.shareInstance().singleNode
                }
            }, {
                key: "selectNodeIdsMap",
                get: function() {
                    return this.shareInstance().selectNodeIdsMap || []
                }
            }, {
                key: "layoutNodeIds",
                get: function() {
                    return this.shareInstance().graph ? this.shareInstance().graph.layoutNodes.map(function(e) {
                        return e.id
                    }) : []
                }
            }, {
                key: "keyboardState",
                get: function() {
                    return this.shareInstance().keyboardState
                }
            }]),
            i(e, [{
                key: "on",
                value: function(e, t, n) {
                    this.events[e] && t ? (n = n || t.name,
                        this.events[e][n] = t) : this.events[e] && !t && this.events[e][n] ? delete this.events[e][n] : console.warn("Only support the events :", Object.keys(this.events))
                }
            }, {
                key: "_handleEvent",
                value: function(e, t) {
                    console.log("Select Changed :", e),
                        this.events[e] && _.size(this.events[e]) > 0 && _.forEach(this.events[e], function(e) {
                            e()
                        })
                }
            }, {
                key: "selectWithNodeIds",
                value: function(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                    if (n = void 0 === n ? null : n,
                        !t || !Array.isArray(t) && "string" != typeof t)
                        return console.warn("Miss parmater nodeIds");
                    Array.isArray(t) || (t = [t]),
                        null === n || e.selectTypes[n] ? null === n && (n = this.keyboardState.pressed("shift") ? e.selectTypes.append : this.keyboardState.pressed("alt") ? e.selectTypes.removeSub : e.selectTypes.new) : (console.warn("Only support the types[" + e.selectTypes + "], please try use NodesSelectManager.selectTypes"),
                            n = e.selectTypes.new);
                    var r = this,
                        i = [];
                    switch (n) {
                        case e.selectTypes.append:
                            t.forEach(function(e) {
                                    r.selectNodeIdsMap[e] || (r.selectNodeIdsMap[e] = e,
                                        i.push(e))
                                }),
                                r.handleSelect(i, !0);
                            break;
                        case e.selectTypes.removeSub:
                            t.forEach(function(e) {
                                    r.selectNodeIdsMap[e] && (delete r.selectNodeIdsMap[e],
                                        i.push(e))
                                }),
                                r.handleSelect(i, !1);
                            break;
                        case e.selectTypes.new:
                        default:
                            var o = Object.keys(r.selectNodeIdsMap).sort();
                            r.handleSelect(o, !1),
                                r.selectNodeIdsMap = {},
                                t.forEach(function(e) {
                                    r.selectNodeIdsMap[e] = e
                                });
                            var s = Object.keys(r.selectNodeIdsMap).sort();
                            _.isEqual(s, o) || (i = s.length > 0 ? s : o),
                                r.handleSelect(s, !0)
                    }
                    i.length > 0 && r._handleEvent(r.eventTypes.change, {
                        type: n,
                        nodeIds: t
                    })
                }
            }, {
                key: "handleSelect",
                value: function(e, t) {
                    var n = this;
                    _.forEach(e, function(e) {
                        n.graph.nodeSet[e] && (n.graph.nodeSet[e].selected = !!t)
                    })
                }
            }, {
                key: "center",
                get: function() {
                    var e = this,
                        t = new THREE.Vector3(0, 0, 0),
                        n = 0;
                    return _.forEach(this.selectNodeIdsMap, function(r) {
                            e.graph.nodeSet[r] && (t.add(e.graph.nodeSet[r].position),
                                n++)
                        }),
                        t.divideScalar(n || 1),
                        t
                }
            }, {
                key: "singleNode",
                get: function() {
                    var e = _.size(this.selectNodeIdsMap),
                        t = _.size(this.graph.nodeSet);
                    return 1 == e ? {
                        total: t,
                        selectCount: e,
                        node: this.graph.nodeSet[Object.keys(this.selectNodeIdsMap)[0]]
                    } : {
                        total: t,
                        selectCount: e,
                        node: null
                    }
                }
            }]),
            e
    }();
}();