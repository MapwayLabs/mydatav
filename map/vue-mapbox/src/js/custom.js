import arcData from '../data/arc-layer.json';
import mapboxgl from '../../node_modules/mapbox-gl/dist/mapbox-gl-unminified';

// https://docs.mapbox.com/mapbox-gl-js/example/custom-style-layer/

class ArcLayer {

    constructor() {
        this.id = 'arc-layer';
        this.type = 'custom';
        this.renderingMode = '3d';
    }

    onAdd(map, gl) {
        var vertexSource = "" +
        "uniform mat4 u_matrix;" +
        "attribute vec2 a_pos;" +
        "void main() {" +
        "    gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);" +
        "}";
         
        var fragmentSource = "" +
        "void main() {" +
        "    gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);" +
        "}";
         
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexSource);
        gl.compileShader(vertexShader);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentSource);
        gl.compileShader(fragmentShader);
         
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
         
        this.aPos = gl.getAttribLocation(this.program, "a_pos");
         
        var helsinki = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 25.004, lat: 60.239 });
        var berlin = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 13.403, lat: 52.562 });
        var kyiv = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 30.498, lat: 50.541 });
         
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        helsinki.x, helsinki.y,
        berlin.x, berlin.y,
        kyiv.x, kyiv.y,
        ]), gl.STATIC_DRAW);
    }

    onRemove(map, gl) {}

    render(gl, matrix) {
        gl.useProgram(this.program);
        gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "u_matrix"), false, matrix);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.enableVertexAttribArray(this.aPos);
        gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
    }
}

export default function addArcLayer(map) {
    map.addLayer(new ArcLayer(), 'building');
    map.on('click', e => {
        console.log('click', e);
    });
    requestAnimationFrame(e => {
        map.setCenter([26.004,52.239]);
    });
}