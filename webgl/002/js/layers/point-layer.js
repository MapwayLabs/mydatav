import Layer from './layer';
import * as Util from '../util';
import ToolTip from '../tooltip';

export default class PointLayer extends Layer {
    constructor(data, options) {
        // data: [{points:[],info:{}}, {points:[],info:null}, ....]
        super(data, options);
        const defaultOptions = {
            size: 3,
            style: {
                texture: '../../images/disc.png', //  url or null
                color: '#0f0',
                opacity: 1,
            },
            tooltip: {
                show: false
            },
            hightLight: {
                show: true,
                color: '#f00'
            }
        };
        this.options = Util.extend(true, defaultOptions, options); 
    }
    onAdd(map) {
        Layer.prototype.onAdd.call(this, map); 
        this._draw();
        if (this.options.hightLight.show || this.options.tooltip.show) {
            this._map.on('mousemove', this._mousemoveEvtHandler, this);
        }
        if (this.options.tooltip.show) {
            this._tooltip = new ToolTip(this._map.getContainerElement());
        }
    }
    onRemove(map) {
        Layer.prototype.onRemove.call(this, map);
        this._map.off('mousemove', this._mousemoveEvtHandler, this);
    }
    _draw() {
        this._data.forEach(item => {
            let points = item.points;
            let info = item.info;
            const materialOptions = {
                color: this.options.style.color,
                alphaTest: 0.1,
                size: this.options.size,
                opacity: this.options.style.opacity
            };

            if (this.options.style.texture) {
                if (!this._loader) this._loader = new THREE.TextureLoader();
                if (!this._texture) this._texture = this._loader.load( this.options.style.texture );
                materialOptions.map = this._texture;
            }

            points = points.map(pt => new THREE.Vector3(pt[0], pt[2], -pt[1]));

            const pointGeometry = new THREE.BufferGeometry();
            pointGeometry.setFromPoints(points);

            const pointsMaterial = new THREE.PointsMaterial( materialOptions );
            pointsMaterial.transparent = true;

            const pointsObj = new THREE.Points( pointGeometry, pointsMaterial );
            if (this._map.options.type === 'plane') {
                pointsObj.renderOrder=99;
                pointsObj.material.depthTest=false;
            }
            pointsObj.userData = Util.extend({type: 'point'}, info);
            
            this._container.add(pointsObj);
        });
    }
    _mousemoveEvtHandler(event) {
        const mapSize = this._map.getContainerSize();
        const camera = this._map.getCamera();
        const sx = event.offsetX; 
        const sy = event.offsetY;
        const cx = event.clientX;
        const cy = event.clientY;
        //屏幕坐标转标准设备坐标
        const x = (sx / mapSize.width) * 2 - 1; 
        const y = -(sy / mapSize.height) * 2 + 1;
        //标准设备坐标
        const standardVector = new THREE.Vector3(x, y, 0.5); 
        //标准设备坐标转世界坐标
        const worldVector = standardVector.unproject(camera);
        //射线投射方向单位向量(worldVector坐标减相机位置坐标)
        const ray = worldVector.sub(camera.position).normalize();
        //创建射线投射器对象
        const raycaster = new THREE.Raycaster(camera.position, ray);
        //返回射线选中的对象
        const intersects = raycaster.intersectObjects(this._container.children);
      
        // 避免连续选中
        if (this._currentSelectObj) {
            if (this.options.hightLight.show) {
                this._currentSelectObj.material.color = this._currentSelectObj.userData.oldColor;
            }
            this._currentSelectObj = null;
            this._tooltip && this._tooltip.close();
        }

        for (var i = 0; i < intersects.length; i++) {
            let object = intersects[i].object;
            let udata = object.userData;
            if (udata && udata.type === 'point') {
                if (this.options.hightLight.show) {
                    object.userData.oldColor = object.material.color;
                    object.material.color = new THREE.Color(this.options.hightLight.color);
                }
                this._currentSelectObj = object;
                let content = `${udata['name']}`;
                this._tooltip && this._tooltip.open(sx, sy, content);
                break;
            }
        }
        if (i === intersects.length) {
            if (this._currentSelectObj) {
                if (this.options.hightLight.show) {
                    this._currentSelectObj.material.color = this._currentSelectObj.userData.oldColor;
                }
                this._currentSelectObj = null;
                this._tooltip && this._tooltip.close();
            }
        }
    }
}