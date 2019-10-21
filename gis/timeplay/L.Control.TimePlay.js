L.Control.TimePlay = L.Control.extend({
    options: {
        position: 'topright',
        drawOptions: {
            topLine: {
                lineWidth: 2,
                globalAlpha: 1
            },
            bottomLine: {
                lineWidth: 6,
                globalAlpha: 0.3,
                strokeStyle: '#6448FF'
            },
            gradientColor: {
                0: "#2F6AFF",
                1.0: "#9DFFFF"
            }
        },
        animationOptions: {
            duration: 1000,
            delay: 500
        }
    },
    initialize: function(data, options) {
        L.Util.setOptions(this, options);
        this._data = {
            data: data,
            pgeo: [],
            sumLength: 0,
            splines: []
        };
        this._isPlaying = false;
        this._curTick = null;
        this._ctx = null;
        this.timeline = null;
        this.gradient = new Intensity({
            gradient: this.options.drawOptions.gradientColor,
            min: 0,
            max: 1
        });
    },
    onAdd: function(map) {
        this._contanier = L.DomUtil.create('div', 'my-leaflet-control-timeplay');
        L.DomEvent.disableClickPropagation(this._contanier);

        this._playButton = L.DomUtil.create('button', 'my-leaflet-control-timeplay-playbtn');
        L.DomEvent.disableClickPropagation(this._playButton);
        L.DomEvent.on(this._playButton, 'click', this._playBtnClickHandler, this);
    
        this._contanier.appendChild(this._playButton);

        this._canvasLayer = new L.CanvasLayer().addTo(map);
        this._canvasLayer.on('update', this._draw, this);
        
        this.addPointLayer();
        this._draw();
        return this._contanier;
    },
    onRemove: function() {
        L.DomEvent.off(this._playButton, 'click', this._playBtnClickHandler, this);
        this._canvasLayer.off('update', this._draw, this);
        this._map.removeLayer(this._canvasLayer);
        this._map.removeLayer(this._markersLayerGroup);
        this._map.removeLayer(this._marker);
    },
    addPointLayer: function() {
        const pointData = this._data.data.filter((item, index) => {
            return index === this._data.data.findIndex(d => {
                return d.area === item.area;
            });
        });
        console.log(pointData);
        const icon = L.icon({
            iconUrl: './point.svg',
            iconSize: [16, 16],
            className: 'my-leaflet-control-timeplay-markericon' 
        });
        let markers = [];
        for (let i = 0, len = pointData.length; i < len; i++) {
            const latlng = L.latLng(pointData[i].lat, pointData[i].lng);
            markers.push(L.marker(latlng, {
                icon: icon
            }));
        }
        this._markersLayerGroup = L.layerGroup(markers).addTo(this._map);
    },
    updateMarker: function(latlng, content) {
        if (!this._marker) {
            const icon = L.icon({
                iconUrl: './rotate.svg',
                iconSize: [16, 16],
                className: 'my-leaflet-control-timeplay-rotateicon'
            });
            this._marker = L.marker(latlng, {
                icon: icon
            }).bindTooltip(content, {
                direction: 'top',
                permanent: true
            }).openTooltip();
            this._marker.addTo(this._map);
        } else {
            this._marker.setLatLng(latlng).setTooltipContent(content).openTooltip();
        }
    },
    _calculatePixel: function() {
        this._data.data.forEach(item => {
            let latLng = L.latLng(item.lat, item.lng);
            let lyrPt = this._map.latLngToLayerPoint(latLng);
            (this._data.pgeo || (this._data.pgeo=[])).push([lyrPt.x, lyrPt.y]);
        });
    },
    _playBtnClickHandler: function() {
        if (this._isPlaying) {
            L.DomUtil.removeClass(this._playButton, 'playing');
            this.timeline.pause();
        } else {
            L.DomUtil.addClass(this._playButton, 'playing');
            this.timeline.start();
        }
        this._isPlaying = !this._isPlaying;
    },
    _draw: function() {
        const canvas = this._canvasLayer.getContainer();
        this._ctx = canvas.getContext('2d');
        this._data.pgeo = [];
        this._data.sumLength = 0;
        this._data.splines = [];
        this._calculatePixel();
        for (let i = 0, len = this._data.pgeo.length; i < len-1; i++) {
            const start = {x: this._data.pgeo[i][0], y: this._data.pgeo[i][1]};
            const end = {x: this._data.pgeo[i+1][0], y: this._data.pgeo[i+1][1]};
            const spline = this.createSpline(start, end);
            this._data.splines.push(spline);
            const bezier = new Bezier(spline.p0.x, spline.p0.y, spline.p1.x, spline.p1.y, spline.p2.x, spline.p2.y);
            const bzLen = bezier.length();
            if (i === 0) {
                this._data.pgeo[i].push(0, 0);
            }
            this._data.pgeo[i+1].push(bzLen, this._data.pgeo[i][3]+bzLen);
            this._data.sumLength += bzLen;
        }
        if (this.timeline) {
            this.drawMap(this._curTick);
        } else {
            this._initTimeLine();
        }
    },
    _initTimeLine: function() {
        var me = this;
        this.timeline = (function(){
            var _rqfID, tweenGroup, isStart, headTween, currentTween;

            function tweenUpdate(obj) {
                me._ctx.clearRect(0, 0, me._ctx.canvas.width, me._ctx.canvas.height);
                me.drawMap(obj);
                me._curTick = obj;
                me.options.animationOptions.render && me.options.animationOptions.render(obj);
            }

            function createTween() {
                isStart = false; 
                tweenGroup && tweenGroup.removeAll();

                tweenGroup = new TWEEN.Group();
                const len = me._data.pgeo.length;
                let preTween;
                for (let i = 0; i < len-1; i++) {
                    let tween = new TWEEN.Tween({ time: 0, index: i+1 }, tweenGroup)
                                    .to({ time: 1 }, me.options.animationOptions.duration)
                                    .delay(me.options.animationOptions.delay)
                                    .onUpdate(tweenUpdate);
                    if (i === 0) { // 第一个动画
                        headTween = tween;
                        tween.onStart(function() {
                            isStart = true;
                        });
                    }
                    if (i === len-2) { // 最后一个动画
                        tween.onComplete(function() {
                            L.DomUtil.removeClass(me._playButton, 'playing');
                            me._isPlaying = false;
                            createTween();
                            me.options.animationOptions.onAnimateFinish && me.options.animationOptions.onAnimateFinish.apply(null, arguments);
                        });
                    }
                    if (preTween) {
                        preTween.chain(tween);
                    }
                    preTween = tween;
                }        
            }
            createTween();

            function animate(time) {
                requestAnimationFrame(animate);
                tweenGroup && tweenGroup.update(time);
            }
            if (!_rqfID) _rqfID = requestAnimationFrame(animate);

            return {
                start: function() {
                    if (isStart) {
                        currentTween && currentTween.start();
                    } else {
                        headTween && headTween.start();
                    }  
                },
                pause: function() {
                    if (tweenGroup) {
                        currentTween = tweenGroup.getAll().find(tween => tween.isPlaying());
                        if (currentTween) currentTween.stop();
                    } 
                },
                cancel: function() {
                    _rqfID && cancelAnimationFrame(_rqfID);
                    headTween && headTween.stopChainedTweens();
                    tweenGroup && tweenGroup.removeAll();
                    headTween = null;
                    tweenGroup = null;
                    _rqfID = null;
                    currentTween = null;
                }
            };
        })();
    },
    drawMap: function(obj) {
        const ctx = this._ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (!obj || !this._data.data || !this._data.data.length) return;
        const percent = obj.time;
        const index = obj.index;
        const pgeo = this._data.pgeo;
        const splines = this._data.splines;

        // const currentLen = pgeo[index][2] * percent;
        const currentSum = pgeo[index][3];

        for (let i = 1; i <= index; i++) {
            // const bzLen = pgeo[i][2];
            const preAccumalteLen = pgeo[i-1][3];
            const accumalteLen = pgeo[i][3];
            const spline = splines[i-1];
            if (i === index) {
                const bezier = new Bezier(spline.p0.x, spline.p0.y, spline.p1.x, spline.p1.y, spline.p2.x, spline.p2.y);
                const point = bezier.get(percent);
                const split = bezier.split(percent);
                // bugfix: 修复长度计算误差导致的点线不同步问题
                const newspline = {
                    p0: split.left.points[0],
                    p1: split.left.points[1],
                    p2: split.left.points[2]
                };
                if (point) {
                    const latlng = this._map.layerPointToLatLng(point);
                    this.updateMarker(latlng, this._data.data[0].name);
                }
                // const lineDash = [currentLen, bzLen-currentLen];
                // bottom
                this.drawBezierGradientCurve(ctx, newspline, null, [], this.options.drawOptions.bottomLine);
                // top
                const startColor = this.gradient.getColor(preAccumalteLen / currentSum); 
                const endColor = this.gradient.getColor(1); 
                const gradient = ctx.createLinearGradient(newspline.p0.x, newspline.p0.y, newspline.p2.x, newspline.p2.y);
                gradient.addColorStop(0, startColor);
                gradient.addColorStop(1, endColor);
                this.drawBezierGradientCurve(ctx, newspline, gradient, [], this.options.drawOptions.topLine);
            } else {
                // bottom
                this.drawBezierGradientCurve(ctx, spline, null, [], this.options.drawOptions.bottomLine);
                // top
                const startColor = this.gradient.getColor(preAccumalteLen / currentSum); 
                const endColor = this.gradient.getColor(accumalteLen / currentSum); 
                const gradient = ctx.createLinearGradient(spline.p0.x, spline.p0.y, spline.p2.x, spline.p2.y);
                gradient.addColorStop(0, startColor);
                gradient.addColorStop(1, endColor);
                this.drawBezierGradientCurve(ctx, spline, gradient, [], this.options.drawOptions.topLine);       
            }
        }
    },
    drawBezierGradientCurve: function(ctx, spline, gradient, lineDash = [], drawOptions = {}) {
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash(lineDash);
        ctx.moveTo(spline.p0.x, spline.p0.y);
        ctx.quadraticCurveTo(spline.p1.x, spline.p1.y, spline.p2.x, spline.p2.y);
    
        const property = ['globalCompositeOperation', 'shadowColor', 'shadowBlur', 'shadowOffsetX', 'shadowOffsetY', 'globalAlpha', 'fillStyle', 'strokeStyle', 'lineWidth', 'lineCap', 'lineJoin', 'lineWidth', 'miterLimit'];
        for (let i = 0; i < property.length; i++) {
            if (drawOptions[property[i]]) {
                ctx[property[i]] = drawOptions[property[i]];
            }
        }
        if(gradient) ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.restore();
    },
    createSpline: function(start, end, deg = 45) {
        var p0 = { x: start.x, y: start.y },
            p1 = {},
            p2 = { x: end.x, y: end.y };
        let cosx = Math.cos(Math.PI / 180 * deg);
        let sinx = Math.sin(Math.PI / 180 * deg);
        let ab = {
            x: (p2.x - p0.x) / 2,
            y: (p2.y - p0.y) / 2
        };
        p1.x = p0.x + cosx * ab.x + sinx * ab.y;
        p1.y = p0.y + (-sinx) * ab.x + cosx * ab.y;
        return {
            p0: p0,
            p1: p1,
            p2: p2
        };
    }
});

