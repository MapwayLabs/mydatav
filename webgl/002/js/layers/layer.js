import Util from '../util'

export default class Layer {
    constructor(data, options) {
        var defaultOptions = {}
        this.options = Util.extend(defaultOptions, options)
        this._data = data
        this._container = new THREE.Group()
    }

    getContainer() {
        return this._container
    }

    getData() {
        return this._data
    }
    onAdd(map) {
        this._map = map
    }
    onRemove(map) {}
}