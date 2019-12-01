// import Helper from './helper';
// export default Graph2DControl;

// 111766
// use 100363
function Graph2DControl(t, n, r, i, drawing) {
    var o = this;
    this.camera = t,
    this.object = n,
    this.keyboardStream = r,
    this.mouseStream = i,
    this.drawing = drawing;
    this.rotating = false,
    this.speed = 1,
    this.sign = 1,
    this.lastX = 0,
    this.lastY = 0,
    // window.moveActionTween = null,
    this.objectOriginal = {
        position: this.object.position.clone(),
        rotation: this.object.rotation.clone(),
        quaternion: this.object.quaternion.clone()
    },
    this.keyboardStream.down.filter(function(e) {
        return "Shift" == e
    }).subscribe(function() {
        o.speed = 10
    }),
    this.keyboardStream.up.filter(function(e) {
        return "Shift" == e
    }).subscribe(function() {
        return o.speed = 1
    }),
    this.keyboardStream.down.filter(function(e) {
        return "Alt" == e
    }).subscribe(function() {
        o.sign = -1
    }),
    this.keyboardStream.up.filter(function(e) {
        return "Alt" == e
    }).subscribe(function() {
        return o.sign = 1
    }),
    this.velocity = new THREE.Vector3,
    this.mouseStream.down.subscribe(function(e) {
        o.lastX = e.x,
        o.lastY = e.y
    }),
    this.mouseStream.up.subscribe(function(e) {
        o.mouseStream.enable && o.drawing && o.drawing.dragSelection && (o.drawing.dragSelection.enable = true),
        o.showAxes(false)
    }),
    this.initMoveStream(),
    this.initRotateStream(),
    this.initZoomStream()	
}

Graph2DControl.prototype = {
	constructor: Graph2DControl,
	showAxes: function(e, t) {
		if (e){
			if (!this._axesHelper) {
				this._axesHelper = new THREE.AxesHelper(1);
				this.object.add(this._axesHelper);
			}
	        this._axesHelper.position.copy(t.clone());
		} else {
			if (this._axesHelper) {
				// s.default.releaseMesh(this.axesHelper); // TODO:
				this.object.remove(this._axesHelper);
				this._axesHelper = null;
			}
		}
    },
    initMoveStream: function() {
        var e = this;
        // this.panStream = this.keyboardStream.down.filter(function(e) {
        //     return "1" == e
        // }).flatMap(function() {
        //     return (0,
        //     Helper.UpdateMoveCursor)(!0, !1, !1, !1),
        //     e.mouseStream.drag.takeUntil(e.keyboardStream.up.filter(function(e) {
        //         return "1" == e
        //     }))
        // }),
        // this.panStream.subscribe(function(t) {
            // if (1 == t.buttons) {
            //     var n = _app.store.getState().node.moveBorder;
            //     t.x > .9 && "right" != n && _app.store.dispatch(l.Actions.showMoveBorder("right")),
            //     t.x < -.9 && "left" != n && _app.store.dispatch(l.Actions.showMoveBorder("left")),
            //     t.y > .9 && "top" != n && _app.store.dispatch(l.Actions.showMoveBorder("top")),
            //     t.y < -.9 && "bottom" != n && _app.store.dispatch(l.Actions.showMoveBorder("bottom")),
            //     .9 >= t.y && t.y >= -.9 && .9 >= t.x && t.x >= -.9 && "" != n && _app.store.dispatch(l.Actions.showMoveBorder(""));
            //     var r = ""
            //       , o = t.x - e.lastX
            //       , a = t.y - e.lastY;
            //     if (o *= 2,
            //     a *= 2,
            //     e.drawing.dragSelection.enable = !1,
            //     r = Math.abs(o) > Math.abs(a) ? o > 0 ? "right" : "left" : a > 0 ? "up" : "down",
            //     "" == n)
            //         switch (window.moveActionTween && (window.moveActionTween.stop(),
            //         window.moveActionTween = null),
            //         r) {
            //         case "left":
            //             e.moveLeft(1 * o);
            //             break;
            //         case "right":
            //             e.moveRight(1 * o);
            //             break;
            //         case "up":
            //             e.moveUp(1 * a);
            //             break;
            //         case "down":
            //             e.moveDown(1 * a)
            //         }
            //     else
            //         window.moveActionTween || (window.moveActionTween = new i.default.Tween({
            //             t: 0
            //         }).to({
            //             t: 1
            //         }, 1e3).onUpdate(function(t) {
            //             switch (n) {
            //             case "left":
            //                 e.moveLeft(-.01);
            //                 break;
            //             case "top":
            //                 e.moveUp(.01);
            //                 break;
            //             case "right":
            //                 e.moveRight(.01);
            //                 break;
            //             case "bottom":
            //                 e.moveDown(-.01)
            //             }
            //         }).easing(i.default.Easing.Quadratic.InOut).start().repeat(1 / 0));
            //     e.lastX = t.x,
            //     e.lastY = t.y
            // }
        // }),
        // 通过键盘方向键移动场景
        this.keyboardStream.down.filter(function(e) {
            return String(e).includes("Arrow")
        }).subscribe(function(t) {
            switch (t) {
            case "ArrowLeft":
                e.moveLeft(.03);
                break;
            case "ArrowUp":
                e.moveUp(-.03);
                break;
            case "ArrowRight":
                e.moveRight(-.03);
                break;
            case "ArrowDown":
                e.moveDown(.03)
            }
        })
    },
    initRotateStream: function() {
        var e = this;
        // this.rotateStream = this.keyboardStream.down.filter(function(e) {
        //     return "3" == e
        // }).flatMap(function(t) {
        //     return (0,
        //     Helper.UpdateMoveCursor)(!1, !0, !1, !1),
        //     e.mouseStream.drag.takeUntil(e.keyboardStream.up.filter(function(e) {
        //         return "3" == e
        //     }))
        // }).subscribe(function(t) {
            // var n = _app.store.getState().node.moveBorder; //TODO:
            // t.x > .9 && "right" != n && _app.store.dispatch(l.Actions.showMoveBorder("right")),
            // t.x < -.9 && "left" != n && _app.store.dispatch(l.Actions.showMoveBorder("left")),
            // t.y > .9 && "top" != n && _app.store.dispatch(l.Actions.showMoveBorder("top")),
            // t.y < -.9 && "bottom" != n && _app.store.dispatch(l.Actions.showMoveBorder("bottom")),
            // .9 >= t.y && t.y >= -.9 && .9 >= t.x && t.x >= -.9 && "" != n && _app.store.dispatch(l.Actions.showMoveBorder("")),
            // e.handleRotate(t)
        // }),
        this.mouseStream.down.filter(function(e) {
            return e.right
        }).flatMap(function(t) {
            (0,
            Helper.UpdateMoveCursor)(!1, !0, !1, !1),
            window.isRightClick = !0;
            // var n = _app.store.getState().node.moveBorder;
            // return t.x > .9 && "right" != n && _app.store.dispatch(l.Actions.showMoveBorder("right")),
            // t.x < -.9 && "left" != n && _app.store.dispatch(l.Actions.showMoveBorder("left")),
            // t.y > .9 && "top" != n && _app.store.dispatch(l.Actions.showMoveBorder("top")),
            // t.y < -.9 && "bottom" != n && _app.store.dispatch(l.Actions.showMoveBorder("bottom")),
            // .9 >= t.y && t.y >= -.9 && .9 >= t.x && t.x >= -.9 && "" != n && _app.store.dispatch(l.Actions.showMoveBorder("")),
            return e.mouseStream.move.takeUntil(e.mouseStream.up)
        }).subscribe(function(t) {
            e.handleRotate(t)
        })
    },
    handleRotate: function(e, t) {
        var n = this;
        this.drawing.dragSelection.enable = !1,
        // TODO:
        /* "" == _app.store.getState().node.moveBorder */ true ? (window.rotateActionTween && (window.rotateActionTween.stop(),
        window.rotateActionTween = null),
        Math.abs(e.x - this.lastX) < .1 && (this.rotateAroundSelectedNode(1 * (e.x - this.lastX), 1 * (e.y - this.lastY), e.x, e.y, t),
        this.lastRotate = {
            x: 1 * (e.x - this.lastX),
            y: 1 * (e.y - this.lastY),
            xPoint: e.x,
            yPoint: e.y,
            type: t
        })) : window.rotateActionTween || (window.rotateActionTween = new TWEEN.Tween({
            t: 0
        }).to({
            t: 1
        }, 1e3).onUpdate(function(e) {
            n.rotateAroundSelectedNode(n.lastRotate.x, n.lastRotate.y, n.lastRotate.xPoint.x, n.lastRotate.yPoint.y, n.lastRotate.type)
        }).easing(TWEEN.Easing.Quadratic.InOut).start().repeat(1 / 0)),
        this.lastX = e.x,
        this.lastY = e.y
    },
    initZoomStream: function() {
        var e = this;
        // this.zoomStream = this.keyboardStream.down.filter(function(e) {
        //     return "2" == e
        // }).flatMap(function() {
        //     return e.mouseStream.drag.takeUntil(e.keyboardStream.up.filter(function(e) {
        //         return "2" == e
        //     }))
        // }),
        // this.zoomStream.subscribe(function(t) {
        //     this.drawing.dragSelection.enable = !1;
        //     t.x,
        //     e.lastX;
        //     var n = t.y - e.lastY;
        //     n = -1 * n * 2;
        //     var r = t.startPos
        //       , i = new THREE.Vector3(r.x,r.y,.5);
        //     i.unproject(e.camera),
        //     i.sub(e.camera.position).normalize(),
        //     n >= 0 ? e.moveBackward(n, i) : e.moveForward(n, i),
        //     e.lastX = t.x,
        //     e.lastY = t.y
        // }),
        this.mouseStream.wheel.subscribe(function(t) {
            var n = -1 * t.deltaY * 2 / 1e3
              , r = new THREE.Vector3(t.x,t.y,.5);
            r.unproject(e.camera),
            r.sub(e.camera.position).normalize(),
            n > 0 ? e.moveBackward(n, r) : e.moveForward(n, r),
            e.lastY = t.deltaY
        })
    },
    moveForward: function(e, t) {
        (0,
        Helper.UpdateMoveCursor)(!1, !1, !0, !1);
        var n = new THREE.Vector3;
        this.camera.getWorldDirection(n),
        void 0 !== t && (n = t),
        this.object.position.add(n.clone().multiplyScalar(-1 * e))
    },
    moveBackward: function(e, t) {
        (0,
        Helper.UpdateMoveCursor)(!1, !1, !1, !0);
        var n = new THREE.Vector3;
        this.camera.getWorldDirection(n),
        void 0 !== t && (n = t),
        this.object.position.add(n.multiplyScalar(-1 * e))
    },
    moveLeft: function(e) {
        var t = new THREE.Vector3;
        this.camera.getWorldDirection(t),
        t.cross(this.camera.up).normalize(),
        this.object.position.add(t.clone().multiplyScalar(1 * e))
    },
    moveRight: function(e) {
        var t = new THREE.Vector3;
        this.camera.getWorldDirection(t);
        var n = t.clone().cross(this.camera.up).normalize();
        this.object.position.add(n.clone().multiplyScalar(1 * e))
    },
    moveUp: function(e) {
        var t = new THREE.Vector3;
        this.camera.getWorldDirection(t);
        var n = t.clone().cross(this.camera.up).cross(t.clone()).normalize();
        this.object.position.add(n.multiplyScalar(1 * e))
    },
    moveDown: function(e) {
        var t = new THREE.Vector3;
        this.camera.getWorldDirection(t);
        var n = t.clone().cross(this.camera.up).cross(t).normalize();
        this.object.position.add(n.multiplyScalar(1 * e))
    },
    flyToNode: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
          , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3e3;
        this.flyToPosition(e.position, t, n)
    },
    flyToPosition: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
          , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3e3
          , r = e
          , i = this.object.localToWorld(r.clone()).clone()
          , o = this.object.position.clone().sub(i).add(new THREE.Vector3(0,0,t));
        this.moveScene(o, n)
    },
    reset: function() {
        var e = this
          , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3e3
          , n = {
            t: 0
        }
          , r = this.object.position.clone()
          , o = this.object.quaternion.clone()
          , a = this.objectOriginal.quaternion.clone();
        new TWEEN.Tween(n).to({
            t: 1
        }, t).onUpdate(function() {
            var t = r.clone().multiplyScalar(1 - n.t).add(e.objectOriginal.position.clone().multiplyScalar(n.t));
            e.object.position.copy(t),
            THREE.Quaternion.slerp(o, a, e.object.quaternion, n.t)
        }).easing(TWEEN.Easing.Quadratic.InOut).start(window.performance.now())
    },
    moveScene: function(e) {
        var t = this
          , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3e3
          , r = this.object.position.clone()
          , o = {
            t: 0
        };
        new TWEEN.Tween(o).to({
            t: 1
        }, n).onUpdate(function() {
            var n = r.clone().multiplyScalar(1 - o.t).add(e.clone().multiplyScalar(o.t));
            t.object.position.copy(n)
        }).easing(TWEEN.Easing.Quadratic.InOut).start(window.performance.now())
    },
    rotateScene: function(e) {
        var t = new THREE.Vector3(0,0,0)
          , n = this.object.worldToLocal(t.clone());
        this.rotateAroundSelectedNode(e, 0, n)
    },
    rotateAroundSelectedNode: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
          , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
        arguments[4];
        window.isRightClick = !1;
        var n = this.drawing.graphShareInstance.center
          , r = this.object.localToWorld(n.clone())
          , i = e * Math.PI
          , a = -1 * t * Math.PI;
        this.object.rotateY(i),
        this.object.rotateOnWorldAxis(new THREE.Vector3(1,0,0), a),
        this.object.updateMatrixWorld();
        var s = this.object.localToWorld(n.clone()).sub(r);
        this.object.position.sub(s),
        this.showAxes(true, n)
    },
    convertToAxisAndAngle: function(e, t, n, r) {
        var i = new THREE.Vector3
          , o = function(e, t, n) {
            return Math.min(Math.max(e, t), n)
        }
          , a = o(1 - 1.2 * Math.sqrt(n * n + r * r), 0, 1)
          , s = new THREE.Vector3(n,r,a).normalize()
          , u = new THREE.Vector3(o(e, -1, 1) + s.x,o(-t, -1, 1) + s.y,s.z);
        u.normalize();
        var l = Math.acos(o(s.dot(u) / s.length() / u.length(), -1, 1));
        return isNaN(l),
        l && i.crossVectors(s, u).normalize(),
        {
            axis: i,
            angle: l
        }
    },
    update: function() {
        this.rotating && this.rotateAroundSelectedNode(.002 * this.speed * this.sign, 0)
    }
};