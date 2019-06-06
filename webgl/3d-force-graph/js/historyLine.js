var OPERATOR = {
    NONE: "NONE",
    NEW: "NEW",
    DELETE: "DELETE",
    PROPERTY: "PROPERTY_CHANGEd"
};

function HistoryLine() {
    this.undoStack = [];
    this.redoStack = [];
    this.graph = null;
    this.latestNodes = {};
    this.latestEdges = {};
}

HistoryLine.prototype = {
    constructor: HistoryLine,
    setGraph: function(e) {
        this.graph = e
    },
    recordAcitonStep: function() {
        this.graph || console.warn("Please use setGraph bind the graph to histroy");
        var e = this
          , t = {
            graph: {
                tempNodes: {},
                tempEdges: {}
            },
            propsChange: {
                diffNodeIds: [],
                diffEdgeIds: [],
                actionType: OPERATOR.NONE
            },
            nodeChange: {
                diffIds: [],
                actionType: OPERATOR.NONE
            },
            edgeChange: {
                diffIds: [],
                actionType: OPERATOR.NONE
            }
        }
          , n = {};
        _.forEach(e.graph.nodeSet, function(r) {
            e.latestNodes[r.id] && !_.isEqual(e.latestNodes[r.id], r.toJSON()) ? (t.graph.tempNodes[r.id] = e.latestNodes[r.id],
            n[r.id] = r.toJSON()) : e.latestNodes[r.id] ? n[r.id] = e.latestNodes[r.id] : n[r.id] = r.toJSON()
        });
        var r = {};
        _.forEach(e.graph.edges, function(n) {
            e.latestEdges[n.id] && !_.isEqual(e.latestEdges[n.id], n.toJSON()) ? (t.graph.tempEdges[n.id] = e.latestEdges[n.id],
            r[n.id] = n.toJSON()) : e.latestEdges[n.id] ? r[n.id] = e.latestEdges[n.id] : r[n.id] = n.toJSON()
        }),
        (_.size(t.graph.tempNodes) > 0 || _.size(t.graph.tempEdges) > 0) && (t.propsChange.actionType = OPERATOR.PROPERTY,
        t.propsChange.diffNodeIds = Object.keys(t.graph.tempNodes) || [],
        t.propsChange.diffEdgeIds = Object.keys(t.graph.tempEdges) || []),
        e.handleDiffIds(e.latestNodes, n, t, !0),
        e.handleDiffIds(e.latestEdges, r, t, !1),
        e.latestNodes = n,
        e.latestEdges = r,
        t.nodeChange.actionType == OPERATOR.NONE && t.edgeChange.actionType == OPERATOR.NONE || (e.undoStack.push(t),
        e.undoStack.length > 10 && e.undoStack.shift(),
        e.redoStack.splice(0, this.redoStack.length))
    },
    handleDiffIds: function(e, t, n, r) {
        var i = {
            diffIds: [],
            actionType: OPERATOR.NONE
        }
          , a = Object.keys(e)
          , s = Object.keys(t);
        _.isEqual(a, s) || (_.size(a) > _.size(s) ? (i.actionType = OPERATOR.DELETE,
        i.diffIds = _.difference(a, s)) : (i.actionType = OPERATOR.NEW,
        i.diffIds = _.difference(s, a))),
        i.actionType != OPERATOR.NONE && i.diffIds.forEach(function(a) {
            r ? n.graph.tempNodes[a] = i.actionType == OPERATOR.NEW ? t[a] : e[a] : n.graph.tempEdges[a] = i.actionType == OPERATOR.NEW ? t[a] : e[a]
        }),
        r ? n.nodeChange = i : n.edgeChange = i
    },
    handleNodesChangeRestore: function(e, t, n) {
        var r = this;
        if (!n && t.actionType == OPERATOR.NEW || n && t.actionType == OPERATOR.DELETE) {
            var i = [];
            _.forEach(t.diffIds, function(t) {
                i.push(e.tempNodes[t]),
                r.latestNodes[t] = e.tempNodes[t]
            }),
            r.graph.addNodes(i)
        } else if (!n && t.actionType == OPERATOR.DELETE || n && t.actionType == OPERATOR.NEW) {
            var a = _.values(t.diffIds);
            _.remove(r.latestNodes, function(e) {
                return a.includes(e.id)
            }),
            r.graph.removeNodesByIds(a)
        }
    },
    handleEdgesChangeRestore: function(e, t, n) {
        var r = this;
        if (!n && t.actionType == OPERATOR.NEW || n && t.actionType == OPERATOR.DELETE) {
            var i = [];
            _.forEach(t.diffIds, function(t) {
                i.push(e.tempEdges[t]),
                r.latestEdges[t] = e.tempEdges[t]
            });
            var a = _.values(t.diffIds);
            r.graph.removeEdgesByIds(a),
            r.graph.addEdges(i)
        } else if (!n && t.actionType == OPERATOR.DELETE || n && t.actionType == OPERATOR.NEW) {
            var s = _.values(t.diffIds);
            _.remove(r.latestEdges, function(e) {
                return s.includes(e.id)
            }),
            r.graph.removeEdgesByIds(s)
        }
    },
    handlePropsChangeRestore: function(e, t, n) {
        var r = this;
        if (t.actionType == OPERATOR.PROPERTY && (_.size(t.diffNodeIds) > 0 && _.forEach(t.diffNodeIds, function(t) {
            var n = e.tempNodes[t];
            if (r.graph.nodeSet[t] && n) {
                var i = r.graph.nodeSet[t].toJSON();
                r.graph.nodeSet[t].restore(n),
                e.tempNodes[t] = i,
                r.latestNodes[t] = n
            } else
                console.warn("Miss node, the id :", n)
        }),
        _.size(t.diffEdgeIds) > 0)) {
            var i = r.graph.edges.filter(function(e) {
                return t.diffEdgeIds.includes(e.id)
            });
            _.forEach(i, function(t) {
                if (e.tempEdges[t.id] && t) {
                    var n = t.toJSON();
                    t.restore(e.tempEdges[t.id]),
                    r.graph.updateEdgeSourceTarget(t),
                    e.tempEdges[t.id] = n,
                    r.latestEdges[t.id] = e.tempEdges[t.id]
                }
            })
        }
    },
    add: function() {
        this.recordAcitonStep()
    },
    undo: function() {
        var e = this.undoStack.pop();
        if (e) {
            this.redoStack.push(e);
            var t = e.propsChange
              , n = e.nodeChange
              , r = e.edgeChange
              , i = e.graph;
            this.handleNodesChangeRestore(i, n, !0),
            this.handleEdgesChangeRestore(i, r, !0),
            this.handlePropsChangeRestore(i, t, !0),
            this.graph.update_degree()
        }
    },
    redo: function() {
        var e = this.redoStack.pop();
        if (e) {
            this.undoStack.push(e);
            var t = e.propsChange
              , n = e.nodeChange
              , r = e.edgeChange
              , i = e.graph;
            this.handleNodesChangeRestore(i, n),
            this.handleEdgesChangeRestore(i, r),
            this.handlePropsChangeRestore(i, t),
            this.graph.update_degree()
        }
    }
};