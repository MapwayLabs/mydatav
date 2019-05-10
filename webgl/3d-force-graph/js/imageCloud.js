// import Config from './config';
// export default ImageCloud;

// 105034
var f = function(e, t, n, r) {
    var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : TWEEN.Easing.Quadratic.InOut;
    return new Promise(function(o) {
        new TWEEN.Tween(e).to(t, n).start().easing(i).onUpdate(r).onComplete(o)
    });
};

var u = {
	createHexagonSpriteFromUrl: function(e) {
	    return new Promise(function(t) {
	        var n = document.createElement("canvas")
	          , r = n.getContext("2d");
	        n.width = 200,
	        n.height = 200;
	        var i = new THREE.Texture(n);
	        i.minFilter = THREE.LinearFilter,
	        i.magFilter = THREE.LinearFilter,
	        i.format = THREE.RGBFormat;
	        var o = new THREE.MeshBasicMaterial({
	            color: 0XFFFFFF,
	            transparent: true,
	            opacity: 0,
	            map: i
	        })
	          , s = new THREE.Mesh(new THREE.CircleGeometry(1,64,64),o);
	        s.scale.set(.001, .001, .001),
	        (new THREE.ImageLoader).load(e, function(e) {
	            var o = e.width < e.height ? e.width : e.height;
	            n.width = o,
	            n.height = o;
	            var a = o / 2;
	            r.beginPath(),
	            r.arc(o / 2, o / 2, o / 2, 0, 2 * Math.PI, !0),
	            r.closePath(),
	            r.clip(),
	            r.drawImage(e, 0, 0, o, o),
	            r.lineWidth = 10,
	            r.strokeStyle = "#81ecec",
	            r.beginPath(),
	            r.arc(a, a, a - 2, 0, 2 * Math.PI, !0),
	            r.stroke(),
	            i.needsUpdate = !0,
	            t(s)
	        });
	    });
	}
};

function ImageCloud(e, n, r) {
	THREE.Group.call(this);
	var i = this;
    return i.graph = e,
    // l.default.instance().config,
    i.cloudScene = n,
    i.camera = r,
    i.nearbyNodes = [],
    i.init(),
    i._updateF = _.throttle(function() {
        i._update()
    }, 300),
    i
}

ImageCloud.prototype = Object.assign( Object.create(THREE.Group.prototype), {
	constructor: ImageCloud,
	init: function() {},
	getTitle: function(e, t) {
        // var n = c.default.instance().getLabelConfig(e)
        var n = { caption_property: "" }
          , r = "";
        return n && n.caption_property && (r = t[n.caption_property]),
        r ? String(r) : ""
    },
	isImageLink: function(e, t) {
        return /^(image|photo|avatar)/gi.test(t) || /^data\:image\/(jpg|jpeg|png|gif|bmp)\;base64/gi.test(e) || /^(http(s)?|ftp):\/\/.+\.(jpg|jpeg|png|gif|bmp)/i.test(e)
    },
	getAvatar: function(e) {
        for (var t = /Photo|Avatar|Image|Picture|icon/i, n = Object.keys(e), r = "", i = "", o = 0; o < n.length; o++) {
            var a = n[o];
            if (t.test(a) && this.isImageLink(e[a], a)) {
                r = String(e[a]).trim();
                break
            }
            this.isImageLink(e[a], a) && (i = String(e[a]).trim())
        }
        return "" == r && "" !== i.trim() && (r = i),
        r
    },
	parseColor:function(e) {
        return "number" == typeof e && (e = "#" + ("00000" + (0 | e).toString(16)).substr(-6)),
        e
    },
	restoreGraph: function() {
        var e = this;
        this.graph.visibleNodes.forEach(function(t) {
            if (t.image) {
                var n = t.image;
                delete t.image,
                t.alpha = 1,
                n.material.map.dispose(),
                n.material.dispose(),
                e.remove(n)
            }
        }),
        this.graph = null,
        this.cloudScene = null,
        this.camera = null,
        this.parent.remove(this)
    },
	_update: function() {
        var e = this;
        if (this.graph) {
            var t = this
              , n = [];
            this.graph.visibleNodes.forEach(function(e) {
                var r = e.position.distanceTo(t.worldToLocal(t.camera.position.clone()));
                r < 5 * t.cloudScene.scale.x && n.push({
                    distanceToCamera: r,
                    node: e
                })
            }),
            n = _.uniq(n),
            n = _.orderBy(n, ["distanceToCamera"], ["asc"]),
            n = _.map(n, "node").slice(0, 50),
            t.nearbyNodes.filter(function(e) {
                return !_.includes(n, e)
            }).forEach(function(e) {
                Promise.resolve().then(function() {
                    return f({
                        alpha: 1
                    }, {
                        alpha: 1e-4
                    }, 500, function(t) {
                        e.image && (e.image.material.opacity = t.alpha)
                    })
                }).then(function() {
                    return e.image && (e.image.material.map.dispose(),
                    e.image.material.dispose(),
                    t.remove(e.image),
                    delete e.image),
                    Promise.resolve()
                }).then(function() {
                    return f({
                        alpha: 1e-4
                    }, {
                        alpha: 1
                    }, 500, function(t) {
                        e.alpha = t.alpha
                    })
                })
            });
            this.children.filter(function(t) {
                return !_.map(e.nearbyNodes, "id").includes(t.name)
            }).forEach(function(n) {
                e.graph.getNodeById(n.name) && (e.graph.getNodeById(n.name).alpha = 1),
                n && (n.material.map.dispose(),
                n.material.dispose(),
                t.remove(n))
            });
            n.filter(function(t) {
                return !_.includes(e.nearbyNodes, t)
            }).forEach(function(n) {
                Promise.resolve().then(function() {
                    // var r = e.getAvatar(n.data.detail.data)
                    // console.log(n);
                    // var url = n.data.style['background-image'];
                    // var r = url && url.substring(4, url.length-1)
                    var r = 'img/kg1.png'
                      , i = null;
                    r && (i = (0,
                    u.createHexagonSpriteFromUrl)(r)),
                    i && i.then(function(e) {
                        return t.graph ? (e.name = n.id,
                        n.image = e,
                        n.image.position.copy(n.position),
                        n.image.scale.multiplyScalar(.05),
                        n.alpha = .001,
                        t.add(n.image),
                        Promise.resolve()) : Promise.reject()
                    }).then(function() {
                        return f({
                            alpha: 1e-4
                        }, {
                            alpha: 1
                        }, 500, function(e) {
                            t.graph && n.image ? (n.image.scale.set(.05 * e.alpha, .05 * e.alpha, .05 * e.alpha),
                            n.image.material.opacity = e.alpha * n.imageAlpha,
                            n.alpha = 1e-4) : n.alpha = 1
                        })
                    }).catch(function(e) {})
                })
            }),
            this.nearbyNodes = n
        }
    },
	updateSelectedNodes: function() {
        var e = this.nearbyNodes.filter(function(e) {
            return 1 == e.selected
        })
          , t = this.nearbyNodes.filter(function(e) {
            return 0 == e.selected
        });
        e.forEach(function(e) {
            if (e.image) {
                var t = Math.abs(Math.sin(.003 * Date.now()))
                  , n = Config.config.nodeSizeScale * (1 + t) * .04 || 1e-4;
                e.image.scale.set(n, n, n)
            }
        }),
        t.forEach(function(e) {
            e.image && (e.image.material.color = new THREE.Color(0xffffff),
            e.image.scale.set(.05, .05, .05))
        })
    },
	update: function() {
        if (this.graph) {
            var e = this;
            e.nearbyNodes.forEach(function(t) {
                t.image && (t.image.position.copy(t.position.clone()),
                t.image.material.opacity = t.imageAlpha,
                t.image.lookAt(e.worldToLocal(e.camera.position.clone())))
            }),
            this.updateSelectedNodes(),
            this._updateF()
        }
    }
});