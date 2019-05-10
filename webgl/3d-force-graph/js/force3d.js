// import Graph from './graph';
// import Drawing from './drawing';
// import Helper from './helper';
// import formatShareInstance from './formatShareInstance';
// export default Force3D;

// 102112 等同于_app.controller 
function Force3D(dom, options) {
    this.dom = dom;
    this.data = options.data || {};
    this.size = options.size || [300, 150];

    this.drawing = null;
    this.graph = null;

    this.init();
}

Force3D.prototype = {
    constructor: Force3D,
    init: function() {
        this.graph = new Graph();
        this.createDrawing();
        this.graphController = this.drawing && this.drawing.graphController;
        this.graphShareInstance = this.drawing && this.drawing.graphShareInstance;
        this.layoutShareInstance = this.drawing && this.drawing.layoutShareInstance;
        this.formatShareInstance = formatShareInstance;

        // var nodes = this.data.nodes.map((n, index) => {
        //     return {
        //         id: n.data.id,
        //         index: index,
        //         degree: 0,
        //         position: new THREE.Vector3(0,0,0),
        //         color: new THREE.Color(0x3a89c9),
        //         alpha: 1,
        //         imageAlpha: 1,
        //         icon: 0,
        //         data: {
        //             detail: n.data,
        //             classes: n.classes,
        //             style: n.style
        //         },
        //         pinned: false,
        //         fixed: false,
        //         selected: false,
        //         wasFixed: false,
        //         size: Math.pow(10, .2)
        //     };
        // });
        // var edges = this.data.edges.map((l, index) => {
        //     return {
        //         sourceId: l.data.source,
        //         targetId: l.data.target,
        //         name: l.data.dataLabel,
        //         data: l.data,
        //         properties: l.data,
        //         alpha: Config.config.edgeDefaultAlpha,
        //         color: new THREE.Color(Config.colors.edge)
        //     };
        // });

        var nodes = this.data.nodes.map((n, index) => ({
            id: n.id,
            index: index,
            degree: 0,
            position: new THREE.Vector3(0, 0, 0),
            color: new THREE.Color(0x3a89c9),
            alpha: 1,
            imageAlpha: 1,
            icon: 0,
            data: {},
            pinned: false,
            fixed: false,
            selected: false,
            wasFixed: false,
            size: Math.pow(10, .2)
        }));
        var edges = this.data.links.map(l => ({
            sourceId: l.source,
            targetId: l.target,
            name: "",
            data: {},
            properties: {},
            alpha: Config.config.edgeDefaultAlpha,
            color: new THREE.Color(Config.colors.edge)
        }));

        this.graph.addNodes(nodes);
        this.graph.addEdges(edges);
        this.drawing.startLayout();
    },
    createDrawing: function() {
        null == this.drawing ? this.drawing = new Drawing({
                layout: "3d",
                selection: false,
                numNodes: 300,
                showStats: false,
                showInfo: true,
                showLabels: true,
                dom: this.dom,
                size: this.size
            }, this.graph) : (this.drawing.graph.clear(),
                this.drawing.loadAndRun()),
            window._graph3Drawing = this.drawing
    },
    update: function() {
        // TODO:
    },
    handleSysCommand: function(e) {
        // var t = this
        //   , n = (new s.Command).init(this.store, p.Actions, this.graph).executeSysCommand(e);
        // n instanceof Promise && n.then(function(e) {
        //     "graph" == e.type ? ((0,
        //     R.jsonToGraph)(t.graph, e.data),
        //     t.drawing.forceStartLayout()) : "mysql" == e.type && t.store.dispatch(p.Actions.showGraphBuilder(!0, "mysql", "schemaName", e.data))
        // })
    },
    updatePropertyByLabel: function(e, t, n) {
        void 0 == n ? this.graphController.updateNodeSizeByProperty(e, t) : this.graphController.updatePropertyByLabel(e, t, n)
    },
    resetCameraAndFly: function(e, t) {
        var n = this
          , r = this.graph.getNode(t)
          , i = new THREE.Vector3(0,0,3)
          , o = e.position.clone();
        o.distanceTo(i) > 3 ? (0,
        Helper.tweenHelper)(o, i, 1e3, function(t) {
            e.position.copy(t),
            e.lookAt(r.position)
        }).then(function() {
            n.flyToNode(t)
        }) : this.flyToNode(t)
    },
    clearGraph: function() {
        // this.nodeController.clearGraph(),
        // x.default.shareInstance().nodes = [],
        // x.default.shareInstance().relationships = [],
        this.drawing.clearAllPin();
        this.graphShareInstance.selectWithNodeIds([], this.graphShareInstance.selectTypes.new);
    },
    flyToNode: function(e) {
        if (!_.isEmpty(e)) {
            var t = this.graph.getNode(e);
            t && (this.drawing.graph2DControl.flyToNode(t),
            this.graphShareInstance.selectWithNodeIds([t.id], this.graphShareInstance.selectTypes.new))
        }
    },
    flyTo: function() {
        this.drawing.graph2DControl.flyToPosition(this.graphShareInstance.center);
    },
    deleteSelectedNodes: function() {
        var e = this.graph.nodes.filter(function(e) {
            return e.selected
        }).map(function(e) {
            return e.id
        });
        this.graphShareInstance.selectWithNodeIds([], this.graphShareInstance.selectTypes.new);
        this.layoutShareInstance.pinNodeIds(e, !0);
        // this.graphController.historyLine.add();
        this.graph.removeNodesByIds(e);
        // this.graphController.historyLine.add();
        this.drawing.forceStartLayout();
    },
    expandSelectedNodesAction: function() {
        var t = this.graph.nodes.filter(e => e.selected).map(e => e.id);
        if (t && t.length) {
            var n = this.graph.nodeSet[t[0]].position.clone();
            // var r = {}, i = {};
            // _.forEach(this.graph.edges, e => {
            //     (t.includes(e.sourceId) || t.includes(e.targetId)) && (r[e.targetId] = e.targetId,
            //     r[e.sourceId] = e.sourceId,
            //     e.properties && e.properties.id && (i[e.properties.id] = e.properties.id))
            // });
            // TODO: showLoading
            // TODO: getNodeNeighbors 获取相邻节点和边，参数：uids:t, rids: Object.keys(i)
            Promise.resolve().then(e => {
                var id = t[0];
                var expandCount = 10;
                var data = {};
                data.nodes = [...Array(expandCount).keys()].map(i => ({ id:id + '-' + i, labels:['Investor'], properties:{} }));
                data.relationships = [...Array(expandCount).keys()].map(i => ({ id: id + '-r' + i, startNodeId: id, endNodeId: data.nodes[i].id, type: "link_to", properties: {weight:1} }));

                var ex = {
                    data: data,
                    type: "GRAPH"
                };

                var r = this.formatShareInstance.format(ex)
                // .filterNodes(function(e) {
                //     return (0,
                //     m.filterInvisibleLabel)(e)
                // }).filterNodes(function(e) {
                //     return (0,
                //     m.filterInvisibleNodeProperty)(e)
                // }).filterRelationships(function(e) {
                //     return (0,
                //     m.filterInvisibleRelationship)(e)
                // }).filterRelationships(function(e) {
                //     return (0,
                //     m.filterInvisibleRelationshipProperty)(e)
                // })
                .build();
                r.forEach(function(e) {
                    e.position = n.clone()
                });

                this.handleTempGraphData(r, true);
            }).catch(e => {
                console.error(e);
            });
        } else {
            alert('未选择要扩展的节点！');
        }
    },
    handleTempGraphData: function(e, t, n) {
        this.graphController.setDataToGraph(e, !0),
        this.drawing.calculateTimeLine(this.graph),
        t && this.drawing.startLayout()
        // this.store.dispatch(p.Actions.graphDataUpdate(_app.controller.graph.visibleNodes.length))
    },
    calculateInternalRelationships: function() {
        // TODO:
    },
    getInternalRelationships: function() {
        // TODO:
    },
    inverseSelection: function() {
        var e = []
          , t = this.graph.visibleNodes.filter(function(e) {
            return e.selected
        });
        // TODO:
        //   , n = t && t.length > 0 ? _.uniq(t.map(function(e) {
        //     return e.data.detail.type
        // })) : null;
        // this.graph.visibleNodes.forEach(function(t) {
        //     !t.selected && -1 < n.indexOf(t.data.detail.type) && e.push(t.id)
        // });
        this.graph.visibleNodes.forEach(function(t) {
            !t.selected && e.push(t.id)
        });
        this.graphShareInstance.selectWithNodeIds(e, this.graphShareInstance.selectTypes.new);
    }
};