// export default EdgeCloud;

// 104711
const edgeShader = {
	vertexShader:"attribute vec3 color; attribute float opacity; varying vec3 vColor; varying float vOpacity; void main() {vec3 newPosition = position; vColor = color; vOpacity = opacity; gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition,1.0 ); } ",
	fragmentShader: "varying vec3 vColor; varying float vOpacity; void main() {gl_FragColor = vec4(vColor,vOpacity); }"
};

const arrowShader = {
	vertexShader: "precision highp float; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; uniform mat3 normalMatrix; attribute vec3 position; attribute vec3 translation; attribute vec4 rotation; attribute vec3 scale; attribute vec3 color; attribute float alpha; varying vec3 vColor; varying float vAlpha; vec3 transform( inout vec3 position, vec3 T, vec4 R, vec3 S ) {position *= S; position += vec3(0,-0.06,0); position += 2.0 * cross( R.xyz, cross( R.xyz, position ) + R.w * position ); position += T; return position; } vec3 rotate(inout vec3 position, const vec4 q) {vec3 t = 2.0 * cross(q.xyz, position); return position + q.w * t + cross(q.xyz, t); } varying vec3 vPos; void main() {vec3 pos = position; vColor = color; vAlpha = alpha; transform( pos, translation, rotation, scale ); gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 ); vPos = pos; }",
	fragmentShader: "precision highp float; varying vec3 vColor; varying float vAlpha; void main() {gl_FragColor = vec4(vColor, vAlpha ); if ( gl_FragColor.a < 0.01 ) discard; }"
};

function EdgeCloud(t, n) {
	var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    this.graph = t,
    this.group = n,
    this._hideArrow = r,
    this.maxNumEdge = 1e5,
    this.lineSegments = null,
    this.geometry = null,
    this.numEdge = 0,
    this.points = [],
    this.init();
}

EdgeCloud.prototype = {
	constructor: EdgeCloud,
	createEdgeAttributesToGeometry: function(e, t) {
        var n = {
            position: new Float32Array(2 * t * 3),
            color: new Float32Array(2 * t * 3),
            opacity: new Float32Array(2 * t)
        };
        return e.addAttribute("position", new THREE.Float32BufferAttribute(n.position,3)),
        e.addAttribute("color", new THREE.Float32BufferAttribute(n.color,3)),
        e.addAttribute("opacity", new THREE.Float32BufferAttribute(n.opacity,1)),
        e
    },
	createArrowAttributesToGeometry: function(e, t) {
        var n = new Float32Array(3 * t)
          , r = new Float32Array(4 * t)
          , i = new Float32Array(3 * t)
          , a = new Float32Array(3 * t)
          , s = new Float32Array(t);
        return e.addAttribute("translation", new THREE.InstancedBufferAttribute(n,3,1)),
        e.addAttribute("rotation", new THREE.InstancedBufferAttribute(r,4,1)),
        e.addAttribute("scale", new THREE.InstancedBufferAttribute(i,3,1)),
        e.addAttribute("color", new THREE.InstancedBufferAttribute(a,3,1)),
        e.addAttribute("alpha", new THREE.InstancedBufferAttribute(s,1,1)),
        e
    },
	init: function() {
        var e = new THREE.BufferGeometry
          , t = new THREE.ShaderMaterial({
            vertexShader: edgeShader.vertexShader,
            fragmentShader: edgeShader.fragmentShader,
            blending: THREE.AdditiveBlending,
            depthTest: !1,
            transparent: !0
        });
        this.createEdgeAttributesToGeometry(e, 0),
        e.computeBoundingSphere(),
        e.name = "edge-geometry",
        e.boundingSphere.radius = 1,
        this.geometry = e,
        this.lineSegments = new THREE.LineSegments(e,t),
        this.lineSegments.frustumCulled = !1,
        this.lineSegments.visible = !0,
        this.lineSegments.name = "edge",
        this.lineSegments.userData.isGPU = !0,
        this.group.add(this.lineSegments),
        this.initArrow()
    },
	initArrow: function() {
        var e = new THREE.ConeBufferGeometry(4,20,10)
          , t = new THREE.InstancedBufferGeometry;
        t.index = e.index,
        t.attributes.position = e.attributes.position;
        var r = new THREE.RawShaderMaterial({
            vertexShader: arrowShader.vertexShader,
            fragmentShader: arrowShader.fragmentShader,
            side: THREE.DoubleSide,
            transparent: !0,
            alphaTest: .01
        });
        this.arrows = new THREE.Mesh(t,r),
        this.arrows.name = "arrows",
        this.group.add(this.arrows)
    },
	clear: function() {
        this.clearEdges(0, this.numEdge)
    },
	hide: function() {
        this.lineSegments.visible = !1
    },
	show: function() {
        this.lineSegments.visible = !0
    },
	hideArrow: function(e) {
        this._hideArrow = e
    },
	clearEdges: function(e, t) {
        this.updateFromGraph([])
    },
	updateFromGraph: function(e) {
        var t = this
          , n = this.numEdge;
        this.numEdge = e.length,
        this.numEdge > this.maxNumEdge && (console.log("!!!!!Max num edge exceeded"),
        this.numEdge = this.maxNumEdge),
        this.numEdge != n && (this.createEdgeAttributesToGeometry(this.geometry, this.numEdge),
        this.createArrowAttributesToGeometry(this.arrows.geometry, this.numEdge));
        var r = this.geometry.attributes;
        e.forEach(function(e, n) {
            var i = 2 * n
              , o = 2 * n + 1;
            t.points[i] = e.source.position,
            t.points[o] = e.target.position,
            e.source.position.toArray(r.position.array, 3 * i),
            e.target.position.toArray(r.position.array, 3 * o),
            e.color.toArray(r.color.array, 3 * i),
            e.color.toArray(r.color.array, 3 * o),
            r.opacity.array[i] = e.alpha,
            r.opacity.array[o] = e.alpha
        }),
        r.position.needsUpdate = !0,
        r.color.needsUpdate = !0,
        r.opacity.needsUpdate = !0,
        this.updateArrowAttribute(e)
    },
	updateArrowAttribute: function(e) {
        if (0 != e.length && this.arrows) {
            for (var t = e.length, n = 0, r = 0, i = 0, o = 0, a = 0, s = this.arrows.geometry.attributes.translation.array, u = this.arrows.geometry.attributes.rotation.array, l = this.arrows.geometry.attributes.scale.array, c = this.arrows.geometry.attributes.color.array, d = this.arrows.geometry.attributes.alpha.array, f = 0; f < t; f++) {
                var h = e[f]
                  , p = h.source.position
                  , m = h.target.position.clone().sub(p)
                  , g = this.getDirection(m.normalize())
                  , y = h.target.position.x
                  , v = h.target.position.y
                  , b = h.target.position.z;
                s[n++] = y,
                s[n++] = v,
                s[n++] = b,
                u[r++] = g.x,
                u[r++] = g.y,
                u[r++] = g.z,
                u[r++] = g.w,
                l[i++] = .002,
                l[i++] = .002,
                l[i++] = .002,
                c[o++] = h.color.r,
                c[o++] = h.color.g,
                c[o++] = h.color.b,
                d[a++] = h.alpha
            }
            var _ = this.arrows.geometry.attributes;
            this.arrows.geometry.maxInstancedCount = this._hideArrow ? 0 : t,
            _.translation && (_.translation.needsUpdate = !0),
            _.rotation && (_.rotation.needsUpdate = !0),
            _.scale && (_.scale.needsUpdate = !0),
            _.color && (_.color.needsUpdate = !0),
            _.position && (_.position.needsUpdate = !0),
            _.alpha && (_.alpha.needsUpdate = !0)
        }
    },
	getDirection: function(e) {
        var t = new THREE.Vector3
          , n = void 0
          , r = new THREE.Quaternion;
        return e.y > .99999 ? r.set(0, 0, 0, 1) : e.y < -.99999 ? r.set(1, 0, 0, 0) : (t.set(e.z, 0, -e.x).normalize(),
        n = Math.acos(e.y),
        r.setFromAxisAngle(t, n)),
        r
    },
	update: function() {
        this.updateFromGraph(this.graph.visibleEdges)
    }
};