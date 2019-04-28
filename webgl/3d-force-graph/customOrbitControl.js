function CustomOrbitControl(scene, camera, renderer) {
    this._scene = scene;
    this._camera = camera;
    this._renderer = renderer;
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
    this.center = new THREE.Vector3();
    this._triggered = false;
    this._selectHandler = new SelectHandler(renderer.domElement)
        .onStart(e => {
            const event = e.e;
            // 限制右键点击触发
            // if (event.button !== 2) {
            //     return this._triggered = false;
            // }
            // this._triggered = true;
            this.lastXY.x = event.offsetX / this.size.width * 2 - 1;
            this.lastXY.y = -event.offsetY / this.size.height * 2 + 1;
        })
        .onSelect(e => {
            // if (!this._triggered) return;
            const event = e.e;
            this.latestMousePoint.x = event.offsetX / this.size.width * 2 - 1;
            this.latestMousePoint.y = -event.offsetY / this.size.height * 2 + 1;
            this.latestMousePoint.screenX = event.offsetX;
            this.latestMousePoint.screenY = event.offsetY;
            if (Math.abs(this.latestMousePoint.x - this.lastXY.x) < .1) {
                this.rotateAroundSelectedNode(1 * (this.latestMousePoint.x - this.lastXY.x), 1 * (this
                        .latestMousePoint.y - this.lastXY.y), this.latestMousePoint.x, this
                    .latestMousePoint.y);
            }
            this.lastXY.x = this.latestMousePoint.x;
            this.lastXY.y = this.latestMousePoint.y;
        })
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