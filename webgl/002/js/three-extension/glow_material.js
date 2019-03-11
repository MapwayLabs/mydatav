const vertexShader = `
varying vec3 vNormal;
varying vec3 vPositionNormal;
void main() 
{
    vNormal = normalize( normalMatrix * normal ); // 转换到视图空间
    vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fragmentShader = `
uniform vec3 glowColor;
uniform float b;
uniform float p;
uniform float s;
varying vec3 vNormal;
varying vec3 vPositionNormal;
void main() 
{
    float a = pow( b + s * abs(dot(vNormal, vPositionNormal)), p );
    gl_FragColor = vec4( glowColor, a );
}
`
// https://zhuanlan.zhihu.com/p/38548428
THREE.GlowMaterial = function (params) {
    THREE.ShaderMaterial.call(this, {
        uniforms: {
            "s": {
                type: "f",
                value: params.s || 1.0
            },
            "b": {
                type: "f",
                value: params.b || 0
            },
            "p": {
                type: "f",
                value: params.p || 5.0
            },
            glowColor: {
                type: "c",
                value: new THREE.Color( params.color || 0xff0000 )
            }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
}

THREE.GlowMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
THREE.GlowMaterial.prototype.constructor = THREE.GlowMaterial;