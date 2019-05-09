// import Config from './config';
// import DragSelection from './dragSelection';
// import NodeCloud from './nodeCloud';
// import EdgeCloud from './edgeCloud';
// import Graph2DControl from './graph2DControl';
// import GraphController from './graphController';
// import GraphShareInstance from './graphShareInstance';
// import ImageCloud from './imageCloud';
// import layoutController from './layoutController';
// import LayoutShareInstance from './layoutShareInstance';
// import MouseGraphControl from './mouseGraphControl';
// import { MouseStream, KeyboardStream } from './mouseStream';
// import TextCloud from './textCloud';
// import RelationShipCloud from './relationshipCloud';
// import ToolTip from './tooltip';
// export default Drawing;

// drawing 104224
// app 12603
// init 102435
// events 68336

const _near = 2.6;
function Drawing(options, graph) {
   this.options = options || {},
   this.updateFuncs = [],
   this.graph = graph,
   this.nodeCounts = 0,
   this.camera,
   // this.controls,
   this.scene,
   this.renderer,
   this.vehicle = new THREE.Vector3(0,0,3);
   this.renderObjects = [],
   this.show_stats = true,
   this.dom = this.options.dom,
   this.size = this.options.size,
   this.show_labels = this.options.showLabels || !1,
   this.selection = this.options.selection || !1,
   this.nodes_count = this.options.numNodes || 20,
   this.edges_count = this.options.numEdges || 10,
   this.fov = 42,
   this.nodeGeometry = new THREE.CircleGeometry(2, 100),
   this.headLamp,
   this.pcScale = 1,
   this.pointCloud,
   this.stats,
   this.plane = new THREE.Plane,
   this.raycaster = new THREE.Raycaster,
   this.raycaster.params.Points.threshold = .2,
   this.mouse = new THREE.Vector2,
   this.mouseRegion = new THREE.Vector4,
   this.offset = new THREE.Vector3,
   this.intersection = new THREE.Vector3,
   this.INTERSECTED = null,
   this.selectedNodeId = null,
   this.layoutController = layoutController,
   this.layoutController.init(this.graph, Config.layoutControllerOptions || {}),
   this.initBasicThree(),
   this.initLighting(),
   this.nodeCloud = new NodeCloud(this.graph, this.cloudScene),
   this.edgeCloud = new EdgeCloud(this.graph, this.cloudScene, true),
   // this.textCloud = new TextCloud(this.graph, this.cloudScene, this.camera),
   this.addImageCloud();
   this.relationshipCloud = new RelationShipCloud(this.cloudScene, this.graph, this.camera);

   // TODO:
   // this.dragSelection = { enable: false };
    this.dragSelection = new DragSelection({
      dom: this.dom
    }, this);
    this.dragSelection.on(this.dragSelection.eventNames.end, (e, t) => {
        this.handleSelectFromRegion(e, t)
    });
    
    // TODO:
    this.graphShareInstance = GraphShareInstance;
    this.graphShareInstance.bindGraph(this.graph);
    // I.default.bindGraph(this.graph);
    // I.default.on("change", function(e) {
    //     c.highlightNeighbor(null);
    //     var t = I.default.singleNode;
    //     1 == t.selectCount && t.node ? c.store.dispatch(a.Actions.setCurrentNodeId(t.node.id)) : c.store.dispatch(a.Actions.setCurrentNodeId(null))
    // }, "Drawing");

   this.layoutShareInstance = LayoutShareInstance;
   this.layoutShareInstance.bindLayout(this.layoutController);
   this.layoutShareInstance.on("change", e => {
        this.layoutController.restart_layout();
    }, "Drawing");

   this.tooltip = new ToolTip(this.dom);

   this.initControl();

   this.animate();
}

Drawing.prototype = {
    constructor: Drawing,
    initBasicThree: function() {
        var _this = this;
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        // this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setSize(this.size[0], this.size[1]);
        // document.getElementById("canvas-renderContainer").appendChild(this.renderer.domElement);
        this.dom.appendChild(this.renderer.domElement);
        this.renderer.domElement.id = "renderer";
        this.renderer.domElement.tabIndex = "9999";
        this.renderer.domElement.setAttribute("id", "renderer");
        this.renderer.setClearColor(0);
        this.renderer.domElement.style.zIndex = 999;
        this.renderer.sortObjects = false;
        this.renderer.domElement.oncontextmenu = function(e) {
           e.preventDefault()
        };

        this.scene = new THREE.Scene();
        this.scene.isGPU = true;
        this.cloudScene = new THREE.Group();
        this.cloudScene.isGPU = true;
        this.scene.add(this.cloudScene);
        // this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, .01, 500);
        this.camera = new THREE.PerspectiveCamera(this.fov, this.size[0] / this.size[1], .01, 500);
        this.camera.position.set(0, 0, 0.001).add(this.vehicle)
        // this.camera.position.set(0, 0, 0.001);
        // this.camera.lookAt(0, 0, 0);

        // this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        // this.controls.enabled = false;
        // this.controls.enableZoom = false;
        // this.controls.enableRotate = false;
        // this.controls.enablePan = false;
        // this.controls.enableDamping = false;
        
        // this.keyboardState = new THREEx.KeyboardState();
        this.keyboardState = GraphShareInstance.keyboardState;
        this.keyboardStream = new KeyboardStream();
        this.mouseStream = new MouseStream(this.renderer.domElement);
        this.graph2DControl = new Graph2DControl(this.camera, this.cloudScene, this.keyboardStream, this.mouseStream, this);
        this.updateFuncs.push(this.graph2DControl.update.bind(this.graph2DControl));
        
        window.addEventListener("resize", function(t) {
            return _this.resizeRenderer(t)
        }, true);
        window.addEventListener("mousedown", function(e) {
            e.toElement && "canvas" == e.toElement.id && e.toElement.focus()
        }, true);
        this.resizeRenderer()
    },
    addImageCloud: function() {
      this.imageCloud = new ImageCloud(this.graph,this.cloudScene,this.camera);
      this.cloudScene.add(this.imageCloud);
    },
    removeImageCloud: function() {
      if (this.imageCloud) {
        var e = this.imageCloud;
        this.imageCloud = null;
        e.restoreGraph();
      }
    },
    hideArrow: function(e) {
      this.edgeCloud.hideArrow(e);
    },
    initControl: function() {
        this.graphController = new GraphController(this.graph, this.scene, this.store, this);
        this.mouseGraphControl = new MouseGraphControl(this);
    },
    addRenderObject: function(e) {
      this.renderObjects.push(e);
    },
    removeRenderObject: function(e) {
      this.renderObjects.indexOf(e) >=0 && this.renderObjects.splice(this.renderObjects.indexOf(e), 1);
    },
    handleCleanGraph: function() {},
    startLayout: function() {
      this.layoutController.init(this.graph, Config.layoutControllerOptions || {});
    },
    forceStartLayout: function() {
      this.graph.update_degree();
      this.calculateTimeLine(this.graph);
      this.startLayout();
    },
    getGraphPhysics: function() {},
    updateSize: function() {
      var rect = this.dom.getBoundingClientRect();
      return this.size = [rect.width, rect.height];
    },
    resizeRenderer: function(e) {
        this.updateSize();
        // var t = window.innerWidth,
        //     n = window.innerHeight;
        var t = this.size[0],
            n = this.size[1];
        this.camera.aspect = t / n,
        this.camera.updateProjectionMatrix(),
        this.renderer.setSize(t, n),
        // this.mouseGraphControl && this.mouseGraphControl.gpuPicker && (this.mouseGraphControl.gpuPicker.resizeTexture(window.innerWidth, window.innerHeight),
        this.mouseGraphControl && this.mouseGraphControl.gpuPicker && (this.mouseGraphControl.gpuPicker.resizeTexture(this.size[0], this.size[1]),
        this.mouseGraphControl.gpuPicker.needUpdate = !0)
    },
    initLighting: function() {
        var light = new THREE.AmbientLight(0x9cc4e4);
        this.scene.add(light);
        this.headLamp = new THREE.SpotLight(0xffffff, 4, 40);
        this.headLamp.position.set(0, 0, 1);
        this.headLamp.target = this.camera;
        this.camera.add(this.headLamp);
    },
    animate: function() {
        Config.config.canRecord && window.performance.advance && window.performance.advance();
        var e = window.performance.now();
        Config.config.canRecord ? requestAnimationFrame(this.animate.bind(this)) : this.renderer.setAnimationLoop(this.animate.bind(this)),
        TWEEN.update(e),
        this.render()
        // this.controls.enabled && this.controls.update()
        // u.default.update(this.scene, this.camera);
    },
    updateControlCenter: function() {
        // var e = this.controls.target.clone().sub(this.controls.object.position).normalize();
        // this.controls.target.copy(this.controls.object.position.clone().add(e.multiplyScalar(.5)));
    },
    render: function() {
        var e = this;
        this.updateControlCenter();
        this.updateFuncs.forEach(function(e) {
            return e()
        });
        this.layoutController.render();
        this.graph.applyFilters();
        this.relationshipCloud.update();
        this.nodeCloud.update();
        this.edgeCloud.update();
        this.imageCloud && this.imageCloud.update();
        // this.textCloud.update();

        this.renderObjects.forEach(function(t) {
            t.update && t.update(e.scene, e.camera)
        });
        this.renderer.render(this.scene, this.camera);
    },
    removeNode: function(e) {
        void 0 != e.data.label_object && (this.cloudScene.remove(e.data.label_object),
        e.data.label_object = null)
    },
    removeEdge: function(e) {
        void 0 != e.data.arrow_object && (this.cloudScene.remove(e.data.arrow_object),
        e.data.arrow_object = null)
    },
    pinAll: function(e) {
       this.layoutController.pinAll(e);
    },
    clearAllPin: function() {
        this.layoutController.clean_graph();
        this.startLayout && this.startLayout();
    },
    toggleLeaf: function() {
        // this.hideLeaf ? this.hideLeaf = !1 : this.hideLeaf = !0,
        // this.graph.updateVisibleAndLayoutElements(this.hideLeaf),
        // I.default.selectWithNodeIds([], I.default.selectTypes.new),
        // this.store.dispatch(a.Actions.graphDataUpdate(_app.controller.graph.visibleNodes.length)),
        // this.startLayout && this.startLayout()
    },
    highlightNeighbor: function() {
        // T.default.updateNodeId(e, this.graph)
    },
    calculateTimeLine: function(e) {
        // var t = {};
        // e.visibleNodes.forEach(function(e) {
        //     var n = e.data.detail.type
        //       , r = e.data.detail.data;
        //     Object.keys(r).forEach(function(e) {
        //         if (/^\d{4}[-\/]\d{2}[-\/]\d{2}/gi.test(r[e]) && Date.parse(r[e]) > 0 || /create_at|created_at|date|time|hasfunded_at/i.test(e)) {
        //             if (!t[n] || !t[n][e]) {
        //                 var i = {};
        //                 t[n] = t[n] ? t[n] : {},
        //                 (i = {}).min = 0,
        //                 i.max = 0,
        //                 i.duration = !1,
        //                 i.duration_min = 0,
        //                 i.duration_max = 0,
        //                 i.duration_unit = 0,
        //                 t[n][e] = i
        //             }
        //             var o = null;
        //             try {
        //                 (o = new Date(r[e]).getTime()) || (o = parseInt(r[e]))
        //             } catch (e) {}
        //             0 == t[n][e].min && o && (t[n][e].min = o),
        //             o && o <= t[n][e].min && (t[n][e].min = o - o % 864e5),
        //             o && o > t[n][e].max && (t[n][e].max = o + (864e5 - o % 864e5))
        //         }
        //     })
        // })
        // _.isEmpty(t) || this.store.dispatch(a.Actions.setTimeRange(t))
    },
    convertScreenPoint: function(e) {
        var t = this.camera.position.clone()
          , n = (e = e.unproject(this.camera)).sub(t).normalize()
          , r = -t.z / n.z;
        return t.clone().add(n.multiplyScalar(r))  
    },
    convertCloudPoint: function(e) {
        var t = .5 * this.renderer.context.canvas.width
          , n = .5 * this.renderer.context.canvas.height
          , r = this.cloudScene.localToWorld(e.clone());
        return this.camera.updateMatrixWorld(),
        r.project(this.camera),
        r.x = r.x * t + t,
        r.y = -r.y * n + n,
        {
            x: r.x,
            y: r.y
        }
    },
    handleSelectFromRegion: function(e, t) {
        var n = this
          , r = e.left / this.size[0] * 2 - 1
          , o = (e.left + e.width) / this.size[0] * 2 - 1
          , a = -e.top / this.size[1] * 2 + 1
          , s = -(e.top + e.height) / this.size[1] * 2 + 1;
        r *= this.size[0] / this.size[1],
        o *= this.size[0] / this.size[1];
        var u = new THREE.Vector3(r,a,.5)
          , l = new THREE.Vector3(o,s,.5)
          , c = new THREE.Matrix4;
        c.makePerspective(.1 * u.x, .1 * l.x, .1 * u.y, .1 * l.y, .1 * _near, this.camera.far),
        this.camera.updateMatrixWorld(),
        this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld.clone());
        var d = new THREE.Matrix4;
        d.multiplyMatrices(c, this.camera.matrixWorldInverse.clone());
        var f = new THREE.Frustum;
        f.setFromMatrix(d);
        var h = [];
        this.graph.visibleNodes.forEach(function(e) {
            f.containsPoint(n.cloudScene.localToWorld(e.position.clone())) && h.push(e.id)
        });
        this.graphShareInstance.selectWithNodeIds(h);
    }
};