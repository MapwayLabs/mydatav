// export default formatShareInstance;

var formatShareInstance = function() {
    var r, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    }
    : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
    , o = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n),
            r && e(t, r),
            t
        }
    }();

	// var u = n(124).v1, // TODO:
	var u = null,
	    l = null,
	    c = /http(s)?:\/\/[a-z\.]+\//gi,
	    d = function() {
	        function e() {
	            ! function(e, t) {
	                if (!(e instanceof t))
	                    throw new TypeError("Cannot call a class as a function")
	            }(this, e),
	            this.nodes = [],
	            this.relationships = []
	        }
	        return o(e, null, [{
	                key: "format",
	                value: function(e, t) {
	                    return this.shareInstance().format(e, t)
	                }
	            }, {
	                key: "formatFromNeo4jTable",
	                value: function(e) {
	                    return this.shareInstance().formatFromNeo4jTable(e)
	                }
	            }, {
	                key: "shareInstance",
	                value: function() {
	                    return l || (l = new this),
	                        l
	                }
	            }]),
	            o(e, [{
	                key: "filterNodes",
	                value: function(e) {
	                    return this.nodes = e(this.nodes),
	                        this
	                }
	            }, {
	                key: "filterRelationships",
	                value: function(e) {
	                    return this.relationships = e(this.relationships),
	                        this
	                }
	            }, {
	                key: "format",
	                value: function(e, t) {
	                    var n = {};
	                    // if ("allegrograph" === window.globalVariable.graphDatabaseType)
	                    //     n = this.formatFromAllegroGraph(e);
	                    // else
	                        switch (t = t || String(e.type).toLocaleLowerCase()) {
	                            case "graph":
	                                n = this.formatFromNeo4jGraph(e);
	                                break;
	                            case "node":
	                                n = this.formatFromNeo4jNodes(e);
	                                break;
	                            case "remote":
	                                n = this.formatFromRemoteGraph(e);
	                                break;
	                            default:
	                                n = this.formatFromNeo4jGraph(e)
	                        }
	                    return n
	                }
	            }, {
	                key: "formatFromAllegroGraph",
	                value: function(e) {
	                    // var t = this;
	                    // return e.forEach(function(e) {
	                    //         var n = {
	                    //             startNode: null,
	                    //             endNode: null,
	                    //             type: null
	                    //         };
	                    //         s.default.forEach(e, function(e, r) {
	                    //                 var i = null;
	                    //                 c.test(e.value) && (e.value = e.value.replace(c, "")),
	                    //                     e.isRelation ? n.type = e.value : i = {
	                    //                         id: e.id,
	                    //                         properties: Object.assign({
	                    //                             text: e.value
	                    //                         }, e),
	                    //                         labels: [e.type]
	                    //                     },
	                    //                     i && (t.nodes.push(i),
	                    //                         n.startNode ? n.endNode = i.id : n.startNode = i.id)
	                    //             }),
	                    //             (n.startNode || n.endNode || n.type) && t.relationships.push(n)
	                    //     }),
	                    //     this
	                }
	            }, {
	                key: "formatFromNeo4jTable",
	                value: function(e) {
	                    // var t = [];
	                    // if ("TABLE" == e.type) {
	                    //     var n = e.data,
	                    //         r = n.shift();
	                    //     t = n.map(function(e) {
	                    //         var t = {};
	                    //         return e.forEach(function(e, n) {
	                    //                 t[r[n]] = e && "object" == (void 0 === e ? "undefined" : i(e)) && void 0 !== e.low && void 0 !== e.high ? u.integer.toString(e) : e
	                    //             }),
	                    //             t
	                    //     }) || []
	                    // }
	                    // return t
	                }
	            }, {
	                key: "formatFromNeo4jGraph",
	                value: function(e) {
	                    if ("GRAPH" == e.type) {
	                        var t = e.data;
	                        this.nodes = t.nodes.map(function(e) {
	                                var t = e.properties;
	                                return Object.keys(t).forEach(function(e) {
	                                        isNaN(Number(t[e])) || (t[e] = parseFloat(t[e]))
	                                    }),
	                                    e
	                            }),
	                            this.relationships = t.relationships
	                    }
	                    return this
	                }
	            }, {
	                key: "formatFromRemoteGraph",
	                value: function(e) {
	                    // return this.nodes = e.nodes.map(function(e) {
	                    //         var t = {};
	                    //         return t.id = e.id,
	                    //             t.labels = e.data.detail.type.split(":"),
	                    //             t.position = {
	                    //                 x: e.position.x,
	                    //                 y: e.position.y,
	                    //                 z: e.position.z
	                    //             },
	                    //             t.properties = e.data.detail.data,
	                    //             t
	                    //     }),
	                    //     this.relationships = e.edges.map(function(e) {
	                    //         var t = {};
	                    //         return t.id = e.id,
	                    //             t.startNode = e.sourceId,
	                    //             t.endNode = e.targetId,
	                    //             t.type = e.name,
	                    //             t
	                    //     }),
	                    //     this
	                }
	            }, {
	                key: "formatFromNeo4jNodes",
	                value: function(e) {
	                    return this.nodes = e,
	                        this.relationships = [],
	                        this
	                }
	            }, {
	                key: "build",
	                value: function() {
	                    var e = this,
	                        t = [];
	                    this.relationships.length > 0 && (t = this.relationships.map(function(t) {
	                        var n = {},
	                            r = null,
	                            i = null,
	                            o = e.findNodeById(t.startNodeId),
	                            a = e.findNodeById(t.endNodeId);
	                        return o ? (r = {
	                                    uid: o.id,
	                                    data: o.properties,
	                                    type: o.labels.join(":")
	                                },
	                                o.position && (r.position = o.position)) : r = {
	                                uid: t.startNodeId
	                            },
	                            a ? (i = {
	                                    uid: a.id,
	                                    data: a.properties,
	                                    type: a.labels.join(":")
	                                },
	                                a.position && (i.position = a.position)) : i = {
	                                uid: t.endNodeId
	                            },
	                            n.id = t.id,
	                            n.properties = t.properties,
	                            n.object = r,
	                            n.subject = i,
	                            n.relationship = t.type || "",
	                            n
	                    }));
	                    var n = _.flatMap(this.relationships.map(function(e) {
	                            return [e.startNodeId, e.endNodeId]
	                        })),
	                        r = this.nodes.filter(function(e) {
	                            return !n.includes(e.id)
	                        }).map(function(e) {
	                            var t = {},
	                                n = {};
	                            return n.uid = e.id,
	                                n.data = e.properties,
	                                n.type = e.labels.join(":"),
	                                t.object = n,
	                                t.subject = null,
	                                t.relationship = "",
	                                t
	                        });
	                    return t = t.concat(r),
	                        this.relationships = [],
	                        this.nodes = [],
	                        t
	                }
	            }, {
	                key: "findNodeById",
	                value: function(e) {
	                    return this.nodes.find(function(t) {
	                        return t.id == e
	                    })
	                }
	            }]),
	            e
	    }();

	return d;
}();