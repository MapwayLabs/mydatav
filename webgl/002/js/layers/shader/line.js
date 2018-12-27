export const lineShader = {
    vertexShader: 
    `varying vec2 vUv;
     void main()	{
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;

     }`,
    fragmentShader: 
    `uniform float time;
     varying vec2 vUv;
     void main( void ) {
        vec3 color =  vec3(1.0,0,0.0);
        gl_FragColor = vec4(color,sin(4.5*(vUv.x*2.0 + (time*1.0))));
      }`
}