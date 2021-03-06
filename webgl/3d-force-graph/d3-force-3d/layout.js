// layoutWorker.worker.js 35983
const ENGINE = {
    d3Layout: 'd3Layout',
    d3Force3D: 'd3Force3D'
};
var layoutEngine = ENGINE.d3Layout;
var layout = {
    handleStart: null,
    handleStop: null,
    graphD3Layout: {
        linkStrength: 1,
        linkDistance: 0.5,
        charge: -0.01,
        gravity: 0.2,
        friction: 0.3,
        heightCompress: 1
    },
    isDateChage: false,
    isFinish: false,
    force: null,
    nodes: [],
    links: [],
    graph: null,
    idMap: {},
    pinNodes: {},
    enable: true,
    init: function(graph, options) {
        var n = this;
        this.graph = graph;
        this.graphD3Layout = Object.assign({}, this.graphD3Layout, options || {});
        this.isDateChage = false;
        this.isFinish = false;
        this.nodes = [];
        this.graph.layoutNodes.forEach((t, e) => {
            this.nodes.push({
                id: t.id,
                x: t.position.x,
                y: t.position.y,
                z: t.position.z
            });
            this.idMap[t.id] = e;
        });
        this.links = this.graph.layoutEdges.map(t => ({
            source: this.idMap[t.sourceId],
            target: this.idMap[t.targetId]
        }));

        console.log("initialize Layout...");
        this.force && (this.force.on("tick", null), this.force.on("end", null));
        if (this.force) {
            if (this.force.alpha() <= .5) this.force.alpha(.6);
        } else {
            switch (layoutEngine) {
                case ENGINE.d3Layout: this.force = d3.layout.force3D(); break;
                case ENGINE.d3Force3D: this.force = d3.forceSimulation([], 3).stop(); break;
            };
        }

        if (layoutEngine === ENGINE.d3Layout) {
            this.force.size([0, 0, 0]) 
                .nodes(this.nodes)
                .links(this.links)
                .linkStrength(this.graphD3Layout.linkStrength)
                .linkDistance(this.graphD3Layout.linkDistance)
                .charge(this.graphD3Layout.charge)
                .gravity(this.graphD3Layout.gravity)
                .heightCompress(this.graphD3Layout.heightCompress);     
        } else {
            this.force.nodes(this.nodes)
                .links(this.links)
                .linkStrength(this.graphD3Layout.linkStrength)
                .linkDistance(this.graphD3Layout.linkDistance)
                // forceManyBody 基于四叉树（2D）或八叉树（3D）的空间划分，节点代表空间中心点
                // strength 表示力的大小，负数为斥力，正数为引力；
                // theta 表示密集程度，值越小，body之间的空隙越大；值越大，body之间的空隙越小。
                // Whether a node is or isn't sufficiently far away from a body, depends on the quotient {\displaystyle s/d} s/d, where s is the width of the region represented by the internal node, and d is the distance between the body and the node's center of mass. The node is sufficiently far away when this ratio is smaller than a threshold value θ. The parameter θ determines the accuracy of the simulation; larger values of θ increase the speed of the simulation but decreases its accuracy. If θ = 0, no internal node is treated as a single body and the algorithm degenerates to a direct-sum algorithm.
                .force("charge", d3.forceManyBody().strength(-0.01).theta(0.2))
                // .force("charge", d3.forceManyBody().strength(-0.02).theta(0.2))
                .force("collide", d3.forceCollide(0.02).strength(1).iterations(3))
                .force("center", d3.forceCenter(0, 0, 0))
                .force("radius", d3.forceRadial(1, 0, 0, 0))
                .force("x", d3.forceX(0))
                .force("y", d3.forceY(0))
                .force("z", d3.forceZ(0)); 
        }

        this.force.on("tick", function() {
            _.size(n.pinNodes) > 0 && _.forEach(n.pinNodes, function(t, e) {
                n.idMap[e] >= 0 && n.idMap[e] < n.nodes.length && (n.nodes[n.idMap[e]].x = t.x,
                    n.nodes[n.idMap[e]].y = t.y,
                    n.nodes[n.idMap[e]].z = t.z)
            });
            n.isDateChage = true;
            n.isFinish = false;
        });

        this.enable ? this.force.start() : this.force.stop();

        this.force.on("end", function() {
            n.isFinish = true;
            n.handleStop && n.handleStop();
        });

        this.last_time_set = 0;

    },
    updateLayoutOption: function(t, e) {
        this.stop_layout();
        this.graphD3Layout[t] = e;
        this.force[t](e);
        this.start_layout();
    },
    render: function(t) {
        var e = this;
        this.enable && (this.isDateChage || t) && (this.isDateChage = !1,
            this.graph.layoutNodes.length > 0 && this.nodes.forEach(function(t, n) {
                e.graph.layoutNodes[n] && (e.pinNodes[t.id] ? (e.graph.layoutNodes[n].position.x = e.pinNodes[t.id].x,
                    e.graph.layoutNodes[n].position.y = e.pinNodes[t.id].y,
                    e.graph.layoutNodes[n].position.z = e.pinNodes[t.id].z) : (e.graph.layoutNodes[n].position.x = t.x,
                    e.graph.layoutNodes[n].position.y = t.y,
                    e.graph.layoutNodes[n].position.z = t.z))
            }),
            null !== this.graph && (this.graph.renderNeedsUpdate = !0))
    },
    start_layout: function() {
        this.handleStart && this.handleStart();
        this.isFinish = !1;
        this.force && this.force.start();
    },
    stop_layout: function() {
        this.force && this.force.stop()
    },
    restart_layout: function() {
        this.force && performance.now() - this.last_time_set > 500 && (this.last_time_set = performance.now(),
            this.isFinish = !1,
            this.force.alpha(.6),
            this.force.start())
    },
    reset_graph_restart_layout: function(t) {
        var e = this;
        this.stop_layout(),
            this.isFinish = !1,
            t && (this.graph = t);
        var n = this.nodes;
        this.nodes = [],
            this.graph.layoutNodes.forEach(function(t, r) {
                e.idMap[t.id] < n.length && n[e.idMap[t.id]] && n[e.idMap[t.id]].id == t.id ? e.nodes.push(n[e.idMap[t.id]]) : (e.nodes.push({
                        x: t.position.x,
                        y: t.position.y,
                        z: t.position.z
                    }),
                    e.idMap[t.id] = r)
            }),
            this.links = this.graph.layoutEdges.map(function(t) {
                return {
                    source: e.idMap[t.sourceId],
                    target: e.idMap[t.targetId]
                }
            }),
            this.force.nodes(this.nodes).links(this.links).restart()
    },
    setNodesPositions: function(t, e) {
        var n = this;
        Array.isArray(t) && Array.isArray(e) && t.map(function(r, i) {
            n.set_node_position(r, e[i], i != t.length - 1)
        })
    },
    set_node_position: function(t, e, n) {
        e && t && (this.pinNodes[t] && (this.pinNodes[t].x = e.x,
                this.pinNodes[t].y = e.y,
                this.pinNodes[t].z = e.z),
            this.idMap[t] >= 0 && this.idMap[t] < this.nodes.length ? (this.nodes[this.idMap[t]].x = e.x,
                this.nodes[this.idMap[t]].y = e.y,
                this.nodes[this.idMap[t]].z = e.z) : console.warn("Ignore the node set_node_postion :", t, e),
            !n && this.enable && performance.now() - this.last_time_set > 500 && (this.last_time_set = performance.now(),
                this.stop_layout(),
                this.start_layout()))
    },
    pinNodeIds: function(t, e) {
        var n = this;
        (t = !Array.isArray(t) && this.idMap[t] >= 0 ? [t] : t || []).forEach(function(t) {
            !e && !n.pinNodes[t] && n.idMap[t] >= 0 && n.idMap[t] < n.nodes.length ? n.pinNodes[t] = {
                x: n.nodes[n.idMap[t]].x,
                y: n.nodes[n.idMap[t]].y,
                z: n.nodes[n.idMap[t]].z
            } : e && n.pinNodes[t] && delete n.pinNodes[t]
        })
    },
    pin_node: function(t) {
        t < 0 || "" == t ? console.log("will ignore the node :", t) : this.pinNodes[t] ? console.log("already pin the node :", t) : this.idMap[t] >= 0 && this.idMap[t] < this.nodes.length ? (console.log("pin-node:", t),
            this.pinNodes[t] = {
                x: this.nodes[this.idMap[t]].x,
                y: this.nodes[this.idMap[t]].y,
                z: this.nodes[this.idMap[t]].z
            }) : console.warn("Ignore the node set_node_postion :", t)
    },
    pinAll: function(t) {
        var e = this;
        t ? this.nodes.forEach(function(t, n) {
            e.pinNodes[t.id] = {
                x: t.x,
                y: t.y,
                z: t.z
            }
        }) : this.pinNodes = {}
    },
    unpin_node: function(t) {
        this.pinNodes[t] && (console.log("unpin-node:", t),
            delete this.pinNodes[t])
    },
    clean_graph: function() {
        this.pinNodes = {}
    },
    fix: function(t, e) {
        void 0 !== e && console.log("fix to current graph position")
    },
    set_weight: function(t, e) {
        this.nodes[t].weight = e
    },
    getLayout: function() {
        return this.force
    },
    updateDataChange: function(t) {
        this.isDateChage = t
    }
}