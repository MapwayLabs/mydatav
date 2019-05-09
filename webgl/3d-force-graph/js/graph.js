// export { Node, Edge, Graph as default };

//////////////////// 节点 24445
function Node(id) {
    this.id = String(id),
    this.index = 0,
    this.degree = 0,
    this.position = new THREE.Vector3(0,0,0),
    this.color = new THREE.Color(0x3a89c9),
    this.alpha = 1,
    this.imageAlpha = 1,
    this.icon = 0,
    this.data = {},
    this.pinned = false,
    this.fixed = false,
    this.selected = false,
    this.wasFixed = false,
    this.size = Math.pow(10, .2),
    this.clone = this.clone.bind(this)
}

Node.prototype = {
	constructor: Node,
	clone: function() {
        var t = new Node(this.id);
        return t.index = this.index,
        t.degree = this.degree,
        t.position = this.position.clone(),
        t.color = this.color.clone(),
        t.size = this.size,
        t.alpha = this.alpha,
        t.imageAlpha = this.imageAlpha,
        t.icon = this.icon,
        t.data = this.data,
        t.pinned = this.pinned,
        t.fixed = this.fixed,
        t.selected = this.selected,
        t.wasFixed = this.wasFixed,
        t
	},
	restore: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return this.index = e.index,
        this.degree = e.degree,
        t || (this.position = (new THREE.Vector3).fromArray(e.position)),
        this.color = new THREE.Color(e.color),
        this.alpha = e.alpha,
        this.imageAlpha = e.imageAlpha,
        this.icon = e.icon,
        this.size = e.size,
        this.data = e.data || this.data,
        this.pinned = e.pinned,
        this.fixed = e.fixed,
        this.selected = e.selected,
        this.wasFixed = e.wasFixed,
        this
	},
	toJSON: function() {
		return {
	        id: this.id,
            index: this.index,
            degree: this.degree,
            position: this.position.toArray(),
            color: this.color.getStyle(),
            size: this.size,
            alpha: this.alpha,
            imageAlpha: this.imageAlpha,
            icon: this.icon,
            data: this.data,
            pinned: this.pinned,
            fixed: this.fixed,
            selected: this.selected,
            wasFixed: this.wasFixed
		}
	}
};

//////////////////// 边 24524
function Edge(t, n, r) {
    this.uid = "",
    this.sourceId = t.id,
    this.targetId = n.id,
    this.source = t,
    this.target = n,
    this.name = "",
    this.alpha = r && r.alpha ? r.alpha : window.Config.config.edgeDefaultAlpha,
    this.properties = {},
    this.color = new THREE.Color(r && r.color ? r.color : window.Config.colors.edge);
    
    var me = this;
    Object.defineProperty(this, "id", {
    	get: function() {
    		return me.sourceId + "-" + me.targetId
    	}
    });
}
Edge.prototype = {
	constructor: Edge,
	toJSON: function() {
        return {
            id: this.id,
            sourceId: this.sourceId,
            targetId: this.targetId,
            name: this.name,
            data: this.data,
            properties: this.properties,
            alpha: this.alpha,
            color: this.color.getStyle()
        }
	},
	restore: function(e) {
        return this.sourceId = e.sourceId,
        this.targetId = e.targetId,
        this.name = e.name,
        this.data = e.data || this.data,
        this.alpha = e.alpha,
        this.properties = e.properties || this.properties || {},
        this.color = new THREE.Color(e.color),
        this
	}
};

//////////////////// 图 23961
function Graph(options) {
	this.options = options || {};
    this.nodeSet = {};
    this.nodes = [];
    this.edges = [];
    this.filters = [];
    this.renderNeedsUpdate = false;
    this.colorSchema = 0;
    this.visibleNodes = [];
    this.visibleEdges = [];
    this.layoutNodes = this.visibleNodes;
    this.layoutEdges = this.visibleEdges;
}

Graph.prototype = {
	constructor: Graph,
	addFilter: function(e) {
		this.filters.push(e);
	},
	resetFilter: function() {
		this.nodes.forEach(e => {
			e.alpha = 1;
			e.image && (e.alpha = 0, e.imageAlpha = 1);
		});
		this.edges.forEach(e => {
			e.alpha = 1;
		});
	},
	applyFilters: function() {
		this.filters.forEach(t => {
			t.apply(this);
		});
	},
	addNode: function(e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        if (this.reached_limit())
            return false;
        if (this.renderNeedsUpdate = t,
        void 0 == this.nodeSet[e.id]) {
            var n = e;
            return e instanceof Node || (n = new Node(e.id)).restore(e),
            this.nodeSet[e.id] = n,
            this.nodes.push(n),
            this.layoutNodes.push(n),
            !0
        }
        return !!this.nodeSet[e.id] && (this.nodeSet[e.id].restore(e, !0),
        !0)	
	},
	addNodes: function(e) {
		e.forEach(n => {
			this.addNode(n);
		})
	},
	clear: function() {
        for (var e in this.renderNeedsUpdate = true,
        this.nodeSet)
            delete this.nodeSet[e];
        this.nodes.length = 0,
        this.edges.length = 0,
        this.layoutEdges.length = 0,
        this.layoutNodes.length = 0,
        this.visibleEdges.length = 0,
        this.visibleNodes.length = 0		
	},
	removeAllNodesAndEdges: function() {
		this.clear();
	},
	nodeIdExist: function(e) {
		return void 0 != this.nodeSet[e];
	},
	getNode: function(e) {
		return this.getNodeById(e);
	},
	getNodeById: function(e) {
		return this.nodeSet[e];
	},
	getEdgesToNode: function(e) {
		return this.getEdgesWithNodeId(e.id);
	},
	getEdgesWithNodeId: function(e) {
		return this.edges.filter(t => (t.sourceId == e || t.targetId == e));
	},
	addEdges: function(e) {
        var t, n, r, i = this, o = [];
        (e.forEach(function(e) {
            var t = i.nodeSet[e.sourceId]
              , n = i.nodeSet[e.targetId]
              , r = i.getEdgeWithId(e.sourceId, e.targetId);
            if (t && n && !r) {
                var a = e;
                e instanceof Edge ? (a.source = t,
                a.target = n) : a = new Edge(t,n,{
                    color: e.color,
                    alpha: e.alpha
                }),
                o.push(a)
            } else
                r && (r.restore(e),
                r.source = t,
                r.target = n)
        }),
        (t = this.edges).push.apply(t, o),
        (n = this.layoutEdges).push.apply(n, o),
        this.layoutEdges != this.visibleEdges) && (r = this.visibleEdges).push.apply(r, o)	
	},
	getNodeByName: function(e) {
        return this.nodes.find(n => n.data.name == e);
	},
	getEdgeWithId: function(e, t) {
		return this.edges.find(n => (n.sourceId == e && n.targetId == t));
	},
	getEdge: function(e, t) {
		return e && t ? this.getEdgeWithId(e.id, t.id) : null;
	},
	addEdge: function(e, t, n) {
        var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
        if (!e || !t)
            return null;
        this.renderNeedsUpdate = r;
        var i = this.getEdge(e, t);
        return i || (i = new Edge(e,t),
        n && (n.data && (i.data = n.data),
        n.color && (i.color = n.color),
        n.alpha && (i.alpha = n.alpha)),
        this.edges.push(i),
        this.layoutEdges.push(i),
        this.layoutEdges != this.visibleEdges && this.visibleEdges.push(i)),
        i
	},
	removeEdge: function(e, t) {
        _.remove(this.edges, function(n) {
            return n.sourceId == e && n.targetId == t
        }),
        _.remove(this.layoutEdges, function(n) {
            return n.sourceId == e && n.targetId == t
        }),
        _.remove(this.visibleEdges, function(n) {
            return n.sourceId == e && n.targetId == t
        }),
        this.renderNeedsUpdate = !0
	},
	reached_limit: function() {
		return void 0 != this.options.limit && this.options.limit <= this.nodes.length;
	},
	// 更新度
	update_degree: function() {
        this.nodes.forEach(function(e) {
            e.degree = 0,
            e.neighbor = []
        }),
        this.edges.forEach(function(e) {
            e.source.degree += 1,
            e.source.neighbor.push(e.target.id),
            e.target.degree += 1,
            e.target.neighbor.push(e.source.id)
        })

	},
	// 完整性检查
	sanity_check: function() {
        this.edges.forEach(function(e) {
            e.source == e.target && console.log("src == tgt " + e.sourceId + " --- " + e.targetId)
        });
	},
	createFromArray: function(e) {
        var t = this
          , n = {};
        e.layoutNodes.forEach(function(e) {
            t.addNode(e, !1),
            n[e.id] = e.id
        }),
        this.removeNodesByIds(this.nodes.filter(function(e) {
            return void 0 === n[e.id]
        }).map(function(e) {
            return e.id
        }));
        var r = {};
        e.layoutEdges.forEach(function(e) {
            var n = t.addEdge(t.getNodeById(e.sourceId), t.getNodeById(e.targetId), {}, !1);
            n && n.id && (r[n.id] = n.id)
        }),
        _.remove(this.edges, function(e) {
            return !r[e.id]
        }),
        _.remove(this.layoutEdges, function(e) {
            return !r[e.id]
        }),
        _.remove(this.visibleEdges, function(e) {
            return !r[e.id]
        }),
        this.renderNeedsUpdate = !0
    },
	serialize: function() {
        var e = this.layoutEdges
          , t = this.layoutNodes;
        return {
            layoutEdges: e.map(function(e) {
                return {
                    alpha: e.alpha,
                    sourceId: e.sourceId,
                    targetId: e.targetId
                }
            }),
            layoutNodes: t.map(function(e) {
                return {
                    alpha: e.alpha,
                    id: e.id,
                    position: e.position,
                    data: {}
                }
            })
        };
	},
	updatePositionFromArray: function(e) {
        var t = this;
        e.length == this.layoutNodes.length && (e.forEach(function(e) {
            t.nodeSet[e.id] && (t.nodeSet[e.id].position.x = e.position.x,
            t.nodeSet[e.id].position.y = e.position.y,
            t.nodeSet[e.id].position.z = e.position.z)
        }),
        this.renderNeedsUpdate = !0)
	},
	updatePropertyByLabel: function(e, t, n) {
        this.nodes.filter(function(t) {
            return t.data.detail.type == e
        }).forEach(function(e) {
            void 0 !== e[t] && (e[t] = n)
        });
	},
	updateNodeSizeByProperty: function(e, t) {
        if ("" == t)
            this.nodes.filter(function(t) {
                return t.data.detail.type == e
            }).forEach(function(e) {
                return e.size = window.currentNodesSize ? window.currentNodesSize : 1.585
            });
        else {
            var n = this.nodes.filter(function(t) {
                return t.data.detail.type == e
            }).filter(function(e) {
                return void 0 !== e.data.detail.data[t] && "number" == typeof e.data.detail.data[t]
            })
              , r = n.map(function(e) {
                return e.data.detail.data[t]
            }).filter(function(e) {
                return !isNaN(e)
            });
            if (r.length < 2)
                console.log("Not enough valid number for node size scaling");
            else {
                var o = _.max(r) + 1e-4
                  , a = _.min(r);
                n.forEach(function(e) {
                    var n, r, i;
                    void 0 !== e.data.detail.data[t] && "number" == typeof e.data.detail.data[t] && (e.size = (n = e.data.detail.data[t],
                    r = o,
                    i = a,
                    window.currentNodesSize ? (1 + (n - i) / (r - i) * 3) * window.currentNodesSize : 1 * (1 + (n - i) / (r - i) * 3)))
                })
            }
        }
	},
	updateNodeParams: function(e) {
        var t = this;
        Object.keys(e).forEach(function(n) {
            t.nodeSet[n] && (t.nodeSet[n].position.x = e[n].position.x,
            t.nodeSet[n].position.y = e[n].position.y,
            t.nodeSet[n].position.z = e[n].position.z,
            t.nodeSet[n].alpha = e[n].alpha,
            t.nodeSet[n].imageAlpha = e[n].imageAlpha,
            t.nodeSet[n].size = e[n].size,
            t.nodeSet[n].selected = e[n].selected,
            t.nodeSet[n].icon = e[n].icon)
        }),
        this.renderNeedsUpdate = !0
	},
	updateVisibleAndLayoutElements: function(e) {
        e || this.update_degree(),
        this.visibleNodes = e ? this.nodes.filter(function(e) {
            return e.degree > 1
        }) : [].concat(this.nodes),
        this.visibleEdges = e ? this.edges.filter(function(e) {
            return e.source.degree > 1 && e.target.degree > 1
        }) : [].concat(this.edges),
        this.layoutNodes = this.visibleNodes,
        this.layoutEdges = this.visibleEdges,
        console.log("full: " + this.nodes.length + ", " + this.edges.length + "\n      visible: " + this.visibleNodes.length + ", " + this.visibleEdges.length),
        this.renderNeedsUpdate = !0
	},
	removeVisibleLeaf: function() {
        var e = {};
        this.visibleEdges.forEach(function(t) {
            e[t.sourceId] || (e[t.sourceId] = {}),
            e[t.targetId] || (e[t.targetId] = {}),
            e[t.sourceId][t.id] = t.id,
            e[t.targetId][t.id] = t.id
        }),
        _.forEach(e, function(t, n) {
            e[n] = _.size(t)
        }),
        this.visibleNodes = this.visibleNodes.filter(function(t) {
            return e[t.id] > 1
        }),
        this.visibleEdges = this.visibleEdges.filter(function(t) {
            return e[t.sourceId] > 1 && e[t.targetId] > 1
        }),
        this.layoutNodes = this.visibleNodes,
        this.layoutEdges = this.visibleEdges,
        this.renderNeedsUpdate = !0
	},
	removeNodeWithoutEdges: function() {
        var e = this
          , t = this.visibleNodes.filter(function(t) {
            var n = _.filter(e.visibleEdges, function(e) {
                return e.sourceId == t.id || e.targetId == t.id
            });
            return !n || 0 == n.length
        });
        this.removeNodesByIds(t.map(function(e) {
            return e.id
        }), !0)
	},
	removeEdgesNodeNotExist: function() {
        var e = this
          , t = this.edges.filter(function(t) {
            var n = e.nodeSet[t.sourceId]
              , r = e.nodeSet[t.targetId];
            return void 0 == n || void 0 == r
        }).map(function(e) {
            return e.id
        });
        this.removeEdgesByIds(t)
	},
	removeNodeById: function(e) {
		this.nodeIdExist(e) && this.removeNodesByIds([e]);
	},
	removeNodesByIds: function(e, t) {
        var n = this;
        if (e && Array.isArray(e) && e.length > 0) {
            var r = _.remove(t ? this.visibleEdges : this.edges, function(t) {
                return e.includes(t.sourceId) || e.includes(t.targetId)
            })
              , o = {};
            r.forEach(function(e) {
                o[e.id] = !0
            }),
            _.remove(this.edges, function(e) {
                return o[e.id]
            }),
            _.remove(this.visibleEdges, function(e) {
                return o[e.id]
            }),
            _.remove(this.layoutEdges, function(e) {
                return o[e.id]
            }),
            r && r.length > 0 && r.forEach(function(e) {
                e.source.data.neighborsCount = 0,
                e.source.data.hasAllNeighbors = !1,
                e.target.data.neighborsCount = 0,
                e.target.data.hasAllNeighbors = !1
            });
            var a = _.remove(t ? this.visibleNodes : this.nodes, function(t) {
                return e.includes(t.id)
            }).map(function(e) {
                return e.id
            });
            a && a.length > 0 && (a.forEach(function(e) {
                delete n.nodeSet[e]
            }),
            _.remove(this.nodes, function(e) {
                return a.includes(e.id)
            }),
            _.remove(this.layoutNodes, function(e) {
                return a.includes(e.id)
            }),
            _.remove(this.visibleNodes, function(e) {
                return a.includes(e.id)
            }))
        }
	},
	removeEdgesByIds: function(e) {
        if (e && Array.isArray(e) && e.length > 0) {
            var t = _.remove(this.edges, function(t) {
                return e.includes(t.id)
            });
            _.remove(this.layoutEdges, function(t) {
                return e.includes(t.id)
            }),
            _.remove(this.visibleEdges, function(t) {
                return e.includes(t.id)
            }),
            t && t.length > 0 && t.forEach(function(e) {
                e.source.data.neighborsCount = 0,
                e.source.data.hasAllNeighbors = !1,
                e.target.data.neighborsCount = 0,
                e.target.data.hasAllNeighbors = !1
            })
        }
	},
	updateEdgeSourceTarget: function(e) {
        e && (e.target = this.nodeSet[e.targetId],
        e.source = this.nodeSet[e.sourceId])
	}
};