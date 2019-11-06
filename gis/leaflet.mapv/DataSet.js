// import cityCenter
L.DataSet = L.Evented.extend({

    options: {},

    initialize: function(data, options) {
        L.setOptions(this, options);
        this._data = [];

        if (data) this.add(data);
    },

    add: function(data) {
        if (L.Util.isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                this._data.push(data[i]);
            }
        } else if (data instanceof Object) {
            this._data.push(data);
        } else {
            throw new Error('Unknown dataType');
        }

        this._dataCache = JSON.parse(JSON.stringify(this._data));
    },

    reset: function() {
        this._data = JSON.parse(JSON.stringify(this._dataCache));
    },

    get: function(args) {
        args = args || {};
        var data = this._data;

        if (args.filter) {
            var newData = [];
            for (var i = 0; i < data.length; i++) {
                if (args.filter(data[i])) {
                    newData.push(data[i]);
                }
            }
            data = newData;
        }

        if (args.transferCoordinate) {
            data = this.transferCoordinate(data, args.transferCoordinate, args.fromColumn,args.toColumn);
        }

        return data;
    },

    set: function(data) {
        this._set(data);
        this.fire('change');
    },

    _set: function(data) {
        this.clear();
        this.add(data);
    },

    clear: function() {
        this._data = [];
    },

    remove: function(args) {},

    update: function(cbk, condition) {
        var data = this._data;
        
        for(var i = 0; i < data.length; i++) {
            if (condition) {
                var flag = true;
                for (var key in condition) {
                    if (data[i][key] !== condition[key]) {
                        flag = false;
                    }
                }
                if (flag) {
                    cbk && cbk(data[i]);
                }
            } else {
                cbk && cbk(data[i]);
            }
        }

        this._dataCache = JSON.parse(JSON.stringify(this._data));

        this.fire('change');
    },

    transferCoordinate: function(data, transferFn, fromColumn, toColumnName) {
        toColumnName = toColumnName || '_coordinates';
        fromColumn = fromColumn || 'coordinates';

        function getPolygon(coordinates) {
            var newCoordinates = [];
            for (var c = 0; c < coordinates.length; c++) {
                var coordinate = coordinates[c];
                var newcoordinate = [];
                for (var j = 0; j < coordinate.length; j++) {
                    newcoordinate.push(transferFn(coordinate[j]));
                }
                newCoordinates.push(newcoordinate);
            }
            return newCoordinates;
        };

        for (var i = 0; i < data.length; i++) {
            var geometry = data[i].geometry;
            var coordinates = geometry[fromColumn];
            switch (geometry.type) {
                case 'Point':
                    geometry[toColumnName] = transferFn(coordinates);
                    break;
                case 'LineString':
                    var newCoordinates = [];
                    for (var j = 0; j < coordinates.length; j++) {
                        newCoordinates.push(transferFn(coordinates[j]));
                    }
                    geometry[toColumnName] = newCoordinates;
                    break;
                case 'MultiLineString':
                case 'Polygon':
                    var newCoordinates = getPolygon(coordinates);
                    geometry[toColumnName] = newCoordinates;
                    break;
                case 'MultiPolygon':
                    var newCoordinates = [];
                    for (var c = 0; c < coordinates.length; c++) {
                        var polygon = coordinates[c];
                        newCoordinates.push(getPolygon(polygon));
                    }
                    geometry[toColumnName] = newCoordinates;
                    break;
            }
        }

        return data;
    },

    initGeometry: function (transferFn) {
        if (transferFn) {
            this._data.forEach(item => {
                item.geometry = transferFn(item);
            });
        } else {
            this._data.forEach(item => {
                if (!item.geometry) {
                    if (item.lng && item.lat) {
                        item.geometry = {
                            type: 'Point',
                            coordinates: [item.lng, item.lat]
                        };
                    } else if (item.city) {
                        var center = cityCenter.getCenterByCityName(item.city);
                        if (center) {
                            item.geometry = {
                                type: 'Point',
                                coordinates: [center.lng, center.lat]
                            };
                        }
                    }
                }
            });
        }
    },

    getMax: function(columnName) {
        var data = this._data;

        if (!data || !data.length) return;

        var max = parseFloat(data[0][columnName]);

        for (var i = 0; i < data.length; i++) {
            var value = parseFloat(data[i][columnName]);
            if (value > max) {
                max = value;
            }
        }

        return max;
    },

    getSum: function(columnName) {
        var data = this._data;

        if (!data || !data.length) return;

        var sum = 0;
        
        for (var i = 0; i < data.length; i++) {
            if (data[i][columnName]) {
                sum += parseFloat(data[i][columnName]);
            }
        }

        return sum;
    },
    
    getMin: function(columnName) {
        var data = this._data;

        if (!data || !data.length) return;

        var min = parseFloat(data[0][columnName]);

        for (var i = 0; i < data.length; i++) {
            var value = parseFloat(data[i][columnName]);
            if (value < min) {
                min = value;
            }
        }

        return min;
    },

    getUnique: function(columnName) {
        var data = this._data;

        if (!data || !data.length) return;

        var maps = {};

        for (var i = 0; i < data.length; i++) {
            maps[data[i][columnName]] = true;
        }

        var newdata = [];
        for (var key in maps) {
            newdata.push(key);
        }

        return newdata;
    }

});