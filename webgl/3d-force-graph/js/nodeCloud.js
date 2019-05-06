// export default NodeCloud;

const NodeShader = {
	vertexShader:  "attribute float size;\nattribute float alpha;\nattribute float icon;\nattribute vec3 customColor;\nattribute vec3 ringColor;\nvarying vec3 vColor;\nvarying vec3 rColor;\nvarying float vAlpha;\nvarying float vSize;\nvarying float vIcon;\nuniform float time;\nuniform  float iconColunm;\nvoid main() {\n    vColor = customColor;\n    rColor = ringColor;\n    vAlpha = alpha * time;\n    vIcon = icon;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    vSize = size * ( 50.0 / -mvPosition.z ); \n    gl_PointSize = vSize * time;\n    gl_Position = projectionMatrix * mvPosition;\n} ",
	fragmentShader: "uniform vec3 color;\nuniform float time;\nuniform sampler2D texture;\nuniform  float iconColunm;\nvarying vec3 vColor;\nvarying vec3 rColor;\nvarying float vAlpha;\nvarying float vSize;\nvarying float vIcon;//vIcon value 0.0 1.0 2.0 ...\nvoid main() {\n        gl_FragColor = vec4(vColor, vAlpha );\n        vec2 coord = vec2(gl_PointCoord.s,gl_PointCoord.t);\n        vec2 newCoord = coord/iconColunm;\n        float len = length(gl_PointCoord- vec2(0.5, 0.5));\n        float row = floor((vIcon + 1.0)/iconColunm-0.01);\n        float colum = mod(vIcon,iconColunm);\n        float divition = 1.0/iconColunm;\n        if(vColor.r == rColor.r && vColor.g == rColor.g && vColor.b == rColor.b)\n        {\n                //not set icon\n                if(vIcon == 0.0)\n                {\n                   gl_FragColor = gl_FragColor * texture2D( texture,vec2(newCoord.s,1.0-newCoord.t) + vec2(colum*divition, -row*divition) );\n                }\n                else\n                {\n                    gl_FragColor = gl_FragColor * texture2D( texture,vec2(newCoord.s,1.0-newCoord.t) + vec2(colum*divition, -row*divition) ) * vec4(1.0,1.0,1.0,vAlpha);\n                }\n        }\n        else\n        { \n                //selected color\n                if(vIcon == 0.0)\n                {\n                    gl_FragColor = gl_FragColor * texture2D( texture,vec2(newCoord.s,1.0-newCoord.t) + vec2(colum*divition, -row*divition) );\n                }\n                else\n                {\n                   gl_FragColor = gl_FragColor * texture2D( texture,vec2(newCoord.s,1.0-newCoord.t) + vec2(colum*divition, -row*divition) );\n                }\n        }\n\n        if ( gl_FragColor.a < ALPHATEST ) discard;\n}"
};
const ColorSchema = {
    LABEL: 0,
    TAG: 1,
    PROPERTY: 2
};
const d = 1e5;
//参照 app.js 105636
function NodeCloud(graph, parent) {
    this.graph = graph;
    this.parent = parent;
    this.points = null;
    this.nodePostions = new Float32Array(3 * d);
    this.nodeColors = new Float32Array(3 * d);
    this.nodeBorderColors = new Float32Array(3 * d);
    this.nodeSize = new Float32Array(d);
    this.nodeAlpha = new Float32Array(d);
    this.icon = new Float32Array(d);
    this.init();
}

NodeCloud.prototype = {
	constructor: NodeCloud,
	updateIcon: function(e) {
	    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4;
	    this.setDefaultIcon(),
	    this.material.uniforms.texture.value = (new THREE.TextureLoader).load(e),
	    this.material.uniforms.texture.needsUpdate = !0,
	    this.material.uniforms.iconColunm.value = t,
	    this.material.uniforms.iconColunm.needsUpdate = !0
	},
	setDefaultIcon: function() {
        this.graph.nodes.forEach(function(e) {
            e.icon = 0
        })
    },
    init: function() {
        var iconObj = {
            icon: 'img/spritesheet.png',
            iconColumn: 4
        };
        var e = iconObj.icon
          , t = iconObj.iconColumn;
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                color: {
                    type: "c",
                    value: new THREE.Color(0xffffff)
                },
                time: {
                    type: "f",
                    value: 1
                },
                iconColunm: {
                    type: "f",
                    value: t
                },
                texture: {
                    type: "t",
                    value: (new THREE.TextureLoader).load(e)
                }
            },
            vertexShader: NodeShader.vertexShader,
            fragmentShader: NodeShader.fragmentShader,
            transparent: !0,
            alphaTest: .1
        });
        for (var r = 0; r < d; r++)
            this.nodePostions[3 * r] = 1e4,
            this.nodePostions[3 * r + 1] = 1e4,
            this.nodePostions[3 * r + 2] = 1e4;
        this.geometry = new THREE.BufferGeometry,
        this.geometry.addAttribute("position", new THREE.BufferAttribute(this.nodePostions,3)),
        this.geometry.addAttribute("customColor", new THREE.BufferAttribute(this.nodeColors,3)),
        this.geometry.addAttribute("ringColor", new THREE.BufferAttribute(this.nodeBorderColors,3)),
        this.geometry.addAttribute("size", new THREE.BufferAttribute(this.nodeSize,1)),
        this.geometry.addAttribute("alpha", new THREE.BufferAttribute(this.nodeAlpha,1)),
        this.geometry.addAttribute("icon", new THREE.BufferAttribute(this.icon,1)),
        this.geometry.__dirtyVertices = !0,
        this.geometry.__dirtyElements = !0,
        this.geometry.name = "node-geometry",
        this.geometry.computeBoundingSphere(),
        this.geometry.boundingSphere.radius = 1e7,
        this.points = new THREE.Points(this.geometry,this.material),
        this.points.frustumCulled = !1,
        this.points.visible = !0,
        this.points.name = "node",
        this.parent.add(this.points)
    },
    removeNodeById: function(e) {
        var t = this.geometry.attributes
          , n = this.graph.visibleNodes.find(function(t) {
            return t.id == e
        });
        if (n) {
            var r = n.index;
            t.position.array[3 * r] = 0,
            t.position.array[3 * r + 1] = 0,
            t.position.array[3 * r + 2] = 0,
            t.size.array[r] = 0,
            t.alpha.array[r] = 0,
            t.icon.array[r] = 0;
            var o = new THREE.Color(0xff0000);
            t.customColor.array[3 * r] = o.r,
            t.customColor.array[3 * r + 1] = o.g,
            t.customColor.array[3 * r + 2] = o.b,
            t.position.needsUpdate = !0,
            t.size.needsUpdate = !0,
            t.customColor.needsUpdate = !0,
            t.icon.needsUpdate = !0,
            this.geometry.verticesNeedUpdate = !0
        }
    },
    clearNodes: function(e, t) {
        e = e || 0,
        t = t || this.nodesCount;
        for (var n = this.geometry.attributes, r = e; r < t; r++)
            n.position.array[3 * r] = 0,
            n.position.array[3 * r + 1] = 0,
            n.position.array[3 * r + 2] = 0,
            n.size.array[r] = 0,
            n.alpha.array[r] = 0,
            n.icon.array[r] = 0,
            n.customColor.array[3 * r] = 0,
            n.customColor.array[3 * r + 1] = 0,
            n.customColor.array[3 * r + 2] = 0;
        n.position.needsUpdate = !0,
        n.size.needsUpdate = !0,
        n.customColor.needsUpdate = !0,
        n.icon.needsUpdate = !0,
        this.geometry.verticesNeedUpdate = !0
    },
    removeAllNodes: function() {
        this.clearNodes(0, this.nodesCount)
    },
    updateNodeInfo: function() {
        var e = this
          , t = .003 * Date.now()
          , n = this.graph.colorSchema;
        this.graph.visibleNodes.forEach(function(r, o) {
            r.index = o,
            r.position.toArray(e.nodePostions, 3 * o);
            var u = new THREE.Color(r.color);
            switch (n) {
            case ColorSchema.LABEL:
                break;
            case ColorSchema.TAG:
                u = new THREE.Color(r.tagColor);
                break;
            case ColorSchema.PROPERTY:
            }
            u.toArray(e.nodeColors, 3 * o);
            var l = Math.abs(Math.sin(t))
              , c = new THREE.Color("red");
            e.nodeSize[o] = r.size * window.Config.config.nodeSizeScale,
            r.selected ? e.nodeSize[o] = r.size * window.Config.config.nodeSizeScale * (1 + l) : c = u,
            c.toArray(e.nodeBorderColors, 3 * o),
            e.nodeAlpha[o] = r.alpha,
            e.icon[o] = 1 * r.icon
        });
        var r = this.geometry.attributes;
        r.position.needsUpdate = !0,
        r.ringColor.needsUpdate = !0,
        r.customColor.needsUpdate = !0,
        r.size.needsUpdate = !0,
        r.alpha.needsUpdate = !0,
        r.icon.needsUpdate = !0,
        this.geometry.verticesNeedUpdate = !0
    },
    tweenNode: function() {
        var e = this;
        !function(e, t, n, r) {
            var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : Tween.Easing.Quadratic.InOut;
            new Promise(function(o) {
                new Tween.Tween(e).to(t, n).start().easing(i).on("update", r).on("complete", o)
            }
            )
        }({
            time: .1
        }, {
            time: 1
        }, 1e3, function(t) {
            e.material && (e.material.uniforms.time.value = t.time,
            e.material.uniforms.time.needsUpdate = !0)
        })
    },
    update: function() {
        this.graph.visibleNodes.length < this.nodesCount && this.clearNodes(this.graph.visibleNodes.length, this.nodesCount),
        this.nodesCount != this.graph.visibleNodes.length && (this.nodesCount = this.graph.visibleNodes.length),
        this.updateNodeInfo()
    }
};