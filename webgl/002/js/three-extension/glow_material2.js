const vertexShader = `
uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;
void main() 
{
    vec3 vNormal = normalize( normalMatrix * normal );
	vec3 vNormel = normalize( normalMatrix * viewVector );
	intensity = pow( c - dot(vNormal, vNormel), p );
	
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fragmentShader = `
uniform vec3 glowColor;
varying float intensity;
void main() 
{
	vec3 glow = glowColor * intensity;
    gl_FragColor = vec4( glow, 1.0 );
}
`
// https://zhuanlan.zhihu.com/p/38548428
THREE.GlowMaterial = function (params, camera) {
    THREE.ShaderMaterial.call(this, {
	    uniforms: 
		{ 
			"c":   { type: "f", value: params.c || 1.0 },
			"p":   { type: "f", value: params.p || 1.4 },
			glowColor: { type: "c", value: new THREE.Color( params.color || 0xffff00) },
			viewVector: { type: "v3", value: camera.position }
		},
		side: THREE.FrontSide,
		blending: THREE.AdditiveBlending,
		transparent: true,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
}

THREE.GlowMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
THREE.GlowMaterial.prototype.constructor = THREE.GlowMaterial;