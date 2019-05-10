// const N = 5000;
// var GraphData = {
//   nodes: [...Array(N).keys()].map(i => ({ id: i })),
//   links: [...Array(N).keys()]
//     .filter(id => id)
//     .map(id => ({
//       source: id,
//       target: Math.round(Math.random() * (id-1))
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