export const lineShader = {
   vertexShader: `
      attribute float dist;
      attribute float distAll;
      attribute float start;
      attribute vec4 colors;

      uniform float speed;
      uniform float trailLength;
      uniform float time;
      uniform float period;

      varying vec4 v_Color;
      varying float v_Percent;

      void main()	{
         vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
         gl_Position = projectionMatrix * mvPosition;
            
         #ifdef CONSTANT_SPEED
            float t = mod((speed * time + start) / distAll, 1. + trailLength) - trailLength;
         #else
            float t = mod((time + start) / period, 1. + trailLength) - trailLength;
         #endif
         
         float trailLen = distAll * trailLength;
         v_Percent = (dist - t * distAll) / trailLen;
         v_Color = colors;
      }`,
   fragmentShader: `            
      uniform vec4 baseColor;
      varying vec4 v_Color;
      varying float v_Percent;

      void main( void ) {
        if (v_Percent > 1.0 || v_Percent < 0.0) {
            discard;
        }
        gl_FragColor = baseColor * v_Color;
        gl_FragColor.a *= v_Percent;
      }`
}