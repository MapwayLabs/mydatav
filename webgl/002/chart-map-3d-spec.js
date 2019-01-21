// 引入的js文件地址：mc/static/js/lib/threejs  mc/static/js/chart/bdpChartVisLib.js
// css文件地址 ：mc/static/dashboard-core/scss/three-map.scss
(function (bdpChart) {

    var customGonfig = typeof CUSTOM_CONFIG === 'undefined' ? null : JSON.parse(CUSTOM_CONFIG);//读取私有云配置

    var helper = bdpChart.helper;
    var ChartType = bdpChart.ChartType;
    var mapTree = helper.mapPathTree;

    var Color = Dalaba.Color;

    var pack = Dalaba.pack;
    var defined = Dalaba.defined;
    var isObject = Dalaba.isObject;

    function setStyleOptions(chart, mapOptions){
        // var deviceStyle = chart.deviceStyle.plotOptions ? chart.deviceStyle.plotOptions.map : {};

        // if(_.isEmpty(deviceStyle)){
        //     var bgColor = chart.theme == 'dark' ? '#343752' : '#E6E8EA';
        //     mapOptions.style.bgColor = bgColor;
        // }else{
        //     $.extend(true, mapOptions, deviceStyle);
        // }
        var bgColor = chart.theme == 'dark' ? '#343752' : '#E6E8EA';
        mapOptions.style.bgColor = bgColor;
    }

    function generateGradient(start, end, step) {
        let arr = [];
        arr.push({
            value: 0,
            color: start
        });
        for (let i = 1, len = step; i < len; i++) {
            let c1 = Dalaba.Color.interpolate(start, end)((i - 1) / (len - 1));
            let c2 = Dalaba.Color.interpolate(start, end)(i / (len - 1));
            let value = (i / len);
            arr.push({
                value: value,
                color: c1
            });
            arr.push({
                value: value,
                color: c2
            });
        }
        arr.push({
            value: 1,
            color: end
        });
        return arr;
    }

    bdpChart.setMap3DBarOptions = function (chart) {
        if (!Util.isWebGLAvailable()) {
            alert('当前浏览器不支持3d渲染，请切换到高版本浏览器！');
            return;
        }

        var info = chart.info;
        var el = chart.$elem[0];
        var styles = info.styles;
        var datum = helper.filterNullVal(chart.data);
        var mapVectorData = helper.getMapVectorData(chart);
        var key = mapVectorData.split("/").pop();
        var node = mapTree[key];
        var path = node.path + node.id + ".json";
        var chartType = chart.getChartType();

        var mapOptions = {
            style:{
                bgColor: '#ddd'
            }
        };

        // 当没有设置样式或者为编辑模式时，重置styles设置
        if (!defined(styles) || (chart.mode === 'edit')) {
            info.styles = styles = {};
        }

        // 当数据为空且没有未匹配数据时，显示无数据
        if(!datum.x[0].data.length && (datum.x[0].mismatch && !datum.x[0].mismatch.length) ) {
            return helper.displayNoData(chart.$elem);
        }

        if (chart.chartMapInstance) {
            chart.chartMapInstance.destroy();
        }

        setStyleOptions(chart, mapOptions);

        // ---------legend-start 复用lenged功能，其他功能不复用 -------//
        var length = datum.x[0].data.length;
        var actualMax = helper.getEdgeValueFromMultiArray(datum, 'y', 'max') || 0;
        var actualMin = helper.getEdgeValueFromMultiArray(datum, 'y', 'min') || 0;

        var max = 0;
        var min = 0;
        if (length) {
            max = helper.formatMapNum(actualMax, 4, actualMax > 0 ? 'ceil' : 'floor');
            min = helper.formatMapNum(actualMin, 4, actualMin > 0 ? 'floor' : 'ceil');
        }

        // 以下代码的意义：使legend的值要尽量规整
        var maxFormatVal = bdpChart.helper.numericSymbols(max);
        var minFormatVal = bdpChart.helper.numericSymbols(min);

        var maxSymbol = maxFormatVal.toString().substr(maxFormatVal.toString().length - 1, 1);
        var minSymbol = minFormatVal.toString().substr(minFormatVal.toString().length - 1, 1);

        if (maxSymbol == minSymbol && (Math.abs(max) > 1000 || Math.abs(min) > 1000)) {

            maxFormatVal = helper.formatMapNum(maxFormatVal.toString().substr(0, maxFormatVal.length - 1), 4, actualMax > 0 ? 'ceil' : 'floor');
            minFormatVal = helper.formatMapNum(minFormatVal.toString().substr(0, minFormatVal.length - 1), 4, actualMin > 0 ? 'floor' : 'ceil');

            var symbols = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
            for (var i = 0; i < symbols.length; i++) {
                if (symbols[i] === minSymbol) {
                    break;
                }
            }
            max = maxFormatVal * Math.pow(10, i * 3);
            min = minFormatVal * Math.pow(10, i * 3);
        }
       
        var decimals = isInteger(max.mul(0.25)) ? 0 : (max.mul(0.25)).toString().split('.')[1].length;
        mapOptions = $.extend(true, chart.options, mapOptions, {
            legend: {
                enabled: true,//!chart.isMobileMode && (!chart.isDashboardMode || (chart.isDashboardMode && dashShowLegend)),
                align: 'left',
                verticalAlign: 'bottom',
                floating: true,
                y: -5,
                layout: 'horizontal',

                valueDecimals: decimals,
                backgroundColor: null,
                symbolRadius: 0,
                symbolHeight: 0,
                symbolWidth: 0,
                useHTML: true,
                itemStyle: {  
                    'pointer-events': 'none',  // No hover style
                },
                labelFormatter: function() {
                    var rangeColor = info.color_setting.range_color,
                        startColor = "#DBECF7",
                        endColor = "#5C8EB0";
                    var domain = [0, 0.25, 0.5, 0.75, 1],
                        range;
                    var linearRangeColor = "#DBECF7 0%, #DBECF7 25%, #A6D3F3 25%, #A6D3F3 50%, #72AFD9 50%, #72AFD9 75%, #5C8EB0 75%, #5C8EB0 100%";
                    var next = "";
                    if (rangeColor) {
                        startColor = rangeColor.start_color;
                        endColor = rangeColor.end_color;
                    }
                    range = [
                        startColor, startColor, 
                        Color.lerp([0, 1], [startColor, endColor], Color.interpolate)(0.375).toUpperCase(),
                        Color.lerp([0, 1], [startColor, endColor], Color.interpolate)(0.625).toUpperCase(),
                        endColor
                    ];
                    linearRangeColor = domain.map(function (d, i) {
                        var v = d * 100,
                            c = range[i],
                            r = c + " " + next + v + "%";
                        i && (next = v + "%, " + range[i + 1] + " ");
                        return r;
                    }).join(", ");

                    var css = 'background:-webkit-linear-gradient(left, ' + linearRangeColor + ');' 
                        + 'background:-moz-linear-gradient(left, ' + linearRangeColor + ');' 
                        + 'background:-ms-linear-gradient(left, ' + linearRangeColor + ');' 
                        + 'background:-o-linear-gradient(left, ' + linearRangeColor + ');';
                    var name = helper.escapeHtml(helper.getFieldDisplayName(info.yAxis[0],info.yAxis[0].aggregator));
                    return '<div class="map-legend-row"><span class="map-legend-text-left">' + bdpChart.helper.numericSymbols(min) + '</span>' 
                        + '<span class="map-legend-text-right">' + bdpChart.helper.numericSymbols(max) + '</span></div>' 
                        + '<div class="color-linear-gradient map-legend" style="' + css + '"></div>'
                        + '<div class="map-legend-name" title="'+name+'">'+ name + '</div>';
                }
            }
        });

        if (chart.gridWidth === 2) {
            mapOptions.legend.enabled = false;
        }
        
        var settings = info.color_setting;
        if (settings.mode && settings.mode != 1) {
            if (settings.field[0].fid == info.xAxis[0].fid) {
                mapOptions.legend.enabled = false;
            }

        } else if (settings.mode === 1) {
            let rangeColor = settings.range_color;
            let colorMap = [];
            chart.data.colors.map(function(d) {
                // 考虑null情况，由于面积图和气泡图null展现不一致，前面对data进行过null过滤，所以这里的null也需要过滤掉
                if(d !== null){
                    colorMap.push(Number(d));
                }
            });
            let copyColor = [].concat(colorMap).sort(function(a, b){
                return a - b;
            });
            let minColorVal = copyColor[0] || 0;
            let maxColorVal = copyColor[copyColor.length - 1] || 0;
            $.extend(true, mapOptions.legend, {
                // floating: chart.mode !== 'fullscreen',
                symbolWidth: 0,
                symbolHeight: 0,
                labelFormatter: function() {
                    var css = bdpChart.helper.createLinearGradientCss(
                        rangeColor.start_color,
                        rangeColor.end_color,
                        rangeColor.step);
                    // bugfix: nick_name没带聚合方式，getFieldDisplayName 方法直接返回
                    var cloneSetting = _.cloneDeep(settings.field[0]);
                    delete cloneSetting.nick_name;
                    var name = helper.escapeHtml(helper.getFieldDisplayName(cloneSetting, settings.aggregator));
                    // var name = chart.data.y[0].alias_name; // 图例说明与数值字段一致
                    return '<div class="map-legend-row"><span class="map-legend-text-left">' + bdpChart.helper.numericSymbols(minColorVal) + '</span>' 
                    + '<span class="map-legend-text-right">' + bdpChart.helper.numericSymbols(maxColorVal) + '</span></div>' 
                    + '<div class="color-linear-gradient map-legend" style="' + css + '"></div>'
                    + '<div class="map-legend-name" title="' + name +'">'+ name + '</div>';
                }
            });
        } else {
            mapOptions.legend.enabled = false;
        }
        // map.addLegend(mapOptions.legend);
        //----------------legend-end -------------//

        // 行政底图
        $.ajax("/static/js/mapData/geoJson/" + path).done(function(geojson){
            var map = null;
            var baseLayer = null;
            var barLayer = null;

            // 初始化地图
            var threeMapOptions = {};
            threeMapOptions.lightColor = chart.theme === 'dark' ? 0xffffff : mapOptions.style.bgColor;
            map = new ThreeMap(el, threeMapOptions);
            chart.chartMapInstance = map;

            //图例
            map.addLegend(mapOptions.legend);

            // 是否是全中国范围
            var isFull = true; 
            var bounds;
            if (node.id !== 'china_city' && node.id !== 'china_province') {
                    // 计算省市区域外包矩形中心
                    bounds = Util.getBoundingRect(geojson);

                    isFull = false;
            }
            map.setView(bounds, isFull);
            map.options.isFull = isFull;
            var ratio = map.getOptimalDistance(bounds).ratio;

            // 底图
            var baseOptions = {
                bound: bounds
            };
            if (info.show_placenames) {
                baseOptions.isAreaText = true;
            } else {
                baseOptions.isAreaText = false;
            }
            baseOptions.fillColor = mapOptions.style.bgColor;
            // baseOptions.fillColor = chart.theme === 'dark' ? '#5182E4' : '#999';
            baseOptions.textColor = chart.theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
            baseOptions.textLightColor = chart.theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
            // 默认拉伸深度，全国为 1，地区的根据比例调整
            var defaultDepth = 1.5;
            baseOptions.depth = ratio * defaultDepth;
            baseLayer = new GeoJSONLayer(geojson, baseOptions);
            map.addLayer(baseLayer);

            // 柱状图
            var barOptions = {
                bound: bounds
            };

            // label标注
            if (info.show_datalabels) {
                //暂时写死，页面上不可以设置字体大小、颜色
                // var style = info.style.labels.style;
                barOptions.isBarText = true;
                // barOptions.fontSize = 12;
                barOptions.fontColor = chart.theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
                barOptions.fontFamily = 'Microsoft YaHei';
            } else {
                barOptions.isBarText = false;
            }

            // 颜色
            // 没有设置颜色则取主题色
            // 设置颜色就取对应颜色
            barOptions.defaultColor = bdpChart.colors.default;
            if (info.color_setting.range_color) { // 渐变和梯度色
                let rangeColor = info.color_setting.range_color;
                barOptions.grandient = generateGradient(rangeColor.start_color, rangeColor.end_color, rangeColor.step);
            } else if (info.color_setting.enum_color_map) { // 自定义色
                let enumColor = info.color_setting.enum_color_map;
                barOptions.enumColor = enumColor;
            }

            // 默认的柱子边长 和 最大最小高度
            var defaultBarWidth = 0.5;
            var defaultBarRange = [0.5, 7];
            var defaultBevelThickness = 0.1;
            var defaultBevelSize = 0.08;
            barOptions.barWidth = defaultBarWidth * ratio;
            barOptions.barRange = defaultBarRange.map(r => r * ratio);
            barOptions.bevelThickness = defaultBevelThickness * ratio;
            barOptions.bevelSize = defaultBevelSize * ratio;

            // barlayer
            barLayer = new BarChartLayer(datum, barOptions, baseLayer);
            map.addLayer(barLayer);
        });
    }

    /**
     * 工具类
     */
    var Util = {
        hasClass: function (el, className) {
            return el.classList ? el.classList.contains(className) : new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className)
        },
        addClass: function (el, className) {
            if (el.classList !== undefined) {
                var list = className.split(' ')
                for (var i = 0, len = list.length; i < len; i++) {
                    el.classList.add(list[i])
                }
            } else if (!this.hasClass(el, className)){
                el.className = (el.className ? el.className + ' ' : '') + className
            }
        },
        removeClass: function (el, className) {
            if (el.classList !== undefined) {
                el.classList.remove(className)
            } else {
                el.className = ' ' + el.className + ' '
                el.className = el.className.replace(' ' + className + ' ', ' ')
            }
        },
        extend: function (srcObj) {
            var i, j, len, src
            for (j = 1, len = arguments.length; j < len; j++) {
                src = arguments[j]
                for (var i in src) {
                    srcObj[i] = src[i]
                }
            }
            return srcObj
        },
        stamp: function (obj) {
            if (!this.lastId) this.lastId = 0
            obj.__objstampid__ = obj.__objstampid__ || ++this.lastId
            return obj.__objstampid__
        },
        inherit: function (parentClass, childClass) {
            var tempClass = function () {}
            tempClass.prototype = parentClass.prototype
            childClass.prototype = new tempClass()
            childClass.prototype.constructor = childClass
        },
        isNullOrUdf: function (val) {
            return val === undefined || val === null
        },
        getRandomColor: function() {    
            return  '#' + (function getColor(color){    
                return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
                && (color.length == 6) ?  color : getColor(color);    
            })('');    
        },
        isWebGLAvailable: function () {
            try {
                var canvas = document.createElement( 'canvas' );
                return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
            } catch ( e ) {
                return false;
            }
        },
        getDevicePixelRatio: function() {
            return window.devicePixelRatio || 1;
        },
        // getBoundingRect
        getBoundingRect: function (geojson) {
            var bound = {
                xmin: 180,
                xmax: -180,
                ymin: 90,
                ymax: -90,
                width: function () {
                    return (this.xmax - this.xmin);
                },
                height: function() {
                    return (this.ymax - this.ymin);
                },
                center: function() {
                    var tx = (this.xmax - this.xmin) / 2;
                    var ty = (this.ymax - this.ymin) / 2;
                    return [tx + this.xmin, ty + this.ymin];
                }
            }
            var features = [];
            var polygons = [];
            if (geojson.type === "FeatureCollection") {
                features = geojson.features;
            } else if (geojson.type === "Feature") {
                features.push(geojson);
            }
            features.forEach(f => {
                if (f.geometry.type === "Polygon") {
                    polygons.push(f.geometry.coordinates);
                } else if (f.geometry.type === "MultiPolygon") {
                    for (var i = 0, len = f.geometry.coordinates.length; i < len; i++) {
                        polygons.push(f.geometry.coordinates[i]);
                    }
                }
            });
            for (var i = 0, len = polygons.length; i < len; i++) {
                var seg = polygons[i];
                for (var j = 0; j < seg.length; j++) {
                    var coords = seg[j];
                    for (var k = 0; k < coords.length; k++) {
                        var coord = coords[k];
                        if (coord[0] < bound.xmin) {
                            bound.xmin = coord[0];
                        }
                        if (coord[0] > bound.xmax) {
                            bound.xmax = coord[0];
                        }
                        if (coord[1] < bound.ymin) {
                            bound.ymin = coord[1];
                        }
                        if (coord[1] > bound.ymax) {
                            bound.ymax = coord[1];
                        }
                    }
                }
            }
            return bound;
        },
        // 文字
        getTextSprite: function (textStr, options) {
            var options = options || {}
            var fontWeight = options.fontWeight || 'normal'
            var fontFamily = options.fontFamily || 'Microsoft YaHei'
            var fontColor = options.fontColor || '#000'
            var textAlign = options.textAlign || 'center'
            var textBaseline = options.textBaseline || 'middle'

            var canvas = document.createElement("canvas");
            // webgl 规定 canvas 宽高为2的n次幂
            canvas.width = 256;
            canvas.height = 256;
            var ctx = canvas.getContext("2d");

            // ctx.fillStyle = renderer.domElement.style.backgroundColor;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // draw
            ctx.font = "16px " + fontWeight + " " + fontFamily;
            ctx.fillStyle = fontColor;
            ctx.textAlign = textAlign;
            ctx.textBaseline = textBaseline;
            var textWidth = ctx.measureText(textStr).width;
            ctx.fillText(textStr, canvas.width / 2, canvas.height / 2 + 5);
            // ctx.fillRect(0, 0, canvas.width, canvas.height);

            var texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;

            var spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                transparent:true
            });
            var sprite = new THREE.Sprite(spriteMaterial);
            return sprite;
        },
        // 获取一个颜色的高亮或更暗色 https://css-tricks.com/snippets/javascript/lighten-darken-color/
        lightenDarkenColor: function (col, amt) {
  
            var usePound = false;
          
            if (col[0] == "#") {
                col = col.slice(1);
                usePound = true;
            }
         
            var num = parseInt(col,16);
         
            var r = (num >> 16) + amt;
         
            if (r > 255) r = 255;
            else if  (r < 0) r = 0;
         
            var b = ((num >> 8) & 0x00FF) + amt;
         
            if (b > 255) b = 255;
            else if  (b < 0) b = 0;
         
            var g = (num & 0x0000FF) + amt;
         
            if (g > 255) g = 255;
            else if (g < 0) g = 0;
         
            return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
          
        }
    }


    // Tooltip提示
    var TooltipHelper = (function () {

        var instance;

        return {
            showTooltip: function (x, y, content) {
                if (!instance) {
                    instance = new Tooltip(undefined, {
                        typeClass: "sankey-tooltip"
                    });
                }
                instance.content(content).position(x, y).show();
            },

            hideTooltip: function () {
                instance && instance.hide();
            }
        }

    })();

    /**
     * 事件发布与订阅
     */
    var EventEmiter = function (){
       this._events = {};
    };
    EventEmiter.prototype = {
        on: function (event, cb, context){
          context = context || this;
          if (Array.isArray(event)){
            for (let i = 0, l = event.length; i < l; i++){
              this.on(event[i], cb, context);
            }
          } else {
            (this._events[event] || (this._events[event] = [])).push({
                callback: cb,
                context: context
            });
          }
          return this;
        },
        once: function (event, cb, context){
          context = context || this;
          var self = this;
          function on () {
            self.off(event, cb, context);
            cb.apply(context, arguments);
          }
          on.fn = cb;
          this.on(event, on, context);
          return this;
        },
        off: function (event, cb, context){
          context = context || this;
          if (!arguments.length){
            this._events = Object.create(null);
            return this;
          }
          if (Array.isArray(event)){
            for (let i = 0, l = event.length; i < l; i++){
              this.off(event[i], cb, context);
            }
            return this;
          }
          if (!cb){
            this._events[event] = null;
            return this;
          }
          if (cb){
            let cbs = this._events[event];
            let i = cbs.length;
            while(i--){
              if ((cb === cbs[i].callback || cb === cbs[i].fn) && context === cbs[i].context){
                cbs.splice(i, 1);
                break;
              }
            }
            return this;
          }
        },
        emit: function (event){
          let cbs = this._events[event];
          let args = Array.prototype.slice.call(arguments, 1);
          if (cbs){
            for (let i = 0, l = cbs.length; i < l; i++){
              cbs[i].callback.apply(cbs[i].context || this, args);
            }
          }
        }  
    }      

    /**
     * map 类
     * @param {*} el 
     * @param {*} options 
     */
    function ThreeMap (el, options) {
        EventEmiter.call(this)
        var defaultOptions = {
            lightColor: 0xffffff,
            isFull: true
        }
        this.options = Util.extend(defaultOptions, options)

        this._parentEl = typeof el === 'string' ? document.getElementById(el) : el
        this._el = document.createElement('div')
        this._className = 'three-map-container'
        if (!this._parentEl) {
            throw new Error('A Dom Element should be provided!')
        }
        // if (!this._parentEl.style.position || this._parentEl.style.position === 'static') {
        //     this._parentEl.style.position = 'relative'
        // }
        Util.addClass(this._el, this._className)
        this._parentEl.appendChild(this._el)

        this._el.style.height = '100%'
        this._el.style.margin = 0
        this._el.style.padding = 0

        var compStyle = getComputedStyle(this._el)
        this._width = parseInt(compStyle.width)
        this._height = parseInt(compStyle.height)

        var bound = {
            xmin: 73.4766,
            xmax: 135.0879,
            ymin: 18.1055,
            ymax: 53.5693,
            width: function () {
                return (this.xmax - this.xmin);
            },
            height: function() {
                return (this.ymax - this.ymin);
            },
            center: function() {
                var tx = (this.xmax - this.xmin) / 2;
                var ty = (this.ymax - this.ymin) / 2;
                return [tx + this.xmin, ty + this.ymin];
            }
        }
        this.fullBound = bound

        this._layers = {}
        
        this._init()
    }
    Util.inherit(EventEmiter, ThreeMap)
    Util.extend(ThreeMap.prototype, {
        addLayer: function (layer) {
            var id = Util.stamp(layer)
            if (this._layers[id]) { return this; }

            this._layers[id] = layer
            this._scene.add(layer.getContainer())

            layer.onAdd(this)

            return this
        },
        removeLayer: function (layer) {
            var id = Util.stamp(layer)
            if (!this._layers[id]) {return this; }

            delete this._layers[id]
            this._scene.remove(layer.getContainer())
            
            layer.onRemove(this)

            return this
        },
        hasLayer: function (layer) {
            return !!layer && (Util.stamp(layer) in this._layers)
        },
        clearLayers: function () {
            for (var id in this._layers) {
                this.removeLayer(this._layers[id])
            }
        },
        updateSize: function () {
            this._onContainerResize()
        },
        resetView: function () {
            this._orbitControl.reset()
        },
        setView: function (bounds, isFull) {
            if (isFull === undefined) { isFull = ture }
            var deafultMinDis = 30, defaultMaxDis = 200;
            if (isFull) {
                // 全国区域的最佳显示效果
                // TODO: 待优化，此处暂时写死
                this._orbitControl.minDistance = deafultMinDis
                this._orbitControl.maxDistance = defaultMaxDis
                // 显示全部范围 x: 114.28440811288112, y: 39.45556662084117, z: 6.563242074347407
                this._orbitControl.object.position.set(113.29485920871976,24.046638519817627,1.029612281998045
                    )
                // this._orbitControl.object.position.set(112.54968788194411,29.1520650197809,-5.613704508085359
                //     )
                // this._orbitControl.object.position.set(109.58688917016474, 16.051696751000303, -9.408028404329741)
                this._orbitControl.target = new THREE.Vector3(106.61608780527186, -6.091, -47.26487677586227)
            } else {
                var center = bounds.center()
                var opt = this.getOptimalDistance(bounds)
                opt.ratio = Math.max(opt.ratio, 0.08)
                this._orbitControl.minDistance = deafultMinDis * opt.ratio
                this._orbitControl.maxDistance = defaultMaxDis * opt.ratio
                this._orbitControl.object.position.set(center[0], opt.d, -center[1])
                this._orbitControl.target = new THREE.Vector3(center[0], 0, -center[1])
            }
            this._orbitControl.update()
        },
        // 将区域 bounds 和 全国 bounds 进行对比，找到相机合适的距离，以自动适配范围
        // 全国bounds：{"xmin":73.4766,"xmax":135.0879,"ymin":18.1055,"ymax":53.5693}"
        // 全国 width:61.611299999999986  height:35.4638
        // 计算方式根据视角组成的相似三角形
        getOptimalDistance: function (bounds) {
            if (!bounds) {
                return {
                    d: 60,
                    ratio: 1
                }
            }
            var h0 = 35.4638 // 全国区域外包矩形高度
            var d0 = 50 // 全国区域相机初始距离，TODO 待优化，暂时写死
            var h1 = bounds.height()
            var d1 = h1 * d0 / h0
            return {
                d: d1, // 实际距离
                ratio: d1 / d0 // 距离比例
            }
        },
        addLegend: function(legendOptions) {
            var Legend = Dalaba.Chart.Legend,
                legend = null;

            if (Legend && legendOptions.enabled) {
                legend = new Legend(
                    this._legendCanvas,//this.addLayer(legendOptions.layer),
                    [{name: 9}],
                    legendOptions//selected为false不读取
                );
            }
            return legend;
        },
        _init: function () {
            if (THREE === undefined) throw new Error('需先引入threejs库！')
            if (THREE.OrbitControls === undefined) throw new Error('需先引入 THREE.OrbitControls 组件！')

            const dpr = Util.getDevicePixelRatio()

            // 初始化画布
            this._renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                preserveDrawingBuffer: true
            })
            this._renderer.setClearColor( 0x000000, 0 ) // 背景透明
            this._renderer.setPixelRatio(dpr)
            this._renderer.setSize(this._width, this._height, true)
            this._el.appendChild(this._renderer.domElement)

            this._renderer.domElement.style.width = '100%'
            this._renderer.domElement.style.height = '100%'
            this._renderer.domElement.className = 'chart-canvas'

            // this._renderer.domElement.addEventListener("webglcontextlost", function(event){
            //     event.preventDefault();
            //     // alert('context-lost');
            // }, false);

            // this._renderer.domElement.addEventListener("webglcontextrestored", function(event){
            //         // alert('context-restore');
            // }, false);
             
            // TODO: 图例canvas，待改进，使用系统提供的图例必须提供 canvas...
            this._legendCanvas = document.createElement('canvas')
            this._legendCanvas.width = this._width * Util.getDevicePixelRatio()
            this._legendCanvas.height = this._height * Util.getDevicePixelRatio()
            this._legendCanvas.style.width = this._width + 'px'
            this._legendCanvas.style.height = this._height + 'px'
            this._legendCanvas.className = 'three-map-legendcanvas'
            this._el.appendChild(this._legendCanvas)
        
            // 设置场景
            this._scene = new THREE.Scene()
        
            // 相机
            this._camera = new THREE.PerspectiveCamera(45, this._width / this._height, 1, 1000)
        
            // 控件
            this._orbitControl = new THREE.OrbitControls(this._camera, this._renderer.domElement)
            // this._orbitControl.minDistance = 30 // 距离相机的最小距离，仅用于透视相机
            // this._orbitControl.maxDistance = 200 // 距离相机的最大距离，仅用于透视相机
            // 在哪个平面内就相对于哪个平面的坐标轴
            this._orbitControl.maxPolarAngle = Math.PI / 180 * 75 // 最大翻转角度
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
            this._scene.add( this._light )
            this._scene.add( this._light2 )
        
            // animate
            this._animate()
            
            // events 
            this._onContainerResize = this._onContainerResize.bind(this)
            window.addEventListener('resize', this._onContainerResize, false)

            this._mousemoveEvtHandler = this._mousemoveEvtHandler.bind(this)
            this._renderer.domElement.addEventListener('mousemove', this._mousemoveEvtHandler, false)
        },
        _mousemoveEvtHandler: function (e) {
            this.emit('mousemove', e)
        },
        _animate: function () {
            this._animateId = requestAnimationFrame(this._animate.bind(this))
            this._orbitControl.update()
            this._renderer.render(this._scene, this._camera)
        },
        _onContainerResize: function () {
            const compStyle = getComputedStyle(this._el)
            this._width = parseInt(compStyle.width)
            this._height = parseInt(compStyle.height)
        
            // 设置透视摄像机的长宽比
            this._camera.aspect = this._width / this._height
            // 摄像机的 position 和 target 是自动更新的，而 fov、aspect、near、far 的修改则需要重新计算投影矩阵（projection matrix）
            this._camera.updateProjectionMatrix()
            // 设置渲染器输出的 canvas 的大小
            this._renderer.setSize(this._width, this._height, true)
            this._legendCanvas.width = this._width * Util.getDevicePixelRatio()
            this._legendCanvas.height = this._height * Util.getDevicePixelRatio()
            this._legendCanvas.style.width = this._width + 'px'
            this._legendCanvas.style.height = this._height + 'px'
        },
        destroy: function () {
            this.clearLayers()
            window.removeEventListener('resize', this._onContainerResize, false)
            this._renderer.domElement.removeEventListener('mousemove', this._mousemoveEvtHandler, false)
            cancelAnimationFrame(this._animateId)
            if (this._parentEl && this._parentEl.querySelector('.' + this._className)) {
                this._parentEl.removeChild(this._el)
                this._el = null
            } 
        }     
    })

    /**
     * layer 类，抽象类
     * @param {*} data 
     * @param {*} options 
     */
    function Layer (data, options) {
        var defaultOptions = {}
        this.options = Util.extend(defaultOptions, options)
        this._data = data
        this._container = new THREE.Group()
        this._map = null
    }

    Layer.prototype = {
        getContainer: function() {
            return this._container
        },
        getData: function() {
            return this._data
        },
        onAdd: function(map) {
            this._map = map
        },
        onRemove: function(map) {}
    }

    /**
     * geojson图层
     * @param {*} data 
     * @param {*} options 
     */
    function GeoJSONLayer(data, options) {
        Layer.call(this, data, options)
        var defaultOptions = {
            isExtrude: true, // 是否拉伸面
            depth: 0.6, // 拉伸厚度
            isAreaText: true, // 是否显示地区名称
            fillColor: '#ddd', // 地区面块的填充色
            strokeColor: '#000', // 地区边缘线的颜色
            strokeOpacity: 0.5, // 地区边缘线的透明度
            textColor: 'rgba(0, 0, 0, 0.8)',
            textLightColor: 'rgba(0, 0, 0, 0.5)',
            material: {
                color:0x00ff00,
                // opacity: 0.5,
                side: THREE.DoubleSide
            }
        }
        this.options = Util.extend(defaultOptions, options)
    }

    Util.inherit(Layer, GeoJSONLayer)

    GeoJSONLayer.prototype.drawThreeGeo = function(json, radius, shape, materalOptions, container) {
        var self = this;
        container = container || window.scene;

        var x_values = [];
        var y_values = [];
        var z_values = [];

        // var json_geom = createGeometryArray(json);
        var json_geom, json_fea, regionAreaGroup, center, name;
        var json_features = createFeatureArray(json);
        //An array to hold the feature geometries.
        var convertCoordinates = getConversionFunctionName(shape);
        //Whether you want to convert to spherical or planar coordinates.
        var coordinate_array = [];
        //Re-usable array to hold coordinate values. This is necessary so that you can add
        //interpolated coordinates. Otherwise, lines go through the sphere instead of wrapping around.

        materalOptions.color = self.options.fillColor;
        var material = new THREE.MeshPhongMaterial(materalOptions);

        for (var geom_num = 0; geom_num < json_features.length; geom_num++) {
            json_fea = json_features[geom_num];
            json_geom = json_fea.geometry;
            center = json_fea.properties && ( json_fea.properties.cp || json_fea.properties.center );
            if (typeof center === 'string') {
                center = center.split(',');
            }
            name = json_fea.properties && ( json_fea.properties.name || '' );
            // if (center && name) {
            //     center = center.map(item => Number(item));
            //     // 地区名字
            //     if(self.options.isAreaText) {

            //         var textSprite = Util.getTextSprite(name, {
            //             fontColor: self.options.textColor
            //         });

            //         textSprite.userData = {
            //             type: 'areaText'
            //         }
                    
            //         // TODO 数字8为初始化全中国时最佳缩放比，其他区域根据距离比例调整
            //         var scaleX = 8, scaleY = 8;
            //         if (self.options.bound) {
            //             var ratio = self._map.getOptimalDistance(self.options.bound).ratio;
            //             scaleX = ratio * scaleX;
            //             scaleY = ratio * scaleY;
            //         }
            //         textSprite.scale.set(scaleX, scaleY, 1);

            //         if (self.options.isExtrude) {
            //             textSprite.position.set(center[0], self.options.depth, -center[1])
            //         } else {
            //             textSprite.position.set(center[0], 0, -center[1])
            //         }

            //         // 避免柱子遮挡地名
            //         textSprite.renderOrder = 99
            //         textSprite.material.depthTest=false

            //         container.add(textSprite);
            //     }
            // }
            if (json_geom.type == 'Point') {
                convertCoordinates(json_geom.coordinates, radius);
                drawParticle(x_values[0], y_values[0], z_values[0], materalOptions);

            } else if (json_geom.type == 'MultiPoint') {
                for (var point_num = 0; point_num < json_geom.coordinates.length; point_num++) {
                    convertCoordinates(json_geom.coordinates[point_num], radius);
                    drawParticle(x_values[0], y_values[0], z_values[0], materalOptions);
                }

            } else if (json_geom.type == 'LineString') {
                coordinate_array = createCoordinateArray(json_geom.coordinates);

                for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
                    convertCoordinates(coordinate_array[point_num], radius);
                }
                drawLine(x_values, y_values, z_values, materalOptions);

            } else if (json_geom.type == 'Polygon') {
                regionAreaGroup = new THREE.Group();
                container.add(regionAreaGroup);
                // materalOptions.color = Util.getRandomColor();
                // materalOptions.color = self.options.fillColor;
                for (var segment_num = 0; segment_num < json_geom.coordinates.length; segment_num++) {
                    coordinate_array = createCoordinateArray(json_geom.coordinates[segment_num]);

                    for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
                        convertCoordinates(coordinate_array[point_num], radius);
                    }
                    if (self.options.isExtrude) {
                        drawPolygon2(x_values, y_values, z_values, materalOptions, regionAreaGroup);
                    } else {
                        drawPolygon(x_values, y_values, z_values, materalOptions, regionAreaGroup);
                    }
                }

            } else if (json_geom.type == 'MultiLineString') {
                for (var segment_num = 0; segment_num < json_geom.coordinates.length; segment_num++) {
                    coordinate_array = createCoordinateArray(json_geom.coordinates[segment_num]);

                    for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
                        convertCoordinates(coordinate_array[point_num], radius);
                    }
                    drawLine(x_values, y_values, z_values, materalOptions);
                }

            } else if (json_geom.type == 'MultiPolygon') {
                regionAreaGroup = new THREE.Group();
                container.add(regionAreaGroup);
                // materalOptions.color = Util.getRandomColor();
                // materalOptions.color = self.options.fillColor;
                for (var polygon_num = 0; polygon_num < json_geom.coordinates.length; polygon_num++) {
                    for (var segment_num = 0; segment_num < json_geom.coordinates[polygon_num].length; segment_num++) {
                        coordinate_array = createCoordinateArray(json_geom.coordinates[polygon_num][segment_num]);

                        for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
                            convertCoordinates(coordinate_array[point_num], radius);
                        }
                        if (self.options.isExtrude) {
                            drawPolygon2(x_values, y_values, z_values, materalOptions, regionAreaGroup);
                        } else {
                            drawPolygon(x_values, y_values, z_values, materalOptions, regionAreaGroup);
                        }
                    }
                }
            } else {
                throw new Error('The geoJSON is not valid.');
            }
        }

        function createGeometryArray(json) {
            var geometry_array = [];

            if (json.type == 'Feature') {
                geometry_array.push(json.geometry);
            } else if (json.type == 'FeatureCollection') {
                for (var feature_num = 0; feature_num < json.features.length; feature_num++) {
                    geometry_array.push(json.features[feature_num].geometry);
                }
            } else if (json.type == 'GeometryCollection') {
                for (var geom_num = 0; geom_num < json.geometries.length; geom_num++) {
                    geometry_array.push(json.geometries[geom_num]);
                }
            } else {
                throw new Error('The geoJSON is not valid.');
            }
            //alert(geometry_array.length);
            return geometry_array;
        }
        
        /**
         * 将 geometry与properties属性都带上
         * @param {*} json 
         */
        function createFeatureArray(json) {
            var feature_array = [];
            var temp_feature;

            if (json.type == 'Feature') {
                feature_array.push(json);
            } else if (json.type == 'FeatureCollection') {
                for (var feature_num = 0; feature_num < json.features.length; feature_num++) {
                    feature_array.push(json.features[feature_num]);
                }
            } else if (json.type == 'GeometryCollection') {
                for (var geom_num = 0; geom_num < json.geometries.length; geom_num++) {
                    temp_feature = {
                        geometry: json.geometries[geom_num]
                    }
                    feature_array.push(temp_feature);
                }
            } else {
                throw new Error('The geoJSON is not valid.');
            }
            return feature_array;
        }

        function getConversionFunctionName(shape) {
            var conversionFunctionName;

            if (shape == 'sphere') {
                conversionFunctionName = convertToSphereCoords;
            } else if (shape == 'plane') {
                conversionFunctionName = convertToPlaneCoords;
            } else {
                throw new Error('The shape that you specified is not valid.');
            }
            return conversionFunctionName;
        }

        function createCoordinateArray(feature) {
            //Loop through the coordinates and figure out if the points need interpolation.
            var temp_array = [];
            var interpolation_array = [];

            for (var point_num = 0; point_num < feature.length; point_num++) {
                var point1 = feature[point_num];
                var point2 = feature[point_num - 1];

                if (point_num > 0) {
                    if (needsInterpolation(point2, point1)) {
                        interpolation_array = [point2, point1];
                        interpolation_array = interpolatePoints(interpolation_array);

                        for (var inter_point_num = 0; inter_point_num < interpolation_array.length; inter_point_num++) {
                            temp_array.push(interpolation_array[inter_point_num]);
                        }
                    } else {
                        temp_array.push(point1);
                    }
                } else {
                    temp_array.push(point1);
                }
            }
            return temp_array;
        }

        function needsInterpolation(point2, point1) {
            return false; // 禁止插入点
            //If the distance between two latitude and longitude values is
            //greater than five degrees, return true.
            var lon1 = point1[0];
            var lat1 = point1[1];
            var lon2 = point2[0];
            var lat2 = point2[1];
            var lon_distance = Math.abs(lon1 - lon2);
            var lat_distance = Math.abs(lat1 - lat2);

            if (lon_distance > 5 || lat_distance > 5) {
                return true;
            } else {
                return false;
            }
        }

        function interpolatePoints(interpolation_array) {
            //This function is recursive. It will continue to add midpoints to the
            //interpolation array until needsInterpolation() returns false.
            var temp_array = [];
            var point1, point2;

            for (var point_num = 0; point_num < interpolation_array.length - 1; point_num++) {
                point1 = interpolation_array[point_num];
                point2 = interpolation_array[point_num + 1];

                if (needsInterpolation(point2, point1)) {
                    temp_array.push(point1);
                    temp_array.push(getMidpoint(point1, point2));
                } else {
                    temp_array.push(point1);
                }
            }

            temp_array.push(interpolation_array[interpolation_array.length - 1]);

            if (temp_array.length > interpolation_array.length) {
                temp_array = interpolatePoints(temp_array);
            } else {
                return temp_array;
            }
            return temp_array;
        }

        function getMidpoint(point1, point2) {
            var midpoint_lon = (point1[0] + point2[0]) / 2;
            var midpoint_lat = (point1[1] + point2[1]) / 2;
            var midpoint = [midpoint_lon, midpoint_lat];

            return midpoint;
        }

        function convertToSphereCoords(coordinates_array, sphere_radius) {
            var lon = coordinates_array[0];
            var lat = coordinates_array[1];

            x_values.push(Math.cos(lat * Math.PI / 180) * Math.cos(lon * Math.PI / 180) * sphere_radius);
            y_values.push(Math.cos(lat * Math.PI / 180) * Math.sin(lon * Math.PI / 180) * sphere_radius);
            z_values.push(Math.sin(lat * Math.PI / 180) * sphere_radius);
        }

        function convertToPlaneCoords(coordinates_array, radius) {
            var lon = coordinates_array[0];
            var lat = coordinates_array[1];

            // z_values.push((lat / 180) * radius);
            // y_values.push((lon / 180) * radius);

            // y_values.push((lat / 180) * radius);
            // x_values.push((lon / 180) * radius);

            z_values.push(-lat*1);
            x_values.push(lon*1);
            y_values.push(0);
        }
        
        // particle 粒子
        function drawParticle(x, y, z, options) {
            var particle_geom = new THREE.Geometry();
            particle_geom.vertices.push(new THREE.Vector3(x, y, z));

            var particle_material = new THREE.ParticleSystemMaterial(options);

            var particle = new THREE.ParticleSystem(particle_geom, particle_material);
            container.add(particle);

            clearArrays();
        }

        function drawLine(x_values, y_values, z_values, options) {
            var line_geom = new THREE.Geometry();
            createVertexForEachPoint(line_geom, x_values, y_values, z_values);

            var line_material = new THREE.LineBasicMaterial(options);
            var line = new THREE.Line(line_geom, line_material);
            container.add(line);

            clearArrays();
        }

        function drawOutLine(x_values, y_values, z_values, mesh) {
            // 画轮廓线
            // 因为面是画在xy平面的，然后通过旋转而来，为了保持一致，轮廓线也绘制在xy平面，这样变换就能与面同步
            var line_geom = new THREE.Geometry()
            for (var i = 0; i < x_values.length; i++) {
                line_geom.vertices.push(new THREE.Vector3(x_values[i], -z_values[i], 0))
            }
            var line_material = new THREE.LineBasicMaterial({
                color: self.options.strokeColor
            })
            line_material.transparent = false
            line_material.opacity = self.options.strokeOpacity
            var line = new THREE.Line(line_geom, line_material)
            if (self.options.isExtrude) {
                line.translateZ(self.options.depth);
            }
            line.renderOrder = 98
            mesh.add(line);
        }
        
        /**
         * 绘制带颜色多边形
         * @param {*} x_values 
         * @param {*} y_values 
         * @param {*} z_values 
         * @param {*} options 
         */
        function drawPolygon(x_values, y_values, z_values, options, container) {
            // 生成随机颜色
            // options.color = getRandomColor();
            var shape = new THREE.Shape();
            for (var i = 0; i < x_values.length; i++) {
                if (i === 0) {
                    shape.moveTo(x_values[i], -z_values[i]);
                } else {
                    shape.lineTo(x_values[i], -z_values[i]);
                }
            }
            shape.closePath();
            var geometry = new THREE.ShapeBufferGeometry(shape);
            var material = new THREE.MeshBasicMaterial(options);

            var mesh = new THREE.Mesh(geometry, material);
            drawOutLine(x_values, y_values, z_values, mesh);
            mesh.rotateX(-Math.PI/2);
            mesh.userData = {
                type: 'area'
            };
            container.add(mesh);

            clearArrays();
        }
        
        /**
         * 绘制立体多边形
         * @param {*} x_values 
         * @param {*} y_values 
         * @param {*} z_values 
         * @param {*} options 
         */
        function drawPolygon2(x_values, y_values, z_values, options, container) {
            // 生成随机颜色
            // options.color = '#999';
            var shape = new THREE.Shape();
            for (var i = 0; i < x_values.length; i++) {
                if (i === 0) {
                    shape.moveTo(x_values[i], -z_values[i]);
                } else {
                    shape.lineTo(x_values[i], -z_values[i]);
                }
            }
            shape.closePath();
            var extrudeSettings = {
                depth: self.options.depth, 
                bevelEnabled: false   // 是否用斜角
            };
            var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
            // var material = new THREE.MeshPhongMaterial(options);

            var mesh = new THREE.Mesh(geometry, material);
            drawOutLine(x_values, y_values, z_values, mesh);
            mesh.rotateX(-Math.PI/2);
            mesh.userData = {
                type: 'area'
            };
            container.add(mesh);

            clearArrays();
        }

        function createVertexForEachPoint(object_geometry, values_axis1, values_axis2, values_axis3) {
            for (var i = 0; i < values_axis1.length; i++) {
                object_geometry.vertices.push(new THREE.Vector3(values_axis1[i],
                    values_axis2[i], values_axis3[i]));
            }
        }

        function clearArrays() {
            x_values.length = 0;
            y_values.length = 0;
            z_values.length = 0;
        }
    }

    GeoJSONLayer.prototype.drawLabel = function(center, name, bounds, barwidth, isMatch) {
        // 地区名字
        if(!this.options.isAreaText && !isMatch) {
            return;
        }
        var tOptions = {
            fontColor: this.options.textColor
        }
        if (!isMatch) {
            tOptions.fontColor = this.options.textLightColor
        }
        // FIXME 采用简单粗暴方法避免文字覆盖
        if (new RegExp(name).test('香港')) {
            tOptions.textAlign = 'left'
        } else if (new RegExp(name).test('澳门')) {
            tOptions.textAlign = 'right'
        } else if (new RegExp(name).test('广东')) {
            tOptions.textBaseline = 'bottom'
        } else if (new RegExp(name).test('北京')) {
            tOptions.textAlign = 'right'
        } else if (new RegExp(name).test('天津')) {
            tOptions.textAlign = 'left'
        }
        var textSprite = Util.getTextSprite(name, tOptions);

        textSprite.userData = {
            type: 'areaText'
        }
        
        // TODO: 数字8为初始化全中国时最佳缩放比，其他区域根据距离比例调整
        var scaleX = 14, scaleY = 14
        if (!isMatch) {
            scaleX = 10
            scaleY = 10
        }
        if (this.options.bound) {
            var ratio = this._map.getOptimalDistance(this.options.bound).ratio;
            scaleX = ratio * (scaleX + 10);
            scaleY = ratio * (scaleY + 10);
        }
        textSprite.scale.set(scaleX, scaleY, 1);

        if (!this._map.options.isFull) {
            // 如果是行政区域，重新计算中心点
            center = bounds.center()
        }

        if (this.options.isExtrude) {
            textSprite.position.set(center[0], this.options.depth, -center[1]-barwidth*2)
        } else {
            textSprite.position.set(center[0], 0, -center[1]-barwidth*2)
        }

        // 避免柱子遮挡地名
        textSprite.renderOrder = 99
        textSprite.material.depthTest=false

        this._container.add(textSprite);
    }

    GeoJSONLayer.prototype.onAdd = function(map) {
        Layer.prototype.onAdd.call(this, map)
        var container = new THREE.Group();
        this.drawThreeGeo(this._data, 10, 'plane', this.options.material, container)
        this._container.add(container);
        // this._map.on('mousemove', this._mousemoveEvtHandler, this)
    }

    GeoJSONLayer.prototype.onRemove = function(map) {
        Layer.prototype.onRemove.call(this, map)
        // this._map.off('mousemove', this._mousemoveEvtHandler, this)
    }

    GeoJSONLayer.prototype._mousemoveEvtHandler = function (event) {
        let Sx = event.offsetX //鼠标单击位置横坐标
        let Sy = event.offsetY //鼠标单击位置纵坐标
        let Cx = event.clientX
        let Cy = event.clientY
        //屏幕坐标转标准设备坐标
        let x = (Sx / this._map._width) * 2 - 1 //标准设备横坐标
        let y = -(Sy / this._map._height) * 2 + 1 //标准设备纵坐标
        let standardVector = new THREE.Vector3(x, y, 0.5) //标准设备坐标
        //标准设备坐标转世界坐标
        let worldVector = standardVector.unproject(this._map._camera)
        //射线投射方向单位向量(worldVector坐标减相机位置坐标)
        let ray = worldVector.sub(this._map._camera.position).normalize()
        //创建射线投射器对象
        let raycaster = new THREE.Raycaster(this._map._camera.position, ray)
        //返回射线选中的对象
        let intersects = raycaster.intersectObjects(this._container.children)
      
        for (var i = 0; i < intersects.length; i++) {
            let object = intersects[i].object
            let udata = object.userData
            if (udata && udata.type === 'area') {
                object.material.transparent = true
                object.material.opacity = 0.6
                this._currentSelectObj = object
                break;
            }
        }
        if (i >= intersects.length) {
            if (this._currentSelectObj) {
                this._currentSelectObj.material.transparent = false
                this._currentSelectObj.material.opacity = 1
                this._currentSelectObj = null
            }
        }
    }

    /**
     * 柱状图层
     * @param {Obj} data  包含 x,y轴数据
     * @param {*} options 
     */
    function BarChartLayer(data, options, baseLayer) {
        Layer.call(this, data, options)
        var defaultOptions = {
            isTooltip: true, //是否显示 tootip
            isBarText: true, //是否显示柱子上文字
            fontFamily: 'Microsoft YaHei',
            fontSize: 12,
            fontColor: '#000',
            minValue: undefined,
            maxValue: undefined,
            barWidth: 0.3, // bar边长
            barRange: [3, 12], // 归一化区间（柱子的最大最小高度）,最小值必须大于零
            bevelThickness: 0.2,
            bevelSize: null,
            defaultColor: null,
            grandient: null,
            enumColor: null
        }
        this.options = Util.extend(defaultOptions, options)
        
        this._baselayer = baseLayer
        this._baseData = baseLayer.getData()

        this._currentSelectObj = null

        this._colorsData = {
            data: [],
            min: null,
            max: null
        }
        
        this._normalizeData()
        this._caculateMinMax()
    }

    Util.inherit(Layer, BarChartLayer)

    BarChartLayer.prototype._normalizeData = function() {
        var feas = []
        var xdata = this._data.x[0].data
        // 如果设置了颜色计算公式，需根据颜色计算y值，新的y值存储在 colors 属性中
        var colorData = this._data.colors.length ? this._data.colors : this._data.y[0].data
        var ydata = this._data.y[0].data
        var xname = this._data.x[0].name
        var yname = this._data.y[0].name
        var length = xdata.length
        var newdata = []

        // 渐变色根据 colordata 大小确定
        colorData = colorData.map(d => Number(d))
        this._colorsData.data = colorData
        this._colorsData.min = Math.min(...colorData)
        this._colorsData.max = Math.max(...colorData)

        if (!this._baseData) {
            throw new Error('无底图数据！')
        }
        if (this._baseData.type === 'Feature') {
            feas.push(this._baseData)
        } else {
            feas = this._baseData.features
        }
        
        let flen = feas.length

         // 根据地图上的 geojson 数据去匹配数据 x 轴地区数据
        for(let i = 0; i < flen; i++) {
            let f = feas[i]
            let center =  f.properties.cp || f.properties.center
            let name = f.properties.name
            if (typeof center === 'string') {
                center = center.split(',')
            }
            if (Array.isArray(center)) { center = center.map(item => Number(item)) }
            let j = 0
            for (; j < length; j++) {  
                let codeOrName = String(xdata[j])
                let value = Number(ydata[j]) 
                if(f.properties 
                    && (String(f.properties.id) === codeOrName || new RegExp(name).test(codeOrName) ) 
                    && center) {
                    let tempobj = {
                        xname: xname,
                        yname: yname,
                        isMatch: true
                    }
                    tempobj.id = f.properties.id
                    tempobj.name = name
                    tempobj.xdataName = codeOrName
                    tempobj.center = center
                    tempobj.value = value
                    tempobj.index = j
                    tempobj.formattedVal = bdpChart.helper.dataLabelFormatter(this._data.y[0].formatter, value, this._data.y[0].aggregator)
                    // 如果未设置单位，则使用自定义单位
                    if (!this._data.y[0].formatter.num.unit || this._data.y[0].formatter.num.unit === '1') {
                        tempobj.formattedVal += this._data.y[0].unit_adv
                    }
                    tempobj.bounds = Util.getBoundingRect(f)
                    newdata.push(tempobj)
                    break;
                }
            }
            // 未匹配到的
            if(j >= length) {
                if (center && name) {
                    let tempobj = {
                        isMatch: false,
                        center: center,
                        name: name
                    }
                    tempobj.bounds = Util.getBoundingRect(f)
                    newdata.push(tempobj)
                }
            }
        }

        this._olddata = this._data
        this._data = newdata
    }

    BarChartLayer.prototype._caculateMinMax = function () {
        if (!this._data.length) {
            return;
        }
        var i, len, value, match, min = Number.MAX_VALUE, max = -Number.MAX_VALUE;
        if (this.options.minValue == null) {
            for (i = 0, len = this._data.length; i < len; i++) {
                value = this._data[i].value
                match = this._data[i].isMatch
                // 未匹配到的数据不参与计算
                if (match && value < min) {
                    min = value
                }
            }
            this.options.minValue = min
        } 
        if (this.options.maxValue == null) {
            for (i = 0, len = this._data.length; i < len; i++) {
                value = this._data[i].value
                match = this._data[i].isMatch
                if (match && value > max) {
                    max = value
                }
            }
            this.options.maxValue = max  
        }

        // 调整最大最小值得比例关系
        let datavals = []
        this._data.forEach(d => {
            if (d.isMatch) {
                datavals.push(d.value);
            }
        });
        // 去重
        datavals = datavals.filter((val, index, arr) => index === arr.indexOf(val));
        // 只有两类数时，柱子高度成比例
        if (datavals.length === 2 && max !== 0 && min !== 0 && max !== min) {
            let ratio = 0
            if (max * min > 0) {
                if (min > 0) {
                    ratio = min / max
                } else {
                    ratio = Math.abs(max / min)
                }
            } else {
                ratio = 1 / (max - min)
            }
            // let ratio = Math.abs(min / max)
            this.options.barRange[0] = Math.max(this.options.barRange[1] * ratio, this.options.barRange[0])
        }
    }
    BarChartLayer.prototype._getCube = function (width, height, depth, color) {
        var halfWidth = width / 2;
        var halfHeight = height / 2;

        var shape = new THREE.Shape();
        shape.moveTo(-halfWidth, -halfHeight);
        shape.lineTo(-halfWidth, halfHeight);
        shape.lineTo(halfWidth, halfHeight);
        shape.lineTo(halfWidth, -halfHeight);
        shape.lineTo(-halfWidth, -halfHeight);
  
        var extrudeSettings = {
          curveSegments: 0,
          steps: 0,
          depth: depth,
          bevelEnabled: true,
          bevelThickness: this.options.bevelThickness,
          bevelSize: this.options.bevelSize,
          bevelSegments: 100
        };
        var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        var material = new THREE.MeshPhongMaterial({ color: color });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotateX(-Math.PI / 2);
        return mesh;
    }
    BarChartLayer.prototype._addBarChart = function () {
        this._data.forEach(function(item, index) {
            let value = this.getValue(item.value)
            let color = "#fff"
            let cLen = this.options.defaultColor.length
            let isMatch = item.isMatch // 标识是否有数据

            if (isMatch) {
                if (this.options.grandient) {
                    let cvalue = item.value 
                    if (this._colorsData.data && this._colorsData.data.length) {
                        cvalue = this._colorsData.data[item.index]
                    }
                    color = this.getInterPolateColor(cvalue, this.options.grandient, this._colorsData.min, this._colorsData.max)
                } else if (this.options.enumColor) {
                   let enumcolor = this.options.enumColor[item.xdataName]
                   color = enumcolor && enumcolor.color 
                   if(!color){
                    color = this.options.defaultColor[index % cLen]
                   }
                } else {
                    color = this.options.defaultColor[index % cLen]
                }
            }

            if (isMatch) {
                let cube = this._getCube(this.options.barWidth, this.options.barWidth, value, color);
                cube.userData = Util.extend({ type: 'bar' }, item)
                cube.position.set(item.center[0], this._baselayer.options.depth, -item.center[1])
                this._container.add(cube)
            }
            // 地区名字，有数据的地方才显示地区名字，没数据的地方不显示
            this._baselayer.drawLabel(item.center, item.name, item.bounds, this.options.barWidth, isMatch)
            // 柱子上面文字
            if(isMatch && this.options.isBarText) {

                var textSprite = Util.getTextSprite(String(item.formattedVal), {
                    fontColor: this.options.fontColor,
                    fontFamily: this.options.fontFamily
                });

                textSprite.userData = {
                    type: 'barText'
                }
                
                var scaleX = 10, scaleY = 10;
                var ratio = this._map.getOptimalDistance(this.options.bound).ratio;
                if (this.options.bound) {
                    scaleX = ratio * scaleX;
                    scaleY = ratio * scaleY;
                }
                textSprite.scale.set(scaleX, scaleY, 1);

                textSprite.position.set(item.center[0], this._baselayer.options.depth + value + 0.8 * ratio, -item.center[1])

                this._container.add(textSprite);
            }
        }, this)   
    }
    BarChartLayer.prototype.onAdd = function (map) {
        Layer.prototype.onAdd.call(this, map)
        this._addBarChart()
        if (this.options.isTooltip) {
            // this._tooltip = new ToolTip(map._el)
            // this._this_mousemoveEvtHandler = this._mousemoveEvtHandler.bind(this)
            // this._map._renderer.domElement.addEventListener('mousemove', this._this_mousemoveEvtHandler, false)
            this._map.on('mousemove', this._mousemoveEvtHandler, this)
        }
    },
    BarChartLayer.prototype.onRemove = function (map) {
        Layer.prototype.onRemove.call(this, map)
        if (this.options.isTooltip) {
            // this._tooltip.remove()
            TooltipHelper.hideTooltip()
            // this._map._renderer.domElement.removeEventListener('mousemove', this._this_mousemoveEvtHandler, false)
            this._map.off('mousemove', this._mousemoveEvtHandler, this)
        }
    },
    BarChartLayer.prototype._mousemoveEvtHandler = function (event) {
        let Sx = event.offsetX //鼠标单击位置横坐标
        let Sy = event.offsetY //鼠标单击位置纵坐标
        let Cx = event.clientX
        let Cy = event.clientY
        //屏幕坐标转标准设备坐标
        let x = (Sx / this._map._width) * 2 - 1 //标准设备横坐标
        let y = -(Sy / this._map._height) * 2 + 1 //标准设备纵坐标
        let standardVector = new THREE.Vector3(x, y, 0.5) //标准设备坐标
        //标准设备坐标转世界坐标
        let worldVector = standardVector.unproject(this._map._camera)
        //射线投射方向单位向量(worldVector坐标减相机位置坐标)
        let ray = worldVector.sub(this._map._camera.position).normalize()
        //创建射线投射器对象
        let raycaster = new THREE.Raycaster(this._map._camera.position, ray)
        //返回射线选中的对象
        let intersects = raycaster.intersectObjects(this._container.children)
      
        // 避免连续选中
        if (this._currentSelectObj) {
            this._currentSelectObj.material.transparent = false
            this._currentSelectObj.material.opacity = 1
            this._currentSelectObj = null
            TooltipHelper.hideTooltip()
        }

        for (var i = 0; i < intersects.length; i++) {
            let object = intersects[i].object
            let udata = object.userData
            if (udata && udata.type === 'bar') {
                let color = object.material.color.getHexString()
                object.material.transparent = true
                object.material.opacity = 0.85
                this._currentSelectObj = object  
                
                let content = `
                    <div class="mb4" style="text-align:center;">${udata['name']}</div>
                    <div style="color:#${color};"><span>${udata['yname']}：</span> ${udata['formattedVal']}</div>
                `
                
                TooltipHelper.showTooltip(Cx, Cy, content)
                break;
            }
        }
        if (i >= intersects.length) {
            if (this._currentSelectObj) {
                this._currentSelectObj.material.transparent = false
                this._currentSelectObj.material.opacity = 1
                this._currentSelectObj = null
                // this._tooltip.close()
                TooltipHelper.hideTooltip()
            }
        }
    }
    /**
     * 获取归一化的值，归一到区间[ymin, ymax]
     * xmax, xmin 目前数据的最大、最小值
     * ymax, ymin 目标区间的最大、最小值
     */
    BarChartLayer.prototype.getValue = function (value, xmin, xmax, ymin, ymax, type=0) {
        if (Util.isNullOrUdf(xmin)) { xmin = this.options.minValue }
        if (Util.isNullOrUdf(xmax)) { xmax = this.options.maxValue }
        if (Util.isNullOrUdf(ymin)) { ymin = this.options.barRange[0] }
        if (Util.isNullOrUdf(ymax)) { ymax = this.options.barRange[1] }
        var value =  Math.max(ymin, ymin + (ymax - ymin) * (value - xmin) / (xmax - xmin))
        if (xmax === 0 && xmin === 0) {
            return ymin
        }
        if (xmin === xmax) {
            // type =0 柱子高度相同时，取中值
            // type !=0 颜色相同时，取最小值
            if (type === 0) {return (ymax + ymin) / 2}
            else {return ymin}
        }
        if (isNaN(value) || value === Infinity) {
            return ymax
        }
        return value
    }
    /**
     * 获取某个值对应的渐变色值
     */
    BarChartLayer.prototype.getInterPolateColor = function (num, g, xmin, xmax) {
        g = g || [
            { value: 1, color: '#EF6064'},
            { value: 0, color: '#FFA9A9'}
        ]
        if (!this._imageData) {
            const canvas = document.createElement('canvas')
            canvas.height = 1
            canvas.width = 256
            const ctx = canvas.getContext('2d')
            const grandient = ctx.createLinearGradient(0, 0, 256, 0)
            g.forEach(item => {
                grandient.addColorStop(item.value, item.color)
            })
            ctx.fillStyle = grandient
            ctx.fillRect(0, 0, 256, 1)
            this._imageData = ctx.getImageData(0, 0, 256, 1).data
        }
        let newnum = Math.round(this.getValue(num, xmin, xmax, 1, 256, 1))
        return `rgba(${this._imageData[4 * (newnum-1)]},${this._imageData[4 * (newnum-1)+1]},${this._imageData[4 * (newnum-1)+2]},${this._imageData[4 * (newnum-1)+3]})`
    }
})(bdpChart);