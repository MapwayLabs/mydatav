importScripts(
    '../lib/three.js', 
    '../lib/lodash.js', 
    '../lib/d3.js',
    './d3-binarytree.js', 
    './d3-quadtree.js', 
    './d3-octree.js', 
    './d3-dispatch.js', 
    './d3-timer.js', 
    './d3-force-3d.js',
    './d3.layout.force3D.js',
    // './d3.layout.force3D.min.js',
    './graph.js', 
    './layout.js');

// layoutWorker.worker.js 30729
var d3ForceGraph = {
    graph: new Graph(),
    layout: layout,
    timer: null,
    lastReportTime: 0,
    currentTime: (new Date).getTime(),
    init: function() {
        var t = this;
        self.onmessage = function(e) {
            return t.handleMessage(e)
        }
        ,
        this.layout.handleTick = function() {
            return t.handleTick()
        }
        ,
        this.layout.handleStart = function() {
            self.postMessage({
                command: "new_stats",
                payload: {
                    isStart: !0,
                    isFinish: !1
                }
            })
        }
        ,
        this.layout.handleStop = function() {
            self.postMessage({
                command: "new_stats",
                payload: {
                    isStart: !1,
                    isFinish: !0
                }
            }),
            t.clearTimer(),
            t.timer = setTimeout(function() {
                t.handleTick()
            }, 16)
        }
    },
    clearTimer: function() {
        this.timer && (clearTimeout(this.timer),
        this.timer = null)
    },
    handleMessage: function(t) {
        var e = t.data
          , n = e.command
          , r = e.payload;
        switch (n) {
        case "init_graph":
            console.log("Worker: Initializing graph"),
            this.graph.createFromArray(r.graph),
            this.layout.init(this.graph, r.options),
            this.layout.start_layout(),
            void 0 !== r.options.alpha && this.layout.force.alpha(r.options.alpha),
            this.startAutoTick();
            break;
        case "init_or_continue_graph":
            console.log("Worker: updating graph"),
            this.graph.createFromArray(r.graph),
            this.layout.initOrContinueGraph(this.graph, r.options),
            this.startAutoTick();
            break;
        case "update_separate_region":
            this.layout.updateSeparateRegion(r.separateRegion);
            break;
        case "update_region_x_scale":
            this.layout.updateRegionXScale(r.regionXScale);
            break;
        case "update_layout_option":
            this.layout.updateLayoutOption(r.id, r.value);
            break;
        case "updateRegionCenter":
            this.layout.updateRegionCenter(r.regionCenter, r.defaultRegion);
            break;
        case "start_layout":
            console.log("Worker: starting layout"),
            this.layout.start_layout(),
            this.startAutoTick();
            break;
        case "stop_layout":
            console.log("Worker: stoping layout"),
            this.layout.stop_layout();
            break;
        case "restart_layout":
            console.log("Worker: restart layout"),
            this.layout.restart_layout(),
            this.startAutoTick();
            break;
        case "set_node_position":
            this.layout.set_node_position(r.id, r.position),
            this.startAutoTick();
            break;
        case "setNodesPositions":
            this.layout.setNodesPositions(r.nodeIds, r.positions),
            this.startAutoTick();
            break;
        case "pinNodeIds":
            this.layout.pinNodeIds(r.nodeIds, r.isUnPin),
            this.startAutoTick();
            break;
        case "pin_node":
            this.layout.pin_node(r.id),
            this.startAutoTick();
            break;
        case "pin_all":
            this.layout.pinAll(r.isPin),
            this.startAutoTick();
            break;
        case "unpin_node":
            this.layout.unpin_node(r.id),
            this.startAutoTick();
            break;
        case "clean_graph":
            this.layout.clean_graph(),
            this.startAutoTick();
            break;
        case "fix":
            this.layout.fix(r.id, r.position),
            this.startAutoTick();
        case "reset_graph_restart_layout":
            this.layout.reset_graph_restart_layout(r.graph),
            this.startAutoTick();
            break;
        case "enable":
        case "updateEnableWithNoLayout":
            this.layout.enable = r.enable;
            break;
        default:
            console.log("Worker: command unrecognized:", n)
        }
    },
    handleTick: function() {
        if (!this.layout.enable)
            return this.clearTimer();
        this.layout.isFinish && this.clearTimer(),
        this.currentTime = performance.now(),
        this.currentTime - this.lastReportTime > 17 && (this.layout.render(!0),
        self.postMessage({
            command: "new_position",
            payload: this.graph.serialize(),
            isFinish: this.layout.isFinish
        }),
        this.lastReportTime = this.currentTime)
    },
    startAutoTick: function() {
        var t = this;
        this.autoTick(),
        this.clearTimer(),
        this.timer = setTimeout(function() {
            t.autoTick()
        }, 50)
    },
    autoTick: function() {
        var t = this;
        this.clearTimer(),
        this.timer = setTimeout(function() {
            t.autoTick()
        }, 50),
        this.layout.isFinish ? this.clearTimer() : this.handleTick()
    }
};

d3ForceGraph.init();




// function D3Layout() {
//     this.simulation = d3.forceSimulation([], 3).stop();
//     this.simulation.alpha(0.6)
//     .force("charge", d3.forceManyBody().strength(-0.01).theta(0.2))
//     .force("center", d3.forceCenter(0, 0, 0))
//     .force("x", d3.forceX(1))
//     .force("y", d3.forceY(1))
//     .force("z", d3.forceZ(1))
//     this.graph = new Graph();
//     this.init();
// }

// D3Layout.prototype = {
//     constructor: D3Layout,
//     init: function() {
//         var t = this;
//         self.onmessage = function(e) {
//             return t.handleMessage(e);
//         };

//         this.simulation.on('tick', function(e) {
//             t.handleTick();
//         });

//         this.simulation.on('end', function(e) {
//             t.handleStop();
//         });
//     },
//     handleMessage: function(t) {
//         var e = t.data,
//             n = e.command,
//             r = e.payload;
//         switch (n) {
//             case "init_graph": ////////////////
//                 console.log("Worker: Initializing graph");
//                 var idMap = {};
//                 r.graph.layoutNodes.forEach((e, i) => {
//                     idMap[e.id] = i;
//                 });
//                 this.graph.createFromArray(r.graph);
//                 this.simulation.nodes(r.graph.layoutNodes);
//                 this.simulation.force("link", d3.forceLink(r.graph.layoutEdges.map(e => ({
//                     source: idMap[e.sourceId],
//                     target: idMap[e.targetId]
//                 }))).distance(0.5).strength(1))
//                 this.simulation.restart();
//                 this.handleStart();
//                     // this.graph.createFromArray(r.graph),
//                     // this.layout.init(this.graph, r.options),
//                     // this.layout.start_layout(),
//                     // void 0 !== r.options.alpha && this.layout.force.alpha(r.options.alpha),
//                     // this.startAutoTick();
//                 break;
//             case "init_or_continue_graph":
//                 // console.log("Worker: updating graph"),
//                 //     this.graph.createFromArray(r.graph),
//                 //     this.layout.initOrContinueGraph(this.graph, r.options),
//                 //     this.startAutoTick();
//                 break;
//             case "update_separate_region":
//                 // this.layout.updateSeparateRegion(r.separateRegion);
//                 break;
//             case "update_region_x_scale":
//                 // this.layout.updateRegionXScale(r.regionXScale);
//                 break;
//             case "update_layout_option":
//                 // this.layout.updateLayoutOption(r.id, r.value);
//                 break;
//             case "updateRegionCenter":
//                 // this.layout.updateRegionCenter(r.regionCenter, r.defaultRegion);
//                 break;
//             case "start_layout": ////////////////
//                 console.log("Worker: starting layout");
//                 this.simulation.restart();
//                 this.handleStart();
//                 //     this.layout.start_layout(),
//                 //     this.startAutoTick();
//                 break;
//             case "stop_layout":
//                 console.log("Worker: stoping layout");
//                 this.simulation.stop();
//                     // this.layout.stop_layout();
//                 break;
//             case "restart_layout": ////////////////
//                 console.log("Worker: restart layout");
//                 this.simulation.restart();
//                 this.handleStart();
//                     // this.layout.restart_layout(),
//                     // this.startAutoTick();
//                 break;
//             case "set_node_position":
//                 // this.layout.set_node_position(r.id, r.position),
//                 //     this.startAutoTick();
//                 break;
//             case "setNodesPositions":
//                 // this.layout.setNodesPositions(r.nodeIds, r.positions),
//                 //     this.startAutoTick();
//                 break;
//             case "pinNodeIds":
//                 // this.layout.pinNodeIds(r.nodeIds, r.isUnPin),
//                     // this.startAutoTick();
//                 break;
//             case "pin_node":
//                 // this.layout.pin_node(r.id),
//                 //     this.startAutoTick();
//                 break;
//             case "pin_all":
//                 // this.layout.pinAll(r.isPin),
//                 //     this.startAutoTick();
//                 break;
//             case "unpin_node":
//                 // this.layout.unpin_node(r.id),
//                 //     this.startAutoTick();
//                 break;
//             case "clean_graph":
//                 // this.layout.clean_graph(),
//                 //     this.startAutoTick();
//                 break;
//             case "fix":
//                 // this.layout.fix(r.id, r.position),
//                 //     this.startAutoTick();
//             case "reset_graph_restart_layout":
//                 // this.layout.reset_graph_restart_layout(r.graph),
//                 //     this.startAutoTick();
//                 break;
//             case "enable":
//             case "updateEnableWithNoLayout":
//                 // this.layout.enable = r.enable;
//                 break;
//             default:
//                 console.log("Worker: command unrecognized:", n)
//         }
//     },
//     handleStart: function() {
//         self.postMessage({
//             command: "new_stats",
//             payload: {
//                 isStart: !0,
//                 isFinish: !1
//             }
//         })
//     },
//     handleTick: function() {
//     	this.graph.updatePositionFromArray(this.simulation.nodes().map(e => ({
//     		id: e.id, 
//     		position: { x: e.x, y: e.y, z: e.z }
//     	}))); 
//     	var s = this.graph.serialize();
//     	self.postMessage({
//             command: "new_position",
//             payload: s,
//             isFinish: false
//         });

//         // if (!this.layout.enable)
//         //     return this.clearTimer();
//         // this.layout.isFinish && this.clearTimer(),
//         //     this.currentTime = performance.now(),
//         //     this.currentTime - this.lastReportTime > 17 && (this.layout.render(!0),
//         //         self.postMessage({
//         //             command: "new_position",
//         //             payload: this.graph.serialize(),
//         //             isFinish: this.layout.isFinish
//         //         }),
//         //         this.lastReportTime = this.currentTime)
//     },
//     handleStop: function() {
//         self.postMessage({
//                 command: "new_stats",
//                 payload: {
//                     isStart: !1,
//                     isFinish: !0
//                 }
//             });
//             // t.clearTimer(),
//             // t.timer = setTimeout(function() {
//             //     t.handleTick()
//             // }, 16)
//     }
// };

// var layout = new D3Layout();