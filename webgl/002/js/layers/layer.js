import * as Util from '../util';
import EventEmiter from '../eventemiter';
export default class Layer extends EventEmiter {
    constructor(data, options) {
        super();
        var defaultOptions = {};
        this.options = Util.extend(defaultOptions, options);
        this._data = data;
        this._container = new THREE.Group();
    }
    getContainer() {
        return this._container;
    }
    getData() {
        return this._data;
    }
    onAdd(map) {
        this._map = map;
    }
    onRemove(map) {}
}