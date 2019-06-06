// const N = 100;
// var GraphData = {
//   nodes: [...Array(N).keys()].map(i => ({ id: i })),
//   links: [...Array(N).keys()]
//     .filter(id => id)
//     .map(id => ({
//       source: id,
//       // target: Math.round(Math.random() * (id-1))
//       target: 0
//     }))
// };
var force3d = new Force3D(document.getElementById('canvas-renderContainer'), {
    data: GraphData,
    size: [window.innerWidth, window.innerHeight]
});
var g = force3d.drawing.graph2DControl;
var clickHandler = function(type) {
    switch(type){
        case 'top': g.moveUp(-.05);break;
        case 'left': g.moveLeft(.05);break;
        case 'reset': g.reset();break;
        case 'right': g.moveRight(-.05);break;
        case 'bottom': g.moveDown(.05);break;
        case 'turnLeft': g.rotateAroundSelectedNode(.05);break;
        case 'turnRight': g.rotateAroundSelectedNode(-.05);break;
        case 'near': g.moveForward(.05);break;
        case 'far': g.moveBackward(-.05);break;
        case 'expand': force3d.expandSelectedNodesAction();break;
        case 'delete': force3d.deleteSelectedNodes();break;
        case 'flyTo': force3d.flyTo();break;
        case 'inverse': force3d.inverseSelection();break;
    }
}

var menuData = [
    { id: '1', icon: 'p1', name: '关系扩展', submenus: [
        { id: '1-1', icon: 'bio-01', name: '相关人' },
        { id: '1-2', icon: 'bio-02', name: '组合扩展' },
        { id: '1-3', icon: 'bio-03', name: '相关物' }
    ] },
    { id: '2', icon: 'p2', name: '关系收回', submenus: [
        { id: '2-1', icon: 'bio-01', name: '一键收回' },
        { id: '2-2', icon: 'bio-02', name: '相关人' },
        { id: '2-3', icon: 'bio-03', name: '相关物' }
    ] },
    { id: '3', icon: 'p3', name: '关联实体', submenus: [
        { id: '3-1', icon: 'bio-01', name: '人物' },
        { id: '3-2', icon: 'bio-02', name: '物品' },
        { id: '3-3', icon: 'bio-03', name: '地点' },
        { id: '3-4', icon: 'bio-04', name: '虚拟身份' },
        { id: '3-5', icon: 'bio-05', name: '机构' }
    ] },
    { id: '4', icon: 'p4', name: '查看gis', submenus: null },
    { id: '5', icon: 'p5', name: '删除已选', submenus: null },
    { id: '6', icon: 'p6', name: '保留已选', submenus: null },
    { id: '7', icon: 'p7', name: '关系推演', submenus: null },
    // { id: '6', icon: 'p7', name: '节点选择', submenus: [
    //     { id: '6-1', icon: '', name: '一层节点' },
    //     { id: '6-2', icon: '', name: '两层节点' },
    //     { id: '6-3', icon: '', name: '全部节点' }
    // ] },
    { id: '8', icon: 'p8', name: '一键扩展', submenus: null },
];
// window.ringMenuInstance = new RingMenu(document.getElementById('canvas-renderContainer'), menuData);
// document.addEventListener('contextmenu', e => {
//     e.preventDefault();
//     m.open(e.clientX, e.clientY);
// });