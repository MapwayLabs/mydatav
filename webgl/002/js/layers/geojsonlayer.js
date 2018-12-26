import Layer from './layer'
import Util from '../util'

export default class GeoJSONLayer extends Layer {
    constructor(data, options) {
        super(data, options);
        var defaultOptions = {
            isExtrude: true, // 是否拉伸面
            depth: 0.6, // 拉伸厚度
            isAreaText: true, // 是否显示地区名称
            fillColor: '#ddd', // 地区面块的填充色
            strokeColor: '#000', // 地区边缘线的颜色
            strokeOpacity: 0.5, // 地区边缘线的透明度
            textColor: 'rgba(0, 0, 0, 0.8)',
            material: {
                color:0x00ff00,
                // opacity: 0.5,
                side: THREE.DoubleSide
            }
        };
        this.options = Util.extend(defaultOptions, options);
    }
}