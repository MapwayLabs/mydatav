function addPoint (point) {
    var geometry = new THREE.CircleBufferGeometry( 4, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var circle = new THREE.Mesh( geometry, material );
    // circle.renderOrder = 199;
    // circle.material.depthTest = false;
    circle.position.set(...point);
    this._scene.add( circle );
}
function addDiv(screenPoint) {
    var div = document.createElement('div');
    div.style = "position: absolute; width: 14px; height: 14px; border-radius: 50%; background: #0f0;z-index: 9999;";
    div.style.left = screenPoint[0] + 'px';
    div.style.top = screenPoint[1] + 'px';
    div.title = '屏幕中心点';
    document.body.appendChild(div);
}

// just a test function 画坐标轴
drawAxis(scene, len) {
    if (len === undefined) {
        len = 100;
    }
    // x 轴
    var xline_geom = new THREE.Geometry();
    xline_geom.vertices.push(new THREE.Vector3(0, 0, 0));
    xline_geom.vertices.push(new THREE.Vector3(len, 0, 0));
    var xline_material = new THREE.LineBasicMaterial({
        color: 0xff0000
    });
    var xline = new THREE.Line(xline_geom, xline_material);
    scene.add(xline);

    // y 轴
    var yline_geom = new THREE.Geometry();
    yline_geom.vertices.push(new THREE.Vector3(0, 0, 0));
    yline_geom.vertices.push(new THREE.Vector3(0, len, 0));
    var yline_material = new THREE.LineBasicMaterial({
        color: 0x00ff00
    });
    var yline = new THREE.Line(yline_geom, yline_material);
    scene.add(yline);

    // z 轴
    var zline_geom = new THREE.Geometry();
    zline_geom.vertices.push(new THREE.Vector3(0, 0, 0));
    zline_geom.vertices.push(new THREE.Vector3(0, 0, len));
    var zline_material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });
    var zline = new THREE.Line(zline_geom, zline_material);
    scene.add(zline);
}