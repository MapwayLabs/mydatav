import EventEmiter from './eventemiter'
import * as Util from './util'
import * as mapHelper from './maphelper'

export default class ThreeMap extends EventEmiter {
    constructor(el, options) {
        super();
        const defaultOptions = {
            type: 'plane', // plane or sphere ,平面或球面
            region: 'world', // china or world, 中国或世界地图
            crs: mapHelper.CRS.epsg3857, // 地图采用的地理坐标系 EPSG:4326: 经纬度，EPSG:3857: 墨卡托
            SCALE_RATIO: 100000, // 地球墨卡托平面缩放比例
            containerClassName: 'three-map-container', // 地图容器类名
            camera: {
                fov: 45,
                near: 0.1,
                far: 2000
            },
            orbitControlOptions: {
                minDistance: 0, // 最小距离
                maxDistance: Infinity, // 最大距离
                // 垂直方向翻转角度，范围：0-180 度
                minPolarAngle: 0, 
                maxPolarAngle: 180,
                // 横向旋转角度，范围：-180-180 度，Infinity 表示不限制
                minAzimuthAngle: -Infinity, 
                maxAzimuthAngle: Infinity
            },
            light: {
                // 主光源：太阳光 THREE.DirectionalLight
                main: {
                    color: '#fff',
                    intensity: 1, // 主光源的强度，0-1
                    shadow: false, // 主光源是否投射阴影。默认关闭。开启阴影可以给场景带来更真实和有层次的光照效果。但是同时也会增加程序的运行开销。
                    shadowQuality: 'medium', // 阴影的质量。可选'low', 'medium', 'high', 'ultra'
                    alpha: 40, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。
                    beta: 40 // 主光源绕 y 轴，即左右旋转的角度。
                },
                // 环境光源 THREE.AmbientLight
                ambient: {
                    color: '#fff',
                    intensity: 0.2
                }
            }
        };
        this.options = Util.extend(true, defaultOptions, options);

        this._layers = {};
        
        this._initBounds();
        this._initContainer(el);
        this._init3D();
        this._initEvents();
    }
    getBounds() {
        return this._fullBound;
    }
    addLayer(layer) {
        var id = Util.stamp(layer);
        if (this._layers[id]) {
            return this;
        }

        this._layers[id] = layer;
        this._scene.add(layer.getContainer());

        layer.onAdd(this);

        return this;
    }
    removeLayer(layer) {
        var id = Util.stamp(layer);
        if (!this._layers[id]) {
            return this;
        }

        delete this._layers[id];
        this._scene.remove(layer.getContainer());

        layer.onRemove(this);

        return this;
    }
    hasLayer(layer) {
        return !!layer && (Util.stamp(layer) in this._layers);
    }
    clearLayers() {
        for (var id in this._layers) {
            this.removeLayer(this._layers[id]);
        }
    }
    projectLngLat(lnglat) {
        if (this.options.type === 'plane') {
            if (this.options.crs === mapHelper.CRS.epsg3857) {
                let point = mapHelper.wgs84ToMecator(lnglat);
                return mapHelper.scalePoint(point, 1/this.options.SCALE_RATIO);
            } else {
                return lnglat;
            }
        } else {
            // sphere
        }
    }
    updateSize() {
        this._onContainerResize();
    }
    resetView() {
        this._orbitControl.reset();
    }
    setView(bounds) {
        // TODO: 自动适配
        if (this.options.type === 'plane') {
            if (this.options.region === 'world') {
                this._orbitControl.object.position.set(16.42515, 369.562538, 333.99466);
                this._orbitControl.target = new THREE.Vector3(10.06448, 51.62625, 6.71498);
            } else {
                let cameraOptions = this.options.camera;
                let a = (Math.PI / 180) * (cameraOptions.fov / 2);
                // let b = Math.max(bounds.getWidth(), bounds.getHeight()) / 2;
                let b = bounds.getHeight() / 2;
                let distance = b / Math.tan(a);
                let center = bounds.getCenter();
                this._orbitControl.object.position.set(0, 0, distance);
                this._orbitControl.object.translateX(center[0]);
                this._orbitControl.object.translateY(center[1]);
                this._orbitControl.target = new THREE.Vector3(center[0], center[1], 0);
            }
        } else {
            // sphere
        }
        this._orbitControl.update();
    }
    getContainerElement() {
        return this._el;
    }
    getContainerSize() {
        const compStyle = Util.getCmpStyle(this._el);
        const width = parseInt(compStyle.width);
        const height = parseInt(compStyle.height);
        return { width, height };
    }
    getCamera() {
        return this._camera;
    }
    _initBounds() {
        if (this.options.type === 'plane') {
            if (this.options.region === 'china') {
                this._fullBound = mapHelper.getBounds('china', this.options.crs);
            } else {
                this._fullBound = mapHelper.getBounds('world', this.options.crs);
            }
        }
    }
    _initContainer(el) {
        this._container = typeof el === 'string' ? document.getElementById(el) : el;
        if (!this._container) {
            throw new Error("未提供父容器,请为地图提供一个父容器！");
        }

        this._el = document.createElement('div');
        this._el.style.height = '100%';
        this._el.style.margin = 0;
        this._el.style.padding = 0;
        Util.addClass(this._el, this.options.containerClassName);

        this._container.appendChild(this._el);
    }
    _init3D() {
        if (THREE == undefined) throw new Error('需先引入 threejs 库！');
        if (THREE.OrbitControls == undefined) throw new Error('需先引入 OrbitControls 组件！');

        const size = this.getContainerSize();
        const dpr = Util.getDpr();

        // 初始化画布
        this._renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        this._renderer.setPixelRatio(dpr);
        this._renderer.setClearColor(0x000000, 0); // 背景透明 
        this._renderer.setSize(size.width, size.height, true);
        this._renderer.domElement.className = 'chart-canvas';
        this._el.appendChild(this._renderer.domElement);

        // 设置场景
        this._scene = new THREE.Scene();

        // 相机
        const cameraOptions = this.options.camera;
        this._camera = new THREE.PerspectiveCamera(cameraOptions.fov, size.width / size.height, cameraOptions.near, cameraOptions.far);

        // 控件
        const orbitControlOptions = this.options.orbitControlOptions;
        this._orbitControl = new THREE.OrbitControls(this._camera, this._renderer.domElement);
        // 距离相机的最小、最大距离，仅用于透视相机
        this._orbitControl.minDistance = orbitControlOptions.minDistance; 
        this._orbitControl.maxDistance = orbitControlOptions.maxDistance; 
        // 最小、最大翻转角度 在哪个平面内就相对于哪个平面的坐标轴
        this._orbitControl.minPolarAngle = Math.PI * orbitControlOptions.minPolarAngle / 180;
        this._orbitControl.maxPolarAngle = Math.PI * orbitControlOptions.maxPolarAngle / 180; 
        // 最小、最大旋转角度
        this._orbitControl.minAzimuthAngle = Math.PI * orbitControlOptions.minAzimuthAngle / 180;
        this._orbitControl.maxAzimuthAngle = Math.PI * orbitControlOptions.maxAzimuthAngle / 180; 
        // OrbitControls加入后，托管了相机，所以必须通过它来改变相机参数
        // camera.lookAt()失效问题https://stackoverflow.com/questions/10325095/threejs-camera-lookat-has-no-effect-is-there-something-im-doing-wrong
        // this._orbitControl.object.position.set(0, 0, 100)
        // this._orbitControl.target = new THREE.Vector3(12245143.987260092, 0, -3482189.0854086173)
        this._orbitControl.saveState();
        this._orbitControl.update();

        // 灯光
        const lightOptions = this.options.light;
        const directionalLight = new THREE.DirectionalLight(lightOptions.main.color, lightOptions.main.intensity);
        directionalLight.position.set(-1, 1, 1);
        const ambientLight = new THREE.AmbientLight(lightOptions.ambient.color, lightOptions.ambient.intensity);
        this._scene.add(directionalLight);
        this._scene.add(ambientLight);
        this._mainLight = directionalLight;
        this._ambientLight = ambientLight;

        // animate
        this._animate();
    }
    _initEvents() {
        this._onContainerResize = this._onContainerResize.bind(this);
        this._mousemoveEvtHandler = this._mousemoveEvtHandler.bind(this);
        window.addEventListener('resize', this._onContainerResize, false);
        this._renderer.domElement.addEventListener('mousemove', this._mousemoveEvtHandler, false);
    }
    _animate() {
        this._animateId = requestAnimationFrame(this._animate.bind(this));
        this._orbitControl.update();
        this._renderer.render(this._scene, this._camera);
    }
    _onContainerResize() {
        const size = this.getContainerSize();

        // 设置透视摄像机的长宽比
        this._camera.aspect = size.width / size.height;
        // 摄像机的 position 和 target 是自动更新的，而 fov、aspect、near、far 的修改则需要重新计算投影矩阵（projection matrix）
        this._camera.updateProjectionMatrix();
        // 设置渲染器输出的 canvas 的大小
        this._renderer.setSize(size.width, size.height, true);
    }
    _mousemoveEvtHandler(e) {
        this.emit('mousemove', e);
    }
    destroy() {
        this.clearLayers();
        window.removeEventListener('resize', this._onContainerResize, false);
        this._renderer.domElement.removeEventListener('mousemove', this._mousemoveEvtHandler, false);
        window.cancelAnimationFrame(this._animateId);
        if (Util.isInPage(this._container) && Util.isInPage(this._el)) {
            this._container.removeChild(this._el);
            this._el = null;
        }
    }
}