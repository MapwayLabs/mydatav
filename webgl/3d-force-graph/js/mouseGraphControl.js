// import Helper from './helper';
// export default MouseGraphControl;

// 68337
function MouseGraphControl(t) {
    this.graph = t.graph;
    this.camera = t.camera;
    this.renderer = t.renderer;
    this.scene = t.scene;
    this.cloudScene = t.cloudScene;
    // this.cameraControl = t.cameraControl;
    this.keyboardState = t.keyboardState;
    this.mouseStream = t.mouseStream;
    this.keyboardStream = t.keyboardStream;
    this.nodeCloud = t.nodeCloud;
    // this.neighborsCount = t.neighborsCount || 25;
    this.layoutController = t.layoutController;
    this.graphController = t.graphController;
    this.edgeCloud = t.edgeCloud;
    // this.modelCloud = t.modelCloud;
    this.graphShareInstance = t.graphShareInstance;
    this.layoutShareInstance = t.layoutShareInstance;
    this.relationshipCloud = t.relationshipCloud;
    this.dragSelection = t.dragSelection;
    this.tooltip = t.tooltip;
    this.drawing = t;
    this.newRelationshipNodes = [];
    this.init();
    this.initGUPPicker();
    this.handleStream();
    this.handleMouseOverStream();
    this.handleDBClickStram();
}

MouseGraphControl.prototype = {
	constructor: MouseGraphControl,
	init: function() {
        this.raycaster = new THREE.Raycaster,
        this.raycaster.params.Points.threshold = .05
    },
    initGUPPicker: function() {},
    handleDBClickStram: function() {},
    handleStream: function() {
        var e = this;
        this.mouseStream.down.subscribe(function(t){
            e.tooltip && e.tooltip.close();
        }),
        this.mouseHandleStream = this.mouseStream.down.filter(function(e) {
            return !e.right
        }).flatMap(function(t) {
            if (e.lastX = t.x,
            e.lastY = t.y,
            !e.nodeCloud || !e.nodeCloud.points || e.keyboardState.pressed("ctrl") || e.keyboardState.pressed("1") || e.keyboardState.pressed("2") || e.keyboardState.pressed("3"))
                return window.Rx.Observable.empty();
            var n = null
              , r = null
              , a = new THREE.Vector3;
            if (e.keyboardState.pressed("5")) {
                if (r = new THREE.Plane,
                n = e.graph.visibleNodes.find(function(e) {
                    return e.selected
                })) {
                    var l = n
                      , c = e.nodeCloud.parent.localToWorld(l.position.clone());
                    a = l.position.clone(),
                    r.setFromNormalAndCoplanarPoint(e.camera.getWorldDirection(e.camera.position.clone()), c),
                    e.dragSelection.enable = !1
                }
            } else {
                r = new THREE.Plane;
                var d = new THREE.Vector2(t.x,t.y);
                e.raycaster.setFromCamera(d, e.camera);
                var f = e.raycaster.intersectObject(e.nodeCloud.points);
                if ((n = f.length > 0 ? f[0] : null) && e.graph.visibleNodes[n.index]) {
                    var h = e.graph.visibleNodes[n.index]
                      , p = e.nodeCloud.parent.localToWorld(h.position.clone());
                    a = h.position.clone(),
                    r.setFromNormalAndCoplanarPoint(e.camera.getWorldDirection(e.camera.position.clone()), p),
                    e.dragSelection.enable = !1
                    e.graphShareInstance.selectWithNodeIds([h.id]) 
                }
                // var m = e.raycaster.intersectObjects(e.cloudScene.getObjectByName("cloud-video").children);
                // m.length > 0 && _app.controller.drawing.mediaGroup.handleVideoIn2D(m[0].object.name)
            }
            var g = e.intersectPlane(t, r)
              , y = e.nodeCloud.parent.worldToLocal(g).clone().sub(a);
            return e.mouseStream.move.map(function(e) {
                return {
                    selected: n,
                    plane: r,
                    position: e,
                    initOffset: y
                }
            }).takeUntil(e.mouseStream.up)
        }),
        this.mouseHandleStream.filter(function(e) {
            return !!e.selected
        }).subscribe(function(t) {
            var n = e.intersectPlane(t.position, t.plane)
              , r = e.nodeCloud.parent.worldToLocal(n);
            e.keyboardState.pressed("5") ? e.handleDragNDrop(t.selected.index, r, t.initOffset) : e.handleDragNDrop(t.selected.index, r)
        }),
        this.mouseStream.up.subscribe(function(t) {
            if (window.isRightClick) {
                // 鼠标右键事件
                var n = new THREE.Vector2(t.x,t.y);
                e.raycaster.setFromCamera(n, e.camera);
                var r = e.raycaster.intersectObject(e.nodeCloud.points)
                  , o = r.length > 0 ? r[0] : null
                  , a = o && e.graph.visibleNodes[o.index] ? e.graph.visibleNodes[o.index] : {};
                // _app.store.dispatch(d.Actions.showRightPanel({
                //     x: t.x,
                //     y: t.y,
                //     nodes: a
                // })),
                // var sp = e.drawing.convertCloudPoint(new THREE.Vector3(t.x, t.y, 1));
                
                if (Object.keys(a).length) {
                    e.graphShareInstance.selectWithNodeIds([a.id]);
                    window.ringMenuInstance.open(t.offsetX, t.offsetY);
                }
                
                window.isRightClick = !1
            }
            Helper.UpdateMoveCursor(false),
            window.moveActionTween && (/*_app.store.dispatch(d.Actions.showMoveBorder("")),*/
            window.moveActionTween.stop(),
            window.moveActionTween = null),
            window.rotateActionTween && (/*_app.store.dispatch(d.Actions.showMoveBorder("")),*/
            window.rotateActionTween.stop(),
            window.rotateActionTween = null)
        })
        // this.keyboardStream.down.filter(function(e) {
        //     return ["Control", "Shift", "Alt", "1", "2", "3", "5"].includes(e)
        // }).subscribe(function(e) {
            // m("1" == e || "5" == e, "3" == e, !1, !1, "2" == e)
        // }),
        // this.keyboardStream.up.filter(function(e) {
        //     return ["Control", "Shift", "Alt", "1", "2", "3", "5"].includes(e)
        // }).subscribe(function(e) {
            // m(!1),
            // "" != _app.store.getState().node.moveBorder && _app.store.dispatch(d.Actions.showMoveBorder("")),
            // window.moveActionTween && (window.moveActionTween.stop(),
            // window.moveActionTween = null),
            // window.rotateActionTween && (window.rotateActionTween.stop(),
            // window.rotateActionTween = null)
        // })
    },
    intersectPlane: function(e, t) {
        this.raycaster.setFromCamera(e, this.camera),
        this.raycaster.source = "mouse";
        var n = new THREE.Vector3;
        return this.raycaster.ray.intersectPlane(t, n),
        n
    },
    handleMouseOverStream: function() {
        var e = this;
        // this.keyboardStream.down.merge(this.mouseStream.down).subscribe(function(t) {
        //     e.graphController && e.graphController.showNodeInfo && e.graphController.showNodeInfo(null)
        // }),
        this.mouseStream.move.debounceTime(300).distinctUntilChanged().filter(function(e) {
            return e.buttons <= 0 && !e.isFilter
        }).filter(function(e) {
            // if ($("#project-node-info-panel").position()) {
            //     var t = $("#project-node-info-panel").position()
            //       , n = {
            //         top: t.top + $("#project-node-info-panel").height(),
            //         left: t.left + $("#project-node-info-panel").width()
            //     };
            //     return !(e.screenX >= t.left && e.screenX <= n.left && e.screenY >= t.top && e.screenY <= n.top)
            // }
            // return !0
            return true;
        }).subscribe(function(t) {
            var n = new THREE.Vector2(t.x,t.y);
            e.raycaster.setFromCamera(n, e.camera);
            var r = e.raycaster.intersectObject(e.nodeCloud.points)
              , o = r.length > 0 ? r[0] : null
              , a = o && e.graph.visibleNodes[o.index] ? e.graph.visibleNodes[o.index] : {};
            e.graphController.showNodeInfo(a.id)
        })
    },
    handleDragNDrop: function(e, t, n) {
        var r = this;
        if (this.keyboardState.pressed("5")) {
            // this.cameraControl.enabled = !1,
            this.dragSelection.enable = !1;
            var i = this.graph.visibleNodes.find(function(t) {
                return t.index == e
            });
            if (!i)
                return;
            Helper.UpdateMoveCursor(true);
            var o = t.clone().sub(n).sub(i.position.clone())
              , c = this.keyboardState.pressed("5") ? _.map(this.graphShareInstance.selectNodeIdsMap, function(e, t) {
                return t
            }) : [i.id];
            this.layoutShareInstance.pinNodeIds(c),
            this.layoutController.setNodesPositions(c, c.map(function(e) {
                if (!r.graph.nodeSet[e])
                    return null;
                var t = r.graph.nodeSet[e].position.clone().add(o);
                return r.graph.nodeSet[e].position.copy(t),
                t
            }))
        } else {
            // this.cameraControl.enabled = !1,
            this.dragSelection.enable = !1;
            var d = this.graph.visibleNodes.find(function(t) {
                return t.index == e
            });
            if (!d)
                return;
            Helper.UpdateMoveCursor(true);
            var f = t.clone().sub(this.graph.nodeSet[d.id].position.clone())
              , h = this.keyboardState.pressed("shift") ? _.map(this.graphShareInstance.selectNodeIdsMap, function(e, t) {
                return t
            }) : [d.id];
            this.layoutShareInstance.pinNodeIds(h),
            this.layoutController.setNodesPositions(h, h.map(function(e) {
                if (!r.graph.nodeSet[e])
                    return null;
                var t = r.graph.nodeSet[e].position.clone().add(f);
                return r.graph.nodeSet[e].position.copy(t),
                t
            }))
        }
    }
};