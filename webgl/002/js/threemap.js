import EventEmiter from './eventemiter'
import Util from './util'

export default class ThreeMap extends EventEmiter {
    constructor(el, options) {
        super();
        var defaultOptions = {
            containerClassName: 'three-map-container',
            lightColor: 0xffffff,
            type: '2d' // 2d or 3d
        };
        this.options = Util.extend(defaultOptions, options);

        this._initContainer();

        var bound = {
            xmin: 73.4766,
            xmax: 135.0879,
            ymin: 18.1055,
            ymax: 53.5693,
            width: function () {
                return (this.xmax - this.xmin);
            },
            height: function () {
                return (this.ymax - this.ymin);
            },
            center: function () {
                var tx = (this.xmax - this.xmin) / 2;
                var ty = (this.ymax - this.ymin) / 2;
                return [tx + this.xmin, ty + this.ymin];
            }
        }
        this.fullBound = bound

        this._layers = {}

        this._init()
    }
    addLayer(layer) {
        var id = Util.stamp(layer)
        if (this._layers[id]) {
            return this;
        }

        this._layers[id] = layer
        this._scene.add(layer.getContainer())

        layer.onAdd(this)

        return this
    }
    removeLayer(layer) {
        var id = Util.stamp(layer)
        if (!this._layers[id]) {
            return this;
        }

        delete this._layers[id]
        this._scene.remove(layer.getContainer())

        layer.onRemove(this)

        return this
    }
    hasLayer(layer) {
        return !!layer && (Util.stamp(layer) in this._layers)
    }
    clearLayers() {
        for (var id in this._layers) {
            this.removeLayer(this._layers[id])
        }
    }
    updateSize() {
        this._onContainerResize()
    }
    resetView() {
        this._orbitControl.reset()
    }
    setView(bounds, isFull) {
        if (isFull === undefined) {
            isFull = ture
        }
        var deafultMinDis = 30,
            defaultMaxDis = 200;
        if (isFull) {
            // 全国区域的最佳显示效果
            // TODO 待优化，此处暂时写死
            this._orbitControl.minDistance = deafultMinDis
            this._orbitControl.maxDistance = defaultMaxDis
            this._orbitControl.object.position.set(109.58688917016474, 16.051696751000303, -9.408028404329741)
            this._orbitControl.target = new THREE.Vector3(106.61608780527186, -6.091, -47.26487677586227)
        } else {
            var center = bounds.center()
            var opt = this.getOptimalDistance(bounds)
            this._orbitControl.minDistance = deafultMinDis * opt.ratio
            this._orbitControl.maxDistance = defaultMaxDis * opt.ratio
            this._orbitControl.object.position.set(center[0], opt.d, -center[1])
            this._orbitControl.target = new THREE.Vector3(center[0], 0, -center[1])
        }
        this._orbitControl.update()
    }
    // 将区域 bounds 和 全国 bounds 进行对比，找到相机合适的距离，以自动适配范围
    // 计算方式根据视角组成的相似三角形
    getOptimalDistance(bounds) {
        if (!bounds) {
            return {
                d: 60,
                ratio: 1
            }
        }
        var h0 = 35.464 // 全国区域外包矩形高度
        var d0 = 60 // 全国区域相机初始距离，TODO 待优化，暂时写死
        var h1 = bounds.height()
        var d1 = h1 * d0 / h0
        return {
            d: d1, // 实际距离
            ratio: d1 / d0 // 距离比例
        }
    }
    getContainerElement() {
        return this._el;
    }
    getContainerSize() {
        const compStyle = Util.getCmpStyle(this._el);
        let width = parseInt(compStyle.width);
        let height = parseInt(compStyle.height);
        return { width, height };
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
    _init() {
        if (THREE === undefined) throw new Error('需先引入threejs库！');
        if (THREE.OrbitControls === undefined) throw new Error('需先引入 THREE.OrbitControls 组件！');

        // 初始化画布
        this._renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        })
        this._renderer.setClearColor(0x000000, 0) // 背景透明
        this._renderer.setSize(this._width, this._height)
        this._el.appendChild(this._renderer.domElement)

        this._renderer.domElement.style.width = '100%'
        this._renderer.domElement.style.height = '100%'
        this._renderer.domElement.className = 'chart-canvas';

        // 设置场景
        this._scene = new THREE.Scene()

        // 相机
        this._camera = new THREE.PerspectiveCamera(45, this._width / this._height, 1, 1000)

        // 控件
        this._orbitControl = new THREE.OrbitControls(this._camera, this._renderer.domElement)
        // this._orbitControl.minDistance = 30 // 距离相机的最小距离，仅用于透视相机
        // this._orbitControl.maxDistance = 200 // 距离相机的最大距离，仅用于透视相机
        // 在哪个平面内就相对于哪个平面的坐标轴
        this._orbitControl.maxPolarAngle = Math.PI / 2 // 最大翻转角度
        this._orbitControl.maxAzimuthAngle = Math.PI / 2
        this._orbitControl.minAzimuthAngle = -Math.PI / 2
        // OrbitControls加入后，托管了相机，所以必须通过它来改变相机参数
        // camera.lookAt()失效问题https://stackoverflow.com/questions/10325095/threejs-camera-lookat-has-no-effect-is-there-something-im-doing-wrong
        // this._orbitControl.object.position.set(105.59873331348234, 44.01266686517651, 27.216466924729595)
        // this._orbitControl.target = new THREE.Vector3(110, 0, -30)
        this._orbitControl.saveState()
        this._orbitControl.update()

        // 灯光
        this._scene.add(new THREE.AmbientLight(this.options.lightColor, 0.6))
        this._light = new THREE.DirectionalLight(this.options.lightColor, 0.8)
        this._light2 = new THREE.DirectionalLight(this.options.lightColor, 0.1)
        this._light.position.set(-1, 1, 1)
        this._light2.position.set(1, 1, 1)
        this._scene.add(this._light)
        this._scene.add(this._light2)

        // animate
        this._animate()

        // events 
        this._onContainerResize = this._onContainerResize.bind(this)
        window.addEventListener('resize', this._onContainerResize, false)

        this._mousemoveEvtHandler = this._mousemoveEvtHandler.bind(this)
        this._renderer.domElement.addEventListener('mousemove', this._mousemoveEvtHandler, false)
    }
    _mousemoveEvtHandler(e) {
        this.emit('mousemove', e)
    }
    _animate() {
        this._animateId = requestAnimationFrame(this._animate.bind(this))
        this._orbitControl.update()
        this._renderer.render(this._scene, this._camera)
    }
    _onContainerResize() {
        const compStyle = getComputedStyle(this._el)
        this._width = parseInt(compStyle.width)
        this._height = parseInt(compStyle.height)

        // 设置透视摄像机的长宽比
        this._camera.aspect = this._width / this._height
        // 摄像机的 position 和 target 是自动更新的，而 fov、aspect、near、far 的修改则需要重新计算投影矩阵（projection matrix）
        this._camera.updateProjectionMatrix()
        // 设置渲染器输出的 canvas 的大小
        this._renderer.setSize(this._width, this._height, true)
    }
    destroy() {
        this.clearLayers()
        window.removeEventListener('resize', this._onContainerResize, false)
        this._renderer.domElement.removeEventListener('mousemove', this._mousemoveEvtHandler, false)
        cancelAnimationFrame(this._animateId)
        if (this._container && this._container.hasChildNodes(this._el)) {
            this._container.removeChild(this._el)
            this._el = null
        }
    }
}