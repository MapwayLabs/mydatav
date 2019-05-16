// export default layoutController;
// 110092 layoutEngine:109892
var getWebWorker = function(e) {
    return new Worker("d3-force-3d/worker.js");
    // return new Worker("layoutWorker.worker.js");
};
var worker = getWebWorker();
window.addEventListener("beforeunload", function(e) {
    worker && worker.terminate && worker.terminate();
});
var layoutController = {
    // workerLayout: new Worker("layoutWorker.worker.js"),
    // workerLayout: new Worker("d3-force-3d/worker.js"),
    workerLayout: worker,
    graph: null,
    options: null,
    isFinish: false,
    _enable: true,
    cacheResLayoutNodes: null,
    pinNodes: {},
    init: function(e, t) {
        var n = this;
        this.graph = e,
            this.options = t,
            this.workerLayout.onmessage || (this.workerLayout.onmessage = function(e) {
                return n.handleMessage(e)
            }),
            this.workerLayout.postMessage({
                command: "init_graph",
                payload: {
                    graph: this.graph.serialize(),
                    options: this.options
                }
            });
         console.log(`节点数：${this.graph.nodes.length};关系数：${this.graph.edges.length}`);

    },
    initOrContinue: function(e, t) {
        var n = this;
        this.graph = e,
            this.options = t,
            this.workerLayout.onmessage || (this.workerLayout.onmessage = function(e) {
                return n.handleMessage(e)
            }),
            console.log("Init or continue Layout... with graph of " + this.graph.nodes.length + " nodes and " + this.graph.edges.length + " edges."),
            this.workerLayout.postMessage({
                command: "init_or_continue_graph",
                payload: {
                    graph: this.graph.serialize(),
                    options: this.options
                }
            })
    },
    handleMessage: function(e) {
        var t = e.data,
            n = t.command,
            r = t.payload,
            i = t.isFinish;
        switch (n) {
            case "new_position":
                this.cacheResLayoutNodes = r.layoutNodes,
                this.isFinish = i;
                break;
            case "new_stats":
                r.isStart && this.handleStart ? (this.handleStart(),
                this.isFinish = !1) : r.isFinish && this.handleStop && (this.handleStop(),
                this.isFinish = !0);
                break;
            default:
                console.log(n, "not recognized")
        }
    },
    get enable() {
        return this._enable
    },
    set enable(e) {
        this._enable = e,
            this.workerLayout.postMessage({
                command: "enable",
                payload: {
                    enable: e
                }
            })
    },
    updateEnableWithNoLayout: function(e) {
        this._enable = e,
            this.workerLayout.postMessage({
                command: "updateEnableWithNoLayout",
                payload: {
                    enable: e
                }
            })
    },
    updateSeparateRegion: function(e) {
        this.workerLayout.postMessage({
            command: "update_separate_region",
            payload: {
                separateRegion: e
            }
        })
    },
    updateRegionXScale: function(e) {
        this.workerLayout.postMessage({
            command: "update_region_x_scale",
            payload: {
                regionXScale: e
            }
        })
    },
    updateLayoutOption: function(e, t) {
        this.workerLayout.postMessage({
                command: "update_layout_option",
                payload: {
                    id: e,
                    value: t
                }
            }),
            this.restart_layout()
    },
    updateRegionCenter: function(e, t) {
        this.workerLayout.postMessage({
            command: "updateRegionCenter",
            payload: {
                regionCenter: e,
                defaultRegion: t
            }
        })
    },
    render: function() {
        this.cacheResLayoutNodes && (this.graph.updatePositionFromArray(this.cacheResLayoutNodes),
            this.cacheResLayoutNodes = null,
            this.graph.renderNeedsUpdate = !0)
    },
    start_layout: function() {
        this.workerLayout.postMessage({
            command: "start_layout",
            payload: {}
        })
    },
    stop_layout: function() {
        this.workerLayout.postMessage({
            command: "stop_layout",
            payload: {}
        })
    },
    restart_layout: function() {
        this.workerLayout.postMessage({
            command: "restart_layout",
            payload: {}
        })
    },
    set_node_position: function(e, t) {
        t && this.workerLayout.postMessage({
            command: "set_node_position",
            payload: {
                id: e,
                position: t
            }
        })
    },
    setNodesPositions: function(e, t) {
        this.workerLayout.postMessage({
            command: "setNodesPositions",
            payload: {
                nodeIds: e,
                positions: t
            }
        })
    },
    pinNodeIds: function(e, t) {
        var n = this;
        (e = !Array.isArray(e) && this.id_map[e] >= 0 ? [e] : e || []).forEach(function(e) {
                t || n.pinNodes[e] || !n.graph.nodeSet[e] ? t && n.pinNodes[e] && delete n.pinNodes[e] : n.pinNodes[e] = n.graph.nodeSet[e].position.clone()
            }),
            this.workerLayout.postMessage({
                command: "pinNodeIds",
                payload: {
                    nodeIds: e,
                    isUnPin: t
                }
            })
    },
    pin_node: function(e) {
        this.graph.nodeSet[e] && (this.pinNodes[e] = this.graph.nodeSet[e].position.clone()),
            this.workerLayout.postMessage({
                command: "pin_node",
                payload: {
                    id: e
                }
            })
    },
    pinAll: function(e) {
        var t = this;
        e ? this.graph.layoutNodes.forEach(function(e) {
                t.pinNodes[e.id] = e.position.clone()
            }) : this.pinNodes = {},
            this.workerLayout.postMessage({
                command: "pin_all",
                payload: {
                    isPin: e
                }
            })
    },
    unpin_node: function(e) {
        this.pinNodes[e] && delete this.pinNodes[e],
            this.workerLayout.postMessage({
                command: "unpin_node",
                payload: {
                    id: e
                }
            })
    },
    clean_graph: function() {
        this.pinNodes = {},
            this.workerLayout.postMessage({
                command: "clean_graph",
                payload: {}
            })
    },
    fix: function(e, t) {
        this.workerLayout.postMessage({
            command: "fix",
            payload: {
                id: e,
                position: t
            }
        })
    },
    reset_graph_restart_layout: function(e) {
        e && (this.graph = e),
            this.workerLayout.postMessage({
                command: "reset_graph_restart_layout",
                payload: {
                    graph: this.graph.serialize()
                }
            })
    }
};