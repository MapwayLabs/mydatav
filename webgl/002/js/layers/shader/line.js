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
      uniform float spotSize;

      varying vec4 v_Color;
      varying float v_Percent;
      // varying float v_SpotPercent;

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
         // v_SpotPercent = spotSize / distAll;
      }`,
   fragmentShader: `            
      uniform vec4 baseColor;
      // uniform float spotIntensity;
      varying vec4 v_Color;
      varying float v_Percent;
      // varying float v_SpotPercent;

      void main( void ) {
        if (v_Percent > 1.0 || v_Percent < 0.0) {
            discard;
        }
        float fade = v_Percent;

      #ifdef SRGB_DECODE
         gl_FragColor = sRGBToLinear(baseColor * v_Color);
      #else
         gl_FragColor = baseColor * v_Color;
      #endif
   
      //   if (v_Percent > (1.0 - v_SpotPercent)) {
      //       gl_FragColor.rgb *= spotIntensity;
      //   }
        gl_FragColor.a *= fade;
      }`
}