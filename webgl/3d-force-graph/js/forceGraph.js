function ForceGraph(options, store, graph, graphController) {
   this.options = options || {},
   this.updateFuncs = [],
   // this.graph = graph,
   this.nodeCounts = 0,
   // this.graphController = graphController,
   this.camera,
   this.camera_local,
   this.controls,
   this.scene,
   this.renderer,
   // this.vehicle = x.VehicleHome.clone(),
   this.renderObjects = [],
   // this.graph.addFilter(k.default),
   // this.graph.addFilter(M.default),
   // this.graph.addFilter(C.default),
   // this.graph.addFilter(S.default),
   // this.graph.addFilter(T.default),
   this.show_stats = !0,
   this.show_labels = this.options.showLabels || !1,
   this.selection = this.options.selection || !1,
   this.nodes_count = this.options.numNodes || 20,
   this.edges_count = this.options.numEdges || 10,
   // this.store = store,
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
   // this.layoutController = m.default,
   // this.layoutController.init(this.graph, this.getGraphPhysics()),
   this.initBasicThree(),
   this.initLighting(),
   // this.helpSlides = new L.default(this.scene, this.camera),
   // this.nodeCloud = new d.default(this.graph, this.cloudScene),
   // this.edgeCloud = new l.default(this.graph, this.cloudScene, this.store.getState().settings.hideArrow),
   // this.textCloud = new j.default(this.graph, this.cloudScene, this.camera),
   // this.mediaGroup = new P.default(this.cloudScene),
   // this.store.getState().settings.autoShowImage && this.addImageCloud(),
   // this.relationshipCloud = new h.default(this.cloudScene, this.graph, this.camera),
   // this.worldMap = new g.default({
   //     debug: s.Config.isDebug,
   //     z: -5,
   //     scale: .005
   // }),
   // this.cloudScene.add(this.worldMap),
   // g.default.configClick(this.worldMap, this.camera, this.controls),
   // this.dragSelection = new w.default,
   // this.dragSelection.on(this.dragSelection.eventNames.end, function(e, t) {
   //     c.handleSelectFromRegion(e, t)
   // }),
   // this.stlGroup = new D.default(this.cloudScene),
   // this.updateFuncs.push(this.stlGroup.update.bind(this.stlGroup)),
   // u.default.bindRender(this.renderer, this.camera, this.scene),
   // this.showArrow = !0,
   // this.detailDisplayTime = 3e3,
   // this.initVR(),
   // I.default.bindGraph(this.graph),
   // I.default.on("change", function(e) {
   //     c.highlightNeighbor(null);
   //     var t = I.default.singleNode;
   //     1 == t.selectCount && t.node ? c.store.dispatch(a.Actions.setCurrentNodeId(t.node.id)) : c.store.dispatch(a.Actions.setCurrentNodeId(null))
   // }, "Drawing"),
   // this.initControl(),
   // R.default.bindLayout(this.layoutController),
   // R.default.on("change", function(e) {
   //     c.layoutController.restart_layout()
   // }, "Drawing"),
   this.animate()
}

ForceGraph.prototype = {
    constructor: ForceGraph,
    initBasicThree: function() {
        var _this = this;
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("canvas-renderContainer").appendChild(this.renderer.domElement);
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
        this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, .01, 500);
        this.camera_local = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, .01, 500);
        this.camera_local.position.z = .001;
        this.camera_local.originalPosition = this.camera_local.position.clone();

        // this.camera.position.copy(this.camera_local.position.clone().add(new THREE.Vector3(0, 0, 3)));
        // this.camera.quaternion.copy(this.camera_local.quaternion);
        this.camera.position.set(0, 0, 0.001);
        // this.camera.lookAt(0, 0, 0);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enabled = true;
        this.controls.enableZoom = true;
        this.controls.enableRotate = true;
        this.controls.enablePan = true;
        this.controls.enableDamping = true;
        window.addEventListener("resize", function(t) {
            return _this.resizeRenderer(t)
        }, true);
        window.addEventListener("mousedown", function(e) {
            e.toElement && "canvas" == e.toElement.id && e.toElement.focus()
        }, true);
        this.resizeRenderer()
    },
    initLighting: function() {
        var light = new THREE.AmbientLight(0x9cc4e4);
        this.scene.add(light);
        this.headLamp = new THREE.SpotLight(0xffffff, 4, 40);
        this.headLamp.position.set(0, 0, 1);
        this.headLamp.target = this.camera;
        this.camera.add(this.headLamp);
    },
    resizeRenderer: function(e) {
        var t = window.innerWidth,
            n = window.innerHeight;
        this.camera.aspect = t / n,
        this.camera.updateProjectionMatrix(),
        this.renderer.setSize(t, n),
        this.mouseGraphControl && this.mouseGraphControl.gpuPicker && (this.mouseGraphControl.gpuPicker.resizeTexture(window.innerWidth, window.innerHeight),
        this.mouseGraphControl.gpuPicker.needUpdate = !0)
    },
    renderGraph: function(graph) {

      // test
        var scene = this.scene;
        // 坐标轴
        function drawAxis(len) {
            if (len === undefined) {
                len = 100;
            }
            // x 轴
            var xline_geom = new THREE.Geometry();
            xline_geom.vertices.push(new THREE.Vector3(0, 0, 0));
            xline_geom.vertices.push(new THREE.Vector3(len, 0, 0));
            var xline_material = new THREE.LineBasicMaterial({
                color: 0xff0000
            });
            var xline = new THREE.Line(xline_geom, xline_material);
            scene.add(xline);

            // y 轴
            var yline_geom = new THREE.Geometry();
            yline_geom.vertices.push(new THREE.Vector3(0, 0, 0));
            yline_geom.vertices.push(new THREE.Vector3(0, len, 0));
            var yline_material = new THREE.LineBasicMaterial({
                color: 0x00ff00
            });
            var yline = new THREE.Line(yline_geom, yline_material);
            scene.add(yline);

            // z 轴
            var zline_geom = new THREE.Geometry();
            zline_geom.vertices.push(new THREE.Vector3(0, 0, 0));
            zline_geom.vertices.push(new THREE.Vector3(0, 0, len));
            var zline_material = new THREE.LineBasicMaterial({
                color: 0x0000ff
            });
            var zline = new THREE.Line(zline_geom, zline_material);
            scene.add(zline);
        }
        drawAxis(256);
      // test

      this.nodeGroup && this.scene.remove(this.nodeGroup);
      this.linkGroup && this.scene.remove(this.linkGroup);

      var nodeGroup = this.nodeGroup = new THREE.Group();
      var linkGroup = this.linkGroup = new THREE.Group();

      this.scene.add(nodeGroup);
      this.scene.add(linkGroup);

      function getNodeById(id) {
         return graph.layoutNodes.find(n => n.id === id);
      }
      
      ////////////////////////画节点////////////////////////////
      var graphObj = {
        colorSchema: 0, ////
        renderNeedsUpdate: true,
        nodes: graph.layoutNodes.map((n, index) => ({
          id: n.id,
          index: index,
          position: new THREE.Vector3(n.position.x, n.position.y, n.position.z),
          color: 0x73BAFF,
          tagColor: 0xFFFFFF,
          size: 1.58,
          alpha: n.alpha,
          icon: 0
        })),
        edges: [],
        visibleNodes: graph.layoutNodes.map((n, index) => ({
          id: n.id,
          index: index,
          position: new THREE.Vector3(n.position.x, n.position.y, n.position.z),
          color: 0x73BAFF,
          tagColor: 0xFFFFFF,
          size: 1.58,
          alpha: n.alpha,
          icon: 0
        })),
        visibleEdges: [],
        layoutNodes: [],
        layoutEdges: [],
        nodeSet: {},
        options: {},
        filters: []
      };
      var gNode = new Node(graphObj, nodeGroup);
      gNode.update();
      // node {id, index, position, color, tagColor, size, alpha, icon}
      
      
      // graph.layoutNodes.forEach(n => {
      //   var geometry = new THREE.SphereGeometry(0.008, 32, 32, 0, Math.PI * 2);
      //   var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
      //     depthWrite: false,
      //     color: 0x73BAFF,
      //     transparent: true,
      //     opacity: 1
      //   }));
      //   mesh.position.set(n.position.x, n.position.y, n.position.z);
      //   nodeGroup.add(mesh);
      // });
      
      ////////////////////////画边////////////////////////////
      //NOTE:参照 app.js 104751
      var _this = this;
      var numEdges = graph.layoutEdges.length;
      var lineShader = {
        vertexShader:"attribute vec3 color; attribute float opacity; varying vec3 vColor; varying float vOpacity; void main() {vec3 newPosition = position; vColor = color; vOpacity = opacity; gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition,1.0 ); } ",
        fragmentShader: "varying vec3 vColor; varying float vOpacity; void main() {gl_FragColor = vec4(vColor,vOpacity); }"
      };
       (function() {
        var e = new THREE.BufferGeometry();
        var t = new THREE.ShaderMaterial({
            vertexShader: lineShader.vertexShader,
            fragmentShader: lineShader.fragmentShader,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });
        _this.createEdgeAttributesToGeometry(e, 0);
        e.computeBoundingSphere();
        e.name = "edge-geometry";
        e.boundingSphere.radius = 1;
        _this.geometry = e;
        var lineSegments = _this.lineSegments = new THREE.LineSegments(e,t);
        lineSegments.frustumCulled = false;
        lineSegments.visible = true;
        lineSegments.name = "edge";
        lineSegments.userData.isGPU = true;
        linkGroup.add(lineSegments);
      })();
      

      // window.setTimeout(() => {
        // console.log('update edges!!!!');
        this.points = [];
        this.createEdgeAttributesToGeometry(this.geometry, numEdges);
        var r = this.geometry.attributes;
        var color = new THREE.Color(0x1F3D7A);
        graph.layoutEdges.forEach((e, n) => {
          var source = getNodeById(e.sourceId);
          var target = getNodeById(e.targetId);
          source.position = new THREE.Vector3( source.position.x, source.position.y, source.position.z );
          target.position = new THREE.Vector3( target.position.x, target.position.y, target.position.z );
          var i = 2 * n;
          var o = 2 * n + 1;
          this.points[i] = source.position;
          this.points[o] = target.position;
          source.position.toArray(r.position.array, 3 * i);
          target.position.toArray(r.position.array, 3 * o);
          color.toArray(r.color.array, 3 * i);
          color.toArray(r.color.array, 3 * o);
          r.opacity.array[i] = 1;
          r.opacity.array[o] = 1;
        });
        r.position.needsUpdate = true;
        r.color.needsUpdate = true;
        r.opacity.needsUpdate = true;
      // }, 2000);


      // graph.layoutEdges.forEach((edge, index) => {
      //   var ps1 = getNodeById(edge.sourceId).position;
      //   var ps2 = getNodeById(edge.targetId).position;

      //   var xline_geom = new THREE.Geometry();
      //   xline_geom.vertices.push(ps1);
      //   xline_geom.vertices.push(ps2);
      //   var xline_material = new THREE.LineBasicMaterial({
      //       color: 0x1F3D7A
      //   });
      //   var xline = new THREE.Line(xline_geom, xline_material);
      //   linkGroup.add(xline);
      // });

      // this.scene.add(nodeGroup);
      // this.scene.add(linkGroup);
    },
    createEdgeAttributesToGeometry: function(e, t) {
        var n = {
            position: new Float32Array(2 * t * 3),
            color: new Float32Array(2 * t * 3),
            opacity: new Float32Array(2 * t)
        };
        return e.addAttribute("position", new THREE.Float32BufferAttribute(n.position,3)),
        e.addAttribute("color", new THREE.Float32BufferAttribute(n.color,3)),
        e.addAttribute("opacity", new THREE.Float32BufferAttribute(n.opacity,1)),
        e
    },
    animate: function() {
       Config.canRecord && window.performance.advance && window.performance.advance();
       var e = window.performance.now();
       this.renderer.render(this.scene, this.camera);
       Config.canRecord ? requestAnimationFrame(this.animate.bind(this)) : this.renderer.setAnimationLoop(this.animate.bind(this)),
           // this.graphController.update(e),
           // this.render(),
           this.controls.enabled && this.controls.update()
           // u.default.update(this.scene, this.camera)
    }
};