全局变量 GraphXR
window._GXR
window.isDebug
window.force
window.Common
window.globalVariable
window._app
window._task


// 104309
WebGLRenderer

// 102111
Graph


// search:
combinator

// line:34397
key: "updateData",
value: function() {
    this.GraphSDK = o.default.instance(),
    this.GraphSDK && this.GraphSDK.graph && this.graphDataUpdate(this.GraphSDK.graph)

// line: 98699
o.forceSimulation(e)
.force("charge", o.forceManyBody().strength(-5e3))
.force("center", o.forceCenter(300, 300))
.force("x", o.forceX(300).strength(1))
.force("y", o.forceY(300).strength(1))
.force("link", o.forceLink(t))
.on("tick", this.tickActions.bind(this))


// line: 102156
This is layout  start

// line: 
Select Changed : change

// line: 30813 - worker.js
Worker: restart layout



/////////////// file: layoutWorker.worker.js
///
///
///
layoutEngine

// line: 27019
linkStrength

// line: 28068 d3-force部分


// line: 30772 处理各种消息
handleMessage

// line: 35986 d3布局核心代码 
//  d3.layout.force3D
graphD3Layout
console.log("initialize Layout..."),
this.force ? this.force.alpha() <= .5 && this.force.alpha(.6) : (this.force = a.default.layout.force3D(),
this.force.size([0, 0, 0])),
this.force
.nodes(this.nodes)
.links(this.links)
.linkStrength(this.graphD3Layout.linkStrength)
.linkDistance(this.graphD3Layout.linkDistance)
.charge(this.graphD3Layout.charge)
.gravity(this.graphD3Layout.gravity)
.heightCompress(r)
.friction(this.graphD3Layout.friction)
.on("tick", function() {
    _.size(n.pinNodes) > 0 && _.forEach(n.pinNodes, function(t, e) {
        n.idMap[e] >= 0 && n.idMap[e] < n.nodes.length && (n.nodes[n.idMap[e]].x = t.x,
        n.nodes[n.idMap[e]].y = t.y,
        n.nodes[n.idMap[e]].z = t.z)
}),










// JSON.stringify(t.data)

{
"command":"init_graph",
"payload":{
	"graph":{
		"layoutEdges":[],
		"layoutNodes":[]
	},
	"options":{
		"linkStrength":1,
		"linkDistance":0.5,
		"charge":-0.01,
		"gravity":0.2,
		"friction":0.3,
		"heightCompress":1}
	}
}

设定动画的冷却系数，运动过程中该系数会不断减小，直到等于0为止，此时动画也停止了。
其实：force.start() 是将 alpha 设定为 0.1（通过调用resume）后开始计算的；
force.resume() 等价于 alpha(0.1)；force.stop() 等价于 alpha(0)
































