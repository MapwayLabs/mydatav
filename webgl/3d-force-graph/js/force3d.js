// import Graph from './graph';
// import GraphController from './graphController';
// import Drawing from './drawing';


/**
dom: divElement
*/
function Force3D (dom, options) {
    this.dom = dom;
    this.data = options.data || {};
    this.size = options.size || [300, 150];

    this.drawing = null;
    this.store = null;
    this.graph = new Graph();

    this.init();
    
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
    //         alpha: window.Config.config.edgeDefaultAlpha,
    //         color: new THREE.Color(window.Config.colors.edge)
    //     };
    // });

    var nodes = this.data.nodes.map((n, index) => ({
        id: n.id,
        index: index,
        degree: 0,
        position: new THREE.Vector3(0,0,0),
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
        alpha: window.Config.config.edgeDefaultAlpha,
        color: new THREE.Color(window.Config.colors.edge)
    }));
    this.graph.addNodes(nodes);
    this.graph.addEdges(edges);
    this.drawing.startLayout();
}

Force3D.prototype = {
	constructor: Force3D,
    init: function() {
        this.graphController = new GraphController(this.graph, this.scene, this.store);
        this.createDrawing();
        this.scene = this.drawing.cloudScene;
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
        }, this.store, this.graph, this.graphController) : (this.drawing.graph.clear(),
        this.drawing.loadAndRun()),
        window._drawing = this.drawing
    }
};