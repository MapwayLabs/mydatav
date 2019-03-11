import * as Util from '../util';
import EventEmiter from '../eventemiter';
export default class Layer extends EventEmiter {
    constructor(data, options) {
        super();
        var defaultOptions = {};
        this.options = Util.extend(true, defaultOptions, options);
        this.type = null;
        this._data = data;
        this._container = new THREE.Group();
    }
    getContainer() {
        return this._container;
    }
    getData() {
        return this._data;
    }
    getMap() {
        return this._map;
    }
    onAdd(map) {
        this._map = map;
    }
    onRemove(map) {}
}