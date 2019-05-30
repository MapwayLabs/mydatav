// import { Node, Edge } from './js/graph';
// export default GraphController;

// 22949
// var ColorHelper = function() {
//     "use strict";
//     var r = function() {
//         function e(e, t) {
//             for (var n = 0; n < t.length; n++) {
//                 var r = t[n];
//                 r.enumerable = r.enumerable || !1,
//                 r.configurable = !0,
//                 "value"in r && (r.writable = !0),
//                 Object.defineProperty(e, r.key, r)
//             }
//         }
//         return function(t, n, r) {
//             return n && e(t.prototype, n),
//             r && e(t, r),
//             t
//         }
//     }();
//     var s = ["#74b9ff", "#a29bfe", "#0984e3", "#6c5ce7", "#ff7675", "#fd79a8", "#fdcb6e", "#e17055", "#e84393"]
//       , u = null
//       , l = function() {
//         function e() {
//             var t = this;
//             !function(e, t) {
//                 if (!(e instanceof t))
//                     throw new TypeError("Cannot call a class as a function")
//             }(this, e),
//             this.colors = s.concat(d3.scaleOrdinal(d3.schemeCategory10).range()).concat(d3.scaleOrdinal(d3.schemeAccent).range()).concat(d3.scaleOrdinal(d3.schemePaired).range()).concat(d3.scaleOrdinal(d3.schemeSet1).range()),
//             this.labelColorMap = {},
//             o.default.neo4jBaseInfo.labels.map(function(e) {
//                 t._autoGenerateColor(e)
//             })
//         }
//         return r(e, null, [{
//             key: "shareInstance",
//             value: function() {
//                 return u || (u = new e),
//                 u
//             }
//         }, {
//             key: "getColorByType",
//             value: function(e) {
//                 return this.shareInstance().getColorByType(e)
//             }
//         }, {
//             key: "getIconByType",
//             value: function(e) {
//                 return this.shareInstance().getIconByType(e)
//             }
//         }, {
//             key: "labels",
//             get: function() {
//                 return Object.keys(this.shareInstance().labelColorMap)
//             }
//         }]),
//         r(e, [{
//             key: "_autoGenerateColor",
//             value: function(e) {
//                 var t = this
//                   , n = {
//                     color: "#ffffff",
//                     iconIndex: 0
//                 };
//                 if (!e || "" == e)
//                     return n;
//                 if ("Remark" == e)
//                     return n.color = "#e67e22",
//                     n;
//                 if (/\:/gi.test(e)) {
//                     var r = e.split(":");
//                     if (r.length > 0 && !this.labelColorMap[e]) {
//                         var i = "#FFFFFF";
//                         r.forEach(function(e) {
//                             var n = t.labelColorMap[e] ? t.labelColorMap[e] : "#ffffff";
//                             i = t.avgcolor(i, n)
//                         })
//                     }
//                 }
//                 return this.labelColorMap[e] ? n.color = this.labelColorMap[e] : (this.labelColorMap[e] = this.colors[Object.keys(this.labelColorMap).length % this.colors.length],
//                 n.color = this.labelColorMap[e]),
//                 n
//             }
//         }, {
//             key: "avgcolor",
//             value: function(e, t) {
//                 var n = function(e, t) {
//                     return (e + t) / 2
//                 }
//                   , r = function(e) {
//                     return parseInt(("" + e).replace("#", ""), 16)
//                 }
//                   , i = function(e) {
//                     return (e >> 0).toString(16)
//                 }
//                   , o = r(e)
//                   , a = r(t)
//                   , s = function(e) {
//                     return e >> 16 & 255
//                 }
//                   , u = function(e) {
//                     return e >> 8 & 255
//                 }
//                   , l = function(e) {
//                     return 255 & e
//                 };
//                 return "#" + i(n(s(o), s(a))) + i(n(u(o), u(a))) + i(n(l(o), l(a)))
//             }
//         }, {
//             key: "getIconByType",
//             value: function(e) {
//                 return this._autoGenerateColor(e).iconIndex
//             }
//         }, {
//             key: "getColorByType",
//             value: function(e) {
//                 var t = i.default.instance().getLabelConfig(e)
//                   , n = this._autoGenerateColor(e).color;
//                 return t && t.background_color ? t.background_color : n
//             }
//         }]),
//         e
//     }();
// }();

// 118830
function GraphController(t, n, r, d) {
	var i = this;
	this.graph = t;
	// this.historyLine
	this.scene = n;
	this.store = r;
    this.drawing = d;
    this.tooltip = this.drawing.tooltip;
	this.hideLeaf = false;

	Config.graphLayout.genNodesReportFunc = function() {
		return i.gen_node_report();
	};
    Config.graphLayout.getNodeKeysMap = function() {
        return i.get_node_keys_map()
    };
    Config.graphLayout.genEdgesReportFunc = function() {
        return i.gen_edge_report()
    };
    Config.graphLayout.getEdgeKeysMap = function() {
        return i.get_edge_keys_map()
    };
}

GraphController.prototype = {
	constructor: GraphController,
	showNodeInfo: function(e) {
        // console.log(this.graph.getNodeById(e));
        var n = this.graph.getNodeById(e);
        if (n) {
            var r = this.drawing.convertCloudPoint(n.position);
            this.tooltip.open(r.x, r.y, 'I am a node!');
        } else {
            this.tooltip.close();
        }
        // this.store.getState().node.showNodeId != e && this.store.dispatch(c.Actions.showNodeInfo(e))
    },
    showTableResultInfo: function(e) {
        // this.store.dispatch(c.Actions.showTableResultInfo(e))
    },
    setDataToGraph: function(e, t) {
        var n = this;
        return e.forEach(function(e) {
            n.addDataToGraph(e, t)
        }),
        this.graph.update_degree(),
        this.graph.updateVisibleAndLayoutElements(this.hideLeaf),
        e
    },
    extractIdsFromGraphData: function(e) {
        // var t = e.map(function(e) {
        //     var t = [];
        //     return e.object && t.push(e.object.uid),
        //     e.subject && t.push(e.subject.uid),
        //     t
        // });
        // return i.default.flatMap(t)
    },
    dbCongfig: function(e) {
        // d.default.configNeo4jDBHost(e).then(function() {
        //     d.default.initNeo4jBaseInfo(!0)
        // })
    },
    animateNewNode: function(e) {
        var t = {
            scale: 3
        };
        new TWEEN.Tween(t).to({
            scale: 1
        }, 3e3).onUpdate(function() {
            e.data.sizeScale = t.scale
        }).easing(TWEEN.Easing.Elastic.InOut).start(window.performance.now())
    },
    createNode: function(e, t, n) {
        var r = new Node(e);
        r.data.sizeScale = 1,
        r.data.notes = e,
        n && this.animateNewNode(r);

        // TODO:
        // var i = t.type ? f.default.getColorByType(t.type) : null
        //   , o = 0
        //   , s = m.default.instance().iconMap[t.type];

        var i = '#3a89c9'
          , o = 0
          , s = null;
        return t.type && s && (o = s.id),
        this.setNodeColorSize(r, i, o),
        this.graph.addNode(r),
        r
    },
    updatePropertyByLabel: function(e, t, n) {
        this.graph.updatePropertyByLabel(e, t, n)
    },
    updateNodeSizeByProperty: function(e, t) {
        this.graph.updateNodeSizeByProperty(e, t)
    },
    getOrAddANodeToGraph: function(e, t, n, r) {
        if (!e || !e)
            return null;
        var i = this.graph.getNodeById(e.uid);
        return void 0 !== e.type && (i || (i = this.createNode(e.uid, e, t),
        r && i.position.copy(r)),
        i.data.detail = e,
        i.data.relationship = n,
        e.position && (i.position = new THREE.Vector3(e.position.x,e.position.y,e.position.z))),
        i
    },
    addDataToGraph: function(e, t) {
        var n = this.getOrAddANodeToGraph(e.object, t, e.relationship, e.position)
          , r = this.getOrAddANodeToGraph(e.subject, t, e.relationship, e.position);
        if (e.relationship!== '' && r && n) {
            var o = this.graph.addEdge(r, n, {
                id: e.id
            });
            o.name = String(e.relationship),
            o.properties = Object.assign({
                id: e.id
            }, e.properties),
            // o.color = new THREE.Color(h.default.getColorByName(e.relationship)),
            o.color = new THREE.Color(0xffffff),
            e.isHide && (o.alpha = 0)
        }
        e.isHide && (n.alpha = 0,
        r.alpha = 0)
    },
    expandNode: function(e) {
        var t = this
          , n = this.graph.nodeSet[e];
        return !n || n.data.hasAllNeighbors ? Promise.resolve([]) : d.default.getNodeNeighbors(n.data.detail, u.Config.pageItems, n.data.neighborsCount).then(function(e) {
            var r = p.default.format(e).filterNodes(function(e) {
                return (0,
                v.filterInvisibleLabel)(e)
            }).filterNodes(function(e) {
                return (0,
                v.filterInvisibleNodeProperty)(e)
            }).filterRelationships(function(e) {
                return (0,
                v.filterInvisibleRelationship)(e)
            }).filterRelationships(function(e) {
                return (0,
                v.filterInvisibleRelationshipProperty)(e)
            }).build();
            return n.data.neighborsCount = (n.data.neighborsCount || 0) + r.length,
            n.data.hasAllNeighbors = r.length < u.Config.pageItems,
            t.setNeighborsPosition(n, r),
            Promise.resolve(r)
        }).catch(function(e) {
            return console.error(e),
            Promise.resolve([])
        })
    },
    setNeighborsPosition: function(e, t) {
        var n = e.position.clone();
        t.forEach(function(e) {
            e.position = n
        })
    },
    setNodeColorSize: function(e, t, n) {
        e.color = new THREE.Color(t),
        e.ringColor = Config.colors.external.clone(),
        e.size = Math.pow(10, .2),
        e.data.mouseoverScale = 1,
        n && (e.icon = n)
    },
    removeEdgesFromGraph: function(e, t) {
        var n = this;
        e.forEach(function(e) {
            n.removeEdgeWithSenderIdAndReceiverId(e.x, e.z, t)
        })
    },
    removeEdgeWithSenderIdAndReceiverId: function(e, t, n) {
        var r = this.graph.getNodeById(n == e ? t : e);
        if (r) {
            var i = this.graph.getEdgeWithId(e, t)
              , o = this.graph.getEdgesToNode(r);
            this.graph.removeEdgeWithId(e, t),
            i.data && i.data.arrow_object && this.scene.remove(i.data.arrow_object),
            (!o || o.length <= 1) && (this.graph.removeNodeById(r.id),
            r.data && r.data.label_object && this.scene.remove(r.data.label_object)),
            i = null
        }
        r = null
    },
    removeNodeById: function(e) {
        this.graph.removeNodeById(e),
        this.historyLine.add()
    },
    undo: function() {
        this.historyLine.undo()
    },
    redo:  function() {
        this.historyLine.redo()
    },
    selectAll: function(e) {
        var t = this.graph.visibleNodes.map(function(e) {
            return e.id
        });
        y.default.selectWithNodeIds(e ? t : [], y.default.selectTypes.new)
    },
    removeNodeFromGraphWithId: function(e) {
        var t = this
          , n = this.graph.getNodeById(e);
        if (n) {
            var r = this.graph.getEdgesToNode(n);
            this.graph.removeNodeById(e),
            r && r.length > 0 && i.default.forEach(r, function(e) {
                e.data && e.data.arrow_object && t.scene.remove(e.data.arrow_object)
            }),
            r = null,
            this.graph.nodes.length > 0 && (n.data && n.data.label_object && this.scene.remove(n.data.label_object),
            this.graph.removeNodeById(e))
        }
        n = null
    },
    removeAllNodeExecptNodeWithId: function(e) {
        var t = this;
        if (e) {
            var n = this.graph.nodeSet[e];
            i.default.forEach(this.graph.edges, function(e) {
                e.data && e.data.arrow_object && t.scene.remove(e.data.arrow_object),
                t.graph.edges
            }),
            this.graph.edges.splice(0, this.graph.edges.length),
            console.log(this.graph.nodes),
            i.default.forEach(this.graph.nodes, function(n) {
                console.log(n.id, " :", n.id != e),
                n.id != e && (n.data && n.data.label_object && t.scene.remove(n.data.label_object),
                delete t.graph.nodeSet[n.id])
            }),
            this.graph.nodes.splice(0, this.graph.nodes.length),
            this.graph.nodes.push(n),
            this.graph[n.id] = n
        } else
            console.log("miss paramter nodeId")
    },
    getNodeFromGraph: function(e) {
        return this.graph.nodes.forEach(function(t) {
            if (t.data.screenName == e)
                return t.id
        }),
        null
    },
    gen_node_report: function() {
        return "to be implemented"
    },
    get_node_keys_map: function() {
        return "to be implemented"
    },
    gen_edge_report: function() {
        return "to be implemented"
    },
    get_edge_keys_map: function() {
        return "to be implemented"
    }

};