// import SelectHandler from './selectHandler';
// export default CustomOrbitControl;
function CustomOrbitControl(scene, camera, renderer, axesHelper, graph) {
    this._scene = scene;
    this._camera = camera;
    this._renderer = renderer;
    this._axesHelper = axesHelper;
    this._graph = graph;
    this._axesHelper && (this._axesHelper.name = 'axesHelper');
    this.size = {
        width: renderer.domElement.width,
        height: renderer.domElement.height
    };
    this.lastXY = {
        x: 0,
        y: 0
    };
    this.latestMousePoint = {
        x: 0,
        y: 0,
        screenX: 0,
        screenY: 0
    };
    this.center = new THREE.Vector3(0, 0, 0);
    this._selectHandler = new SelectHandler(renderer.domElement)
        .onStart(e => {
            this._graph && this._graph.enablePointerInteraction(false);
            // this._graph && this._graph.force().d3AlphaTarget(0).resetCountdown();
            this._graph && this._graph._animationCycle();
            // console.log( this._graph.graphData().nodes );
            const event = e.e;
            this.lastXY.x = event.offsetX / this.size.width * 2 - 1;
            this.lastXY.y = -event.offsetY / this.size.height * 2 + 1;
        })
        .onSelect(e => {
            const event = e.e;
            this.latestMousePoint.x = event.offsetX / this.size.width * 2 - 1;
            this.latestMousePoint.y = -event.offsetY / this.size.height * 2 + 1;
            this.latestMousePoint.screenX = event.offsetX;
            this.latestMousePoint.screenY = event.offsetY;
            if (Math.abs(this.latestMousePoint.x - this.lastXY.x) < .1) {
                // console.log('rotateCenter：' + this.center.toArray().toString());
                this.rotateAroundSelectedNode(1 * (this.latestMousePoint.x - this.lastXY.x), 1 * (this
                        .latestMousePoint.y - this.lastXY.y), this.latestMousePoint.x, this
                    .latestMousePoint.y);
            }
            this.lastXY.x = this.latestMousePoint.x;
            this.lastXY.y = this.latestMousePoint.y;
        })
        .onEnd(e => {
            this.removeAxis();
            this._graph && this._graph.enablePointerInteraction(true);
            this._graph && this._graph.pauseAnimation();
        })
        .setTriggerKey('right')
        .startSelect();
}
CustomOrbitControl.prototype = {
    constructor: CustomOrbitControl,
    rotateAroundSelectedNode: function (e, t) {
        t = t || 0;
        var n = this.center;
        var r = this._scene.localToWorld(n.clone());
        var i = e * Math.PI;
        var a = -1 * t * Math.PI;
        this._scene.rotateY(i);
        this._scene.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), a);
        this._scene.updateMatrixWorld();
        var s = this._scene.localToWorld(n.clone()).sub(r);
        this._scene.position.sub(s);
        this.addAxis();
        this._scene.updateMatrixWorld(true);
        // this._graph.graphData().nodes.forEach(n => {
        //     n.__threeObj.updateMatrix();
        //     n.__threeObj.updateMatrixWorld(true);
        // });
    },
    addAxis: function() {
        if (this._axesHelper && !this._scene.getObjectByName('axesHelper')) {
            this._scene.add(this._axesHelper);
        }
        this._axesHelper.position.copy(this.center);
    },
    removeAxis: function() {
        if (this._axesHelper) {
            this._scene.remove(this._axesHelper);
        }
    },
    moveLeft: function (e) {
        e = e || 5;
        var t = new THREE.Vector3();
        this._camera.getWorldDirection(t);
        t.cross(this._camera.up).normalize();
        this._scene.position.add(t.clone().multiplyScalar(1 * e));
    },
    moveRight: function (e) {
        e = e || -5;
        var t = new THREE.Vector3();
        this._camera.getWorldDirection(t);
        var n = t.clone().cross(this._camera.up).normalize();
        this._scene.position.add(n.clone().multiplyScalar(1 * e));
    },
    moveUp: function (e) {
        e = e || -5;
        var t = new THREE.Vector3();
        this._camera.getWorldDirection(t);
        var n = t.clone().cross(this._camera.up).cross(t.clone()).normalize();
        this._scene.position.add(n.multiplyScalar(1 * e));
    },
    moveDown: function (e) {
        e = e || 5;
        var t = new THREE.Vector3();
        this._camera.getWorldDirection(t);
        var n = t.clone().cross(this._camera.up).cross(t).normalize();
        this._scene.position.add(n.multiplyScalar(1 * e));
    },
    moveForward: function (e) {
        e = e || 5;
        var n = new THREE.Vector3();
        this._camera.getWorldDirection(n);
        this._scene.position.add(n.clone().multiplyScalar(-1 * e));
    },
    moveBackward: function (e) {
        e = e || -5;
        var n = new THREE.Vector3();
        this._camera.getWorldDirection(n);
        this._scene.position.add(n.clone().multiplyScalar(-1 * e));
    },
    rotateLeft: function (e) {
        e = e || 0.05;
        this.rotateAroundSelectedNode(e);
    },
    rotateRight: function (e) {
        e = e || -0.05;
        this.rotateAroundSelectedNode(e);
    }
};
