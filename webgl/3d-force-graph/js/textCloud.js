// export default TextCloud;

// 118163
const textShader = {
	vertexShader: "attribute vec2 texPos; attribute vec3 customColor; attribute vec3 labelPositions; attribute vec4 textCoord; attribute float opacity; varying vec3 vColor; varying float vOpacity; varying vec4 vTextCoord; varying vec2 vUv; void main(){vColor = customColor; vOpacity = opacity; vUv = uv; vTextCoord = textCoord; gl_Position = projectionMatrix * (modelViewMatrix * vec4(position,1.0) + vec4(labelPositions.xy, 0.0, 1.0) ); } ",
	fragmentShader: "uniform sampler2D t_text; varying vec3 vColor; varying float vOpacity; varying vec4 vTextCoord; varying vec2 vUv; void main(){float x = vTextCoord.x; float y = vTextCoord.y; float w = vTextCoord.z; float h = vTextCoord.w; float xF = x + vUv.x * w; float yF = y + (1. - vUv.y) * h; vec2 sCoord =  vec2( xF , yF ); vec4 diffuse = texture2D(t_text , sCoord); gl_FragColor = mix(diffuse, vec4(vColor, diffuse.a * vOpacity), 1.0); // gl_FragColor = vec4(1.0,0.0,1.0,1.0); }"
};
function TextCloud(t, n, r) {
    var i = this;
    this.graph = t,
    this.camera = r,
    this.cloudScene = n,
    this.particleCount = 1e5,
    this.init(),
    this._updateF = _.throttle(function() {
        i._update()
    }, 100);
}

TextCloud.prototype = {
	constructor: TextCloud,
	_update: function() {
        this.updateText()
    },
	init: function() {
        this.labelGeometry = new THREE.BufferGeometry,
        this.positions = new THREE.BufferAttribute(new Float32Array(6 * this.particleCount * 3),3),
        this.labelPositions = new THREE.BufferAttribute(new Float32Array(6 * this.particleCount * 3),3),
        this.labelColors = new THREE.BufferAttribute(new Float32Array(6 * this.particleCount * 3),3),
        this.uvs = new THREE.BufferAttribute(new Float32Array(6 * this.particleCount * 2),2),
        this.ids = new THREE.BufferAttribute(new Float32Array(6 * this.particleCount * 1),1),
        this.opacities = new THREE.BufferAttribute(new Float32Array(6 * this.particleCount * 1),1),
        this.textCoords = new THREE.BufferAttribute(new Float32Array(6 * this.particleCount * 4),4),
        this.labelGeometry.addAttribute("position", this.positions),
        this.labelGeometry.addAttribute("labelPositions", this.labelPositions),
        this.labelGeometry.addAttribute("uv", this.uvs),
        this.labelGeometry.addAttribute("id", this.ids),
        this.labelGeometry.addAttribute("opacity", this.opacities),
        this.labelGeometry.addAttribute("textCoord", this.textCoords),
        this.labelGeometry.addAttribute("customColor", this.labelColors),
        this.updateText();
        var e = new THREE.ShaderMaterial({
            uniforms: {
                t_text: {
                    type: "t",
                    value: l
                }
            },
            vertexShader: textShader.vertexShader,
            fragmentShader: textShader.fragmentShader,
            blending: THREE.AdditiveBlending,
            depthTest: !1,
            alphaTest: .1,
            transparent: !0
        });
        this.labelMesh = new THREE.Mesh(this.labelGeometry,e),
        this.labelMesh.frustumCulled = !1,
        this.cloudScene.add(this.labelMesh)
    },
	getTitle: function(e, t) {
        // var n = a.default.instance().getLabelConfig(e)
        var n = { caption_property: "" }
          , r = "";
        if (n && n.caption_property && (r = t[n.caption_property]) && r.length > 30) {
            var i = r.split(" ");
            r = i.length > 1 ? i[0] + " " + i[1] : i[0]
        }
        return r ? String(r) : ""
    },
	updateText: function() {
        var e = this
          , t = 0
          , n = this;
        this.graph.visibleNodes.forEach(function(r) {
            var i = r.position
              , o = r.color
              , a = e.getTitle(r.data.detail.type, r.data.detail.data)
              , s = 0;
            if (window.globalVariable.isVR)
                s = 1;
            else {
                r.position.distanceTo(n.cloudScene.worldToLocal(n.camera.position.clone())) < 4 * n.cloudScene.scale.x && (s = .8)
            }
            s *= r.alpha;
            (a ? String(a).split("") : []).forEach(function(n, r) {
                var a = 3 * t * 2
                  , u = e.getTextCoordinates(n)
                  , l = u[4]
                  , c = u[4] + u[2]
                  , d = u[5] - u[3]
                  , f = u[5];
                e.ids.array[a + 0] = r,
                e.ids.array[a + 1] = r,
                e.ids.array[a + 2] = r,
                e.ids.array[a + 3] = r,
                e.ids.array[a + 4] = r,
                e.ids.array[a + 5] = r,
                e.opacities.array[a + 0] = s,
                e.opacities.array[a + 1] = s,
                e.opacities.array[a + 2] = s,
                e.opacities.array[a + 3] = s,
                e.opacities.array[a + 4] = s,
                e.opacities.array[a + 5] = s,
                e.positions.array[3 * a + 0] = i.x + .05,
                e.positions.array[3 * a + 1] = i.y - .01,
                e.positions.array[3 * a + 2] = i.z,
                e.positions.array[3 * a + 3] = i.x + .05,
                e.positions.array[3 * a + 4] = i.y - .01,
                e.positions.array[3 * a + 5] = i.z,
                e.positions.array[3 * a + 6] = i.x + .05,
                e.positions.array[3 * a + 7] = i.y - .01,
                e.positions.array[3 * a + 8] = i.z,
                e.positions.array[3 * a + 9] = i.x + .05,
                e.positions.array[3 * a + 10] = i.y - .01,
                e.positions.array[3 * a + 11] = i.z,
                e.positions.array[3 * a + 12] = i.x + .05,
                e.positions.array[3 * a + 13] = i.y - .01,
                e.positions.array[3 * a + 14] = i.z,
                e.positions.array[3 * a + 15] = i.x + .05,
                e.positions.array[3 * a + 16] = i.y - .01,
                e.positions.array[3 * a + 17] = i.z,
                e.labelPositions.array[3 * a + 0] = .015 * r + .02 * l * 10,
                e.labelPositions.array[3 * a + 1] = .02 * f * 10,
                e.labelPositions.array[3 * a + 2] = 0,
                e.labelPositions.array[3 * a + 3] = .015 * r + .02 * l * 10,
                e.labelPositions.array[3 * a + 4] = .02 * d * 10,
                e.labelPositions.array[3 * a + 5] = 0,
                e.labelPositions.array[3 * a + 6] = .015 * r + .02 * c * 10,
                e.labelPositions.array[3 * a + 7] = .02 * f * 10,
                e.labelPositions.array[3 * a + 8] = 0,
                e.labelPositions.array[3 * a + 9] = .015 * r + .02 * c * 10,
                e.labelPositions.array[3 * a + 10] = .02 * d * 10,
                e.labelPositions.array[3 * a + 11] = 0,
                e.labelPositions.array[3 * a + 12] = .015 * r + .02 * c * 10,
                e.labelPositions.array[3 * a + 13] = .02 * f * 10,
                e.labelPositions.array[3 * a + 14] = 0,
                e.labelPositions.array[3 * a + 15] = .015 * r + .02 * l * 10,
                e.labelPositions.array[3 * a + 16] = .02 * d * 10,
                e.labelPositions.array[3 * a + 17] = 0,
                e.uvs.array[2 * a + 0] = 0,
                e.uvs.array[2 * a + 1] = 1,
                e.uvs.array[2 * a + 2] = 0,
                e.uvs.array[2 * a + 3] = 0,
                e.uvs.array[2 * a + 4] = 1,
                e.uvs.array[2 * a + 5] = 1,
                e.uvs.array[2 * a + 6] = 1,
                e.uvs.array[2 * a + 7] = 0,
                e.uvs.array[2 * a + 8] = 1,
                e.uvs.array[2 * a + 9] = 1,
                e.uvs.array[2 * a + 10] = 0,
                e.uvs.array[2 * a + 11] = 0,
                e.textCoords.array[4 * a + 0] = u[0],
                e.textCoords.array[4 * a + 1] = u[1],
                e.textCoords.array[4 * a + 2] = u[2],
                e.textCoords.array[4 * a + 3] = u[3],
                e.textCoords.array[4 * a + 4] = u[0],
                e.textCoords.array[4 * a + 5] = u[1],
                e.textCoords.array[4 * a + 6] = u[2],
                e.textCoords.array[4 * a + 7] = u[3],
                e.textCoords.array[4 * a + 8] = u[0],
                e.textCoords.array[4 * a + 9] = u[1],
                e.textCoords.array[4 * a + 10] = u[2],
                e.textCoords.array[4 * a + 11] = u[3],
                e.textCoords.array[4 * a + 12] = u[0],
                e.textCoords.array[4 * a + 13] = u[1],
                e.textCoords.array[4 * a + 14] = u[2],
                e.textCoords.array[4 * a + 15] = u[3],
                e.textCoords.array[4 * a + 16] = u[0],
                e.textCoords.array[4 * a + 17] = u[1],
                e.textCoords.array[4 * a + 18] = u[2],
                e.textCoords.array[4 * a + 19] = u[3],
                e.textCoords.array[4 * a + 20] = u[0],
                e.textCoords.array[4 * a + 21] = u[1],
                e.textCoords.array[4 * a + 22] = u[2],
                e.textCoords.array[4 * a + 23] = u[3],
                e.labelColors.array[3 * a + 0] = o.r,
                e.labelColors.array[3 * a + 1] = o.g,
                e.labelColors.array[3 * a + 2] = o.b,
                e.labelColors.array[3 * a + 3] = o.r,
                e.labelColors.array[3 * a + 4] = o.g,
                e.labelColors.array[3 * a + 5] = o.b,
                e.labelColors.array[3 * a + 6] = o.r,
                e.labelColors.array[3 * a + 7] = o.g,
                e.labelColors.array[3 * a + 8] = o.b,
                e.labelColors.array[3 * a + 9] = o.r,
                e.labelColors.array[3 * a + 10] = o.g,
                e.labelColors.array[3 * a + 11] = o.b,
                e.labelColors.array[3 * a + 12] = o.r,
                e.labelColors.array[3 * a + 13] = o.g,
                e.labelColors.array[3 * a + 14] = o.b,
                e.labelColors.array[3 * a + 15] = o.r,
                e.labelColors.array[3 * a + 16] = o.g,
                e.labelColors.array[3 * a + 17] = o.b,
                t++
            })
        }),
        this.clean(t);
        var r = this.labelGeometry.attributes;
        r.position.needsUpdate = !0,
        r.labelPositions.needsUpdate = !0,
        r.uv.needsUpdate = !0,
        r.customColor.needsUpdate = !0,
        r.textCoord.needsUpdate = !0,
        r.opacity.needsUpdate = !0,
        this.labelGeometry.verticesNeedUpdate = !0
    },
	clean: function(e) {
        for (var t = e, n = t; n < 6 * this.particleCount; n += 1)
            this.ids.array[6 * n + 0] = 0,
            this.ids.array[6 * n + 1] = 0,
            this.ids.array[6 * n + 2] = 0,
            this.ids.array[6 * n + 3] = 0,
            this.ids.array[6 * n + 4] = 0,
            this.ids.array[6 * n + 5] = 0;
        for (var r = t; r < 6 * this.particleCount; r += 1)
            this.opacities.array[6 * r + 0] = 0,
            this.opacities.array[6 * r + 1] = 0,
            this.opacities.array[6 * r + 2] = 0,
            this.opacities.array[6 * r + 3] = 0,
            this.opacities.array[6 * r + 4] = 0,
            this.opacities.array[6 * r + 5] = 0;
        for (var i = t; 18 * i + 17 < 18 * this.particleCount; i += 1)
            this.positions.array[18 * i + 0] = 0,
            this.positions.array[18 * i + 1] = 0,
            this.positions.array[18 * i + 2] = 0,
            this.positions.array[18 * i + 3] = 0,
            this.positions.array[18 * i + 4] = 0,
            this.positions.array[18 * i + 5] = 0,
            this.positions.array[18 * i + 6] = 0,
            this.positions.array[18 * i + 7] = 0,
            this.positions.array[18 * i + 8] = 0,
            this.positions.array[18 * i + 9] = 0,
            this.positions.array[18 * i + 10] = 0,
            this.positions.array[18 * i + 11] = 0,
            this.positions.array[18 * i + 12] = 0,
            this.positions.array[18 * i + 13] = 0,
            this.positions.array[18 * i + 14] = 0,
            this.positions.array[18 * i + 15] = 0,
            this.positions.array[18 * i + 16] = 0,
            this.positions.array[18 * i + 17] = 0,
            this.labelPositions.array[18 * i + 0] = 0,
            this.labelPositions.array[18 * i + 1] = 0,
            this.labelPositions.array[18 * i + 2] = 0,
            this.labelPositions.array[18 * i + 3] = 0,
            this.labelPositions.array[18 * i + 4] = 0,
            this.labelPositions.array[18 * i + 5] = 0,
            this.labelPositions.array[18 * i + 6] = 0,
            this.labelPositions.array[18 * i + 7] = 0,
            this.labelPositions.array[18 * i + 8] = 0,
            this.labelPositions.array[18 * i + 9] = 0,
            this.labelPositions.array[18 * i + 10] = 0,
            this.labelPositions.array[18 * i + 11] = 0,
            this.labelPositions.array[18 * i + 12] = 0,
            this.labelPositions.array[18 * i + 13] = 0,
            this.labelPositions.array[18 * i + 14] = 0,
            this.labelPositions.array[18 * i + 15] = 0,
            this.labelPositions.array[18 * i + 16] = 0,
            this.labelPositions.array[18 * i + 17] = 0;
        for (var o = t; 12 * o + 1 < 12 * this.particleCount; o += 1)
            this.uvs.array[12 * o + 0] = 0,
            this.uvs.array[12 * o + 1] = 0,
            this.uvs.array[12 * o + 2] = 0,
            this.uvs.array[12 * o + 3] = 0,
            this.uvs.array[12 * o + 4] = 0,
            this.uvs.array[12 * o + 5] = 0,
            this.uvs.array[12 * o + 6] = 0,
            this.uvs.array[12 * o + 7] = 0,
            this.uvs.array[12 * o + 8] = 0,
            this.uvs.array[12 * o + 9] = 0,
            this.uvs.array[12 * o + 10] = 0,
            this.uvs.array[12 * o + 11] = 0;
        for (var a = t; 24 * a + 23 < 24 * this.particleCount; a += 1)
            this.textCoords.array[24 * a + 0] = 0,
            this.textCoords.array[24 * a + 1] = 0,
            this.textCoords.array[24 * a + 2] = 0,
            this.textCoords.array[24 * a + 3] = 0,
            this.textCoords.array[24 * a + 4] = 0,
            this.textCoords.array[24 * a + 5] = 0,
            this.textCoords.array[24 * a + 6] = 0,
            this.textCoords.array[24 * a + 7] = 0,
            this.textCoords.array[24 * a + 8] = 0,
            this.textCoords.array[24 * a + 9] = 0,
            this.textCoords.array[24 * a + 10] = 0,
            this.textCoords.array[24 * a + 11] = 0,
            this.textCoords.array[24 * a + 12] = 0,
            this.textCoords.array[24 * a + 13] = 0,
            this.textCoords.array[24 * a + 14] = 0,
            this.textCoords.array[24 * a + 15] = 0,
            this.textCoords.array[24 * a + 16] = 0,
            this.textCoords.array[24 * a + 17] = 0,
            this.textCoords.array[24 * a + 18] = 0,
            this.textCoords.array[24 * a + 19] = 0,
            this.textCoords.array[24 * a + 20] = 0,
            this.textCoords.array[24 * a + 21] = 0,
            this.textCoords.array[24 * a + 22] = 0,
            this.textCoords.array[24 * a + 23] = 0;
        for (var s = t; 18 * s + 17 < 18 * this.particleCount; s += 1)
            this.labelColors.array[18 * s + 0] = 0,
            this.labelColors.array[18 * s + 1] = 0,
            this.labelColors.array[18 * s + 2] = 0,
            this.labelColors.array[18 * s + 3] = 0,
            this.labelColors.array[18 * s + 4] = 0,
            this.labelColors.array[18 * s + 5] = 0,
            this.labelColors.array[18 * s + 6] = 0,
            this.labelColors.array[18 * s + 7] = 0,
            this.labelColors.array[18 * s + 8] = 0,
            this.labelColors.array[18 * s + 9] = 0,
            this.labelColors.array[18 * s + 10] = 0,
            this.labelColors.array[18 * s + 11] = 0,
            this.labelColors.array[18 * s + 12] = 0,
            this.labelColors.array[18 * s + 13] = 0,
            this.labelColors.array[18 * s + 14] = 0,
            this.labelColors.array[18 * s + 15] = 0,
            this.labelColors.array[18 * s + 16] = 0,
            this.labelColors.array[18 * s + 17] = 0
    },
	getTextCoordinates: function(e) {
        var t = void 0
          , n = e.charCodeAt(0);
        for (var r in 8216 == n && (n = 39),
        8217 == n && (n = 39),
        8212 == n && (n = 45),
        u)
            r == n && (t = u[r]);
        return t || (t = [0, 0]),
        [t[0] / 1024, t[1] / 1024, t[2] / 1024, t[3] / 1024, t[4] / 1024, t[5] / 1024]
    },
	update: function() {
        this._updateF()
    }
};