import EventEmiter from './eventemiter';
import * as Util from './util';
import * as mapHelper from './maphelper';
import TextLayer from './layers/text-layer';

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
                far: 2000,
                distanceRatio: 1.35 // 相机离物理最佳距离（刚好看到物体全部）的倍数
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
            },
            global: {
                R: 220, // 球形地球半径
                center: [170, 35], // 初始中心点
                animation: true, // 是否转动
                animationSpeed: 1, // 转动快慢
                earthImgSrc: '../../images/earth.jpg', // 地球图片
                light: {
                    hemisphereLight:{
                        show: false,
                        skyColor: '#fff',
                        groundColor: '#333',
                        intensity: 2
                    },
                    // 环境光源 THREE.AmbientLight
                    ambient: {
                        color: '#fff',
                        intensity: 1
                    }
                }
            }
        };
        this.options = Util.extend(true, defaultOptions, options);

        this._layers = {};
        
        this._initBounds();
        this._initContainer(el);
        if (this.options.type === 'sphere') {
            this._initGlobal();
        } else {
            this._init3D();
        }  
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
                let spt = mapHelper.scalePoint(point, 1/this.options.SCALE_RATIO);
                if (lnglat.length === 3) {
                    spt.push(lnglat[2]);
                }
                return spt;
            } else {
                return lnglat;
            }
        } else {
            // sphere
            return this.lngLatToGlobal(lnglat[0], lnglat[1], lnglat[2]);
        }
    }
    // 经纬度坐标转球面坐标
    lngLatToGlobal(lng, lat, alt = 0) {
        // 以z轴正半轴作为零度经线起始处
        const phi = lng*(Math.PI/180);
        const theta = lat*(Math.PI/180);
        const radius = alt+this.options.global.R;
        const x = (radius * Math.sin(phi) * Math.cos(theta));
        const z = (radius * Math.cos(phi) * Math.cos(theta));
        const y = (radius * Math.sin(theta));
        return [x, y, z];
    }
    // 球面坐标转经纬度坐标
    globalToLnglat(globalPoint) {
        const x = globalPoint[0];
        const y = globalPoint[1];
        const z = globalPoint[2];
        const r = this.options.global.R;
        const theta = Math.asin(y / r);
        let lng = Math.acos(z / (r * Math.cos(theta))) * 180 / Math.PI;
        let lat = theta * 180 / Math.PI;
        if (x < 0) {
            lng = -lng;
        }
        return [lng, lat];
    }
    // 获取球面当前中心经纬度坐标
    // 只适用于 球形地球
    getCenterLngLat() {
        const size = this.getContainerSize();
        // 屏幕坐标
        const screenPoint = [size.width / 2, size.height / 2];
        // this.addDiv(screenPoint);
        // 世界坐标
        const worldPoint = mapHelper.screenToWorld(screenPoint, this);
        // this.addPoint(worldPoint);
        // 球面坐标
        const globalPoint = this._cacluateCrossPoint(worldPoint);
        // this.addPoint(globalPoint);
        // 经纬度坐标
        const centerLngLat = this.globalToLnglat(globalPoint);
        // console.log('centerLngLat:'+centerLngLat);
        return centerLngLat;
    }
    // 获取当前球面显示的经纬度范围
    // 只适用于 球形地球
    getLngLatRange() {
        let centerLngLat = this.getCenterLngLat();
        let centerLng = centerLngLat[0];
        let centerLat = centerLngLat[1];
        
        // 经度范围
        let leftLng = centerLng - 90;
        let rightLng = centerLng + 90;
        let lngRange = {
            min1: leftLng,
            max1: rightLng,
            min2: leftLng,
            max2: rightLng
        };
        if (leftLng < -180) {
            lngRange.min1 = -180;
            lngRange.max1 = rightLng;
            lngRange.min2 = leftLng + 360;
            lngRange.max2 = 180;
        }
        if (rightLng > 180) {
            lngRange.min1 = leftLng;
            lngRange.max1 = 180;
            lngRange.min2 = -180;
            lngRange.max2 = rightLng - 360;
        }
        
        // 纬度范围
        let latRange = {
            min1: -90,
            max1: 90,
            min2: -90,
            max2: 90
        };
        if (centerLat > 0) {
            latRange.min1 = - (90 - centerLat);
            latRange.max1 = 90;
            latRange.min2 =  - (90 - centerLat);
            latRange.max2 = 90;
        } else {
            latRange.min1 = -90;
            latRange.max1 = 90 + centerLat;
            latRange.min2 = -90;
            latRange.max2 = 90 + centerLat;   
        }
        let range = [lngRange, latRange];
        return range;
    }
    // 判断某个经纬度是否在范围内
    // 只适用于 球形地球
    isLngLatInRange(lnglat, range) {
        let rg = range || this.getLngLatRange();
        let isInRange = [0, 0];
        lnglat.forEach((d, index) => {
            let r = rg[index];
            if ((d > r.min1 && d < r.max1) || (d > r.min2 && d < r.max2)) {
                isInRange[index] = 1;
            }
        });
        return isInRange[0] && isInRange[1];
    }
    // 计算过球心且与屏幕坐标对应的直线与球面的交点
    // 只适用于 球形地球
    _cacluateCrossPoint(worldPoint) {
        // 通过世界坐标计算与球的交点坐标
        // 计算方法： 向量点积 和 直线对称式方程： x1/x = y1/y = z1/z
        const x1 = worldPoint[0];
        const y1 = worldPoint[1];
        const z1 = worldPoint[2];
        const r = this.options.global.R;
        const m = Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1);
        const rm = r * m;
        let x, y, z;
        
        if (x1 * y1 * z1 === 0) {
            if (x1 ===  0 && y1 * z1 !== 0) {
                let b = z1 / y1;
                x = 0;
                y = rm / (y1 + b * z1);
                z = b * y;
            } else if (y1 === 0 && x1 * z1 !== 0) {
                let b = z1 / x1;
                x = rm / (x1 + b * z1);
                y = 0;
                z = b * x;
            } else if (z1 === 0 && x1 * y1 !== 0) {
                let b = y1 / x1;
                x = rm / (x1 + b * y1);
                y = b * x1;
                z = 0;
            } else if (x1 === 0 && y1 === 0 && z1 !== 0) {
                x = 0;
                y = 0;
                z = rm / z1;
            } else if (x1 === 0 && y1 !== 0 && z1 === 0) {
                x = 0;
                y = rm / y1;;
                z = 0;
            } else if (x1 !== 0 && y1 === 0 && z1 === 0) {
                x = rm / x1;
                y = 0;
                z = 0;
            } else {
                x = 0;
                y = 0;
                z = 0;
            }
        } else {
            let b = y1 / x1;
            let c = z1 / x1;
            x = rm / (x1 + b * y1 + c * z1);
            y = b * x;
            z = c * x;
        }
        return [x, y, z];
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
                // this._orbitControl.object === this._camera 返回： true
                // this._orbitControl.object.position.set(16.42515, 369.562538, 333.99466);
                // this._orbitControl.target = new THREE.Vector3(10.06448, 51.62625, 6.71498);
                let d = this.getDistance(bounds.getHeight());
                let scaleD = d * this.options.camera.distanceRatio;
                let center = bounds.getCenter();
                this._orbitControl.object.position.set(center[0], scaleD, -center[1]);
                this._orbitControl.target = new THREE.Vector3(center[0], 0, -center[1]);
                // this._orbitControl.minDistance = d * 0.5;
                this._orbitControl.maxDistance = d * 2;
            } else if (this.options.region === 'china') {
                let d = this.getDistance(bounds.getHeight());
                let center = bounds.getCenter();
                let scaleD = d * 0.2; 
                this._orbitControl.object.position.set(center[0], center[1], scaleD);
                this._orbitControl.target = new THREE.Vector3(center[0], 0, -center[1]);
                this._orbitControl.minDistance = d * 0.25;
                this._orbitControl.maxDistance = d * 2;
            } else {
                let d = this.getDistance(bounds.getHeight());
                let scaleD = d * this.options.camera.distanceRatio;
                let center = bounds.getCenter();
                this._orbitControl.object.position.set(center[0], scaleD, -center[1]);
                this._orbitControl.target = new THREE.Vector3(center[0], 0, -center[1]);
                this._orbitControl.minDistance = d * 0.5;
                this._orbitControl.maxDistance = d * 2;
            }
        } else {
            // sphere
            let d = this.getDistance(this.options.global.R*2);
            let scaleD = d * this.options.camera.distanceRatio;
            this._orbitControl.object.position.set(0, 0, scaleD);
            this._orbitControl.target = new THREE.Vector3(0, 0, 0);
        }
        this._orbitControl.update();
    }
    // 获取相机到物体的距离，看到全部物体时
    getDistance(height) {
        // 视角
        const deg = THREE.Math.degToRad(this.options.camera.fov) / 2;
        // 视区高度
        const d = (height / 2) / Math.tan(deg);
        return d;
    }
    // 获取适配比例
    // 中国范围切换省市县行政区需要获取适配比例
    getRatio(regionBounds) {
        const chinaBounds = mapHelper.getBounds('china', this.options.crs);
        if (this.options.crs === mapHelper.CRS.epsg3857) {
            let scale = this.options.SCALE_RATIO;
            chinaBounds.scale(1/scale);
        }

        const h0 = chinaBounds.getHeight();
        const d0 = this.getDistance(h0);
        const h1 = regionBounds.getHeight();
        const d1 = this.getDistance(h1);

        return d1 / d0;
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
    // TODO: addLegend bdp
    addLegend(legendOptions) {
        let Legend = Dalaba.Chart.Legend;
        let legend = null;
        const size = this.getContainerSize();
        if (!this._legendCanvas) {
            this._legendCanvas = document.createElement('canvas');
            this._legendCanvas.width = this._renderer.domElement.width;
            this._legendCanvas.height = this._renderer.domElement.height;
            this._legendCanvas.style.width = size.width + 'px';
            this._legendCanvas.style.height = size.height + 'px';
            this._legendCanvas.className = 'three-map-legendcanvas';
            this._el.appendChild(this._legendCanvas);
        }
        if (Legend && legendOptions.enabled) {
            legend = new Legend(
                this._legendCanvas,//this.addLayer(legendOptions.layer),
                [{name: 9}],
                legendOptions//selected为false不读取
            );
        }
        return legend;
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

        this._orbitControl.addEventListener('change', e => {
            this.emit('change', e);
        });

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
    
    _initGlobal() {
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
        let d = this.getDistance(this.options.global.R*2);
        // this._orbitControl.minDistance = d; 
        this._orbitControl.minDistance = orbitControlOptions.minDistance;
        this._orbitControl.maxDistance = d*2; 
        // 最小、最大翻转角度 在哪个平面内就相对于哪个平面的坐标轴
        // this._orbitControl.minPolarAngle = Math.PI * orbitControlOptions.minPolarAngle / 180;
        // this._orbitControl.maxPolarAngle = Math.PI * orbitControlOptions.maxPolarAngle / 180; 
        // 最小、最大旋转角度
        // this._orbitControl.minAzimuthAngle = Math.PI * orbitControlOptions.minAzimuthAngle / 180;
        // this._orbitControl.maxAzimuthAngle = Math.PI * orbitControlOptions.maxAzimuthAngle / 180; 

        this._orbitControl.addEventListener('change', e => {
            this.emit('change', e);
        });

        this._orbitControl.saveState();
        this._orbitControl.update();

        // 灯光
        const lightOptions = this.options.global.light;
        if (lightOptions.hemisphereLight.show) {
            const hemisphereLight = new THREE.HemisphereLight(lightOptions.hemisphereLight.skyColor, lightOptions.hemisphereLight.groundColor, lightOptions.hemisphereLight.intensity);
            hemisphereLight.position.x = 0;
            hemisphereLight.position.y = 0;
            hemisphereLight.position.z = -this.options.global.R;
            this._scene.add(hemisphereLight);
        }
        // 环境光
        const ambientLight = new THREE.AmbientLight(lightOptions.ambient.color, lightOptions.ambient.intensity);
        this._scene.add(ambientLight);
        
        // 球面
        const globeTextureLoader = new THREE.TextureLoader();
        globeTextureLoader.load(this.options.global.earthImgSrc, texture => {
            const globeGgeometry = new THREE.SphereGeometry(this.options.global.R, 100, 100);
            const globeMaterial = new THREE.MeshStandardMaterial({map: texture});
            // test code -start
            // globeMaterial.transparent = true;
            // globeMaterial.opacity = 0.6;
            // test code - end
            const globeMesh = new THREE.Mesh(globeGgeometry, globeMaterial);
            this._scene.add(globeMesh);
            // this._scene.rotation.x = THREE.Math.degToRad(this.options.global.center[1]);
            // this._scene.rotation.y = THREE.Math.degToRad(this.options.global.center[0]);
            
            // 转整个场景：会影响其他
            // this._scene.rotateY(THREE.Math.degToRad(-this.options.global.center[0]-90)); // 经度
            // this._scene.rotateZ(THREE.Math.degToRad(-this.options.global.center[1]));  // 纬度
            
            // 转球自身
            // globeMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), THREE.Math.degToRad(-this.options.global.center[0]-90));
            // globeMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), THREE.Math.degToRad(this.options.global.center[1]));

            // 以z轴正半轴作为零度经线的起始点
            globeMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), THREE.Math.degToRad(-90));
            
        });
        
        // test code -start
        // this.drawAxis(this._scene, this.options.global.R*2);
        // test code -end
        
        // animate
        this._animate();
    }
    _initEvents() {
        this._onContainerResize = this._onContainerResize.bind(this);
        this._mousemoveEvtHandler = this._mousemoveEvtHandler.bind(this);
        window.addEventListener('resize', this._onContainerResize, false);
        this._renderer.domElement.addEventListener('mousemove', this._mousemoveEvtHandler, false);
        
        // 上下文丢失事件
        this._webglContextLostHandler = this._webglContextLostHandler.bind(this);     
        this._renderer.domElement.addEventListener("webglcontextlost", this._webglContextLostHandler , false);
        
        // 上下文恢复事件
        this._webglContextRestoreHandler = this._webglContextRestoreHandler.bind(this);
        this._renderer.domElement.addEventListener("webglcontextrestored", this._webglContextRestoreHandler, false);
    }
    _webglContextLostHandler (e) {
        e.preventDefault();
        this.emit('webglcontextlost', e);
    }
    _webglContextRestoreHandler (e) {
        this.emit('webglcontextrestored', e);
    }
    _animate() {
        this._animateId = requestAnimationFrame(this._animate.bind(this));
        this._orbitControl.update();
        if(this.options.type === 'sphere' && this.options.global.animation) {
            this._scene.rotation.y -= 0.005 * this.options.global.animationSpeed;
        }
         // update text layer scale to fix size
        for (let id in this._layers) {
            let layer = this._layers[id];
            if (layer instanceof TextLayer) {
                layer.updateScale();
            }
        }
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
        this._renderer.domElement.removeEventListener("webglcontextlost", this._webglContextLostHandler, false);
        this._renderer.domElement.removeEventListener("webglcontextrestored", this._webglContextRestoreHandler, false);        
        window.cancelAnimationFrame(this._animateId);
        if (Util.isInPage(this._container) && Util.isInPage(this._el)) {
            this._container.removeChild(this._el);
            this._el = null;
        }
    }
}