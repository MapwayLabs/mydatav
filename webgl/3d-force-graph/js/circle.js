// https://blog.csdn.net/menjiawan/article/details/43021507
// 三维空间圆的参数方程，已知圆心、半径、法向量
var Circle  = function(x, y, z, radius, nx, ny, nz) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.nx = nx;
    this.ny = ny;
    this.nz = nz;
    
    var n = { x: nx, y: ny, z: nz };
    var u = ( n.x !== 0 || n.y !== 0 ) ? { x: n.y, y: -n.x, z: 0 } : { x: 1, y: 1, z: 0 };
    var v = { x: n.y * u.z - n.z * u.y, y: n.z * u.x - n.x * u.z, z: n.x * u.y - n.y * u.x };
    var m_u = Math.sqrt(u.x * u.x + u.y * u.y + u.z * u.z);
    var m_v = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    var unit_u = { x: u.x / m_u, y: u.y / m_u, z: u.z / m_u };
    var unit_v = { x: v.x / m_v, y: v.y / m_v, z: v.z / m_v };

    function degToRad(deg) {
        return deg * ( Math.PI / 180 );
    }

    function radToDeg(rad) {
        return rad * ( 180 / Math.PI );
    }

    this.getPoint = function(e) {
        e = degToRad(e);
        return {
            x: this.x + this.radius * ( unit_u.x * Math.cos(e) + unit_v.x * Math.sin(e) ),
            y: this.y + this.radius * ( unit_u.y * Math.cos(e) + unit_v.y * Math.sin(e) ),
            z: this.z + this.radius * ( unit_u.z * Math.cos(e) + unit_v.z * Math.sin(e) )
        }
    }
}
