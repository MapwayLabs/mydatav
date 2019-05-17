// import * as THREE from 'three';
// import * as THREE from '../../../lib/force3d/three';

// 配置 11723
var Config = {
    currentNodesSize: undefined,
    config: {
        canRecord: false,
        // isCollaborate: /^\/collaborate/gi.test(window.location.pathname),
        // isShare: /^\/share\/[0-9a-z]{22,}\/.+/.test(window.location.pathname),
        // isDebug: /debug/gi.test(window.location.hash),
        // layoutEngine: "worker",
        // force2d: true,
        // graphDirectional: true,
        // numEdgeSize: 5,
        // edgeDegreeThreshold: [0, 2, 4, 8, 16, 1e6],
        // edgeThickness: [1, 2, 4, 8, 16, 32],
        // pageItems: 25,
        // pointerReachDistance: 4,
        nodeSizeScale: 1, //  "d3" == o.layoutEngine ? 12 : 1;
        // freezNode: true,
        edgeDefaultAlpha: .6
    },
    colors: {
        // background: 0x141822,
        // clear_alpha: 1,
        // msaaRenderPass_sample_level: 2,
        // internal: new THREE.Color(0x488ae4),
        external: new THREE.Color(0xf5a700),
        // send_only: new THREE.Color(0x7fd900),
        // receive_only: new THREE.Color(0xd0000f),
        // send_and_receive: new THREE.Color(0x225500),
        edge: new THREE.Color(0x1F3D7A),
        edge_alpha: .8
        // mouseoverHighlightNode: .85
    },
    // https://blog.csdn.net/gdp12315_gu/article/details/48351589
    // 弹簧+库仑力
    layoutControllerOptions: {
        linkStrength: 1,
        linkDistance: 0.5,
        charge: -0.01, // 斥力
        gravity: 0.2, // 引力
        friction: 0.3, // 阻尼衰减
        heightCompress: 1 //扁平度
    },
    graphLayout: {
        // force2d: true,
        // width: 1,
        // height: 1,
        // iterations: 1e4,
        // pcscale: .02,
        // attraction: 336.7,
        // repulsion: 1.45,
        // pointSize: .5,
        // lineSize: 1,
        // gravity_center: new THREE.Vector3(0,0,0),
        // gravity: .03,
        // skip: 0,
        // degreeFilter: {
        //     active: true,
        //     min: 0,
        //     max: 100,
        //     from: 0,
        //     to: 100
        // },
        // edgeBundle: {
        //     stepSize: {
        //         name: "Step Size",
        //         min: 0,
        //         max: 1,
        //         defaultValue: .2,
        //         step: .01
        //     },
        //     compatibilityThreshold: {
        //         name: "Compatibility Threshold",
        //         min: 0,
        //         max: 1,
        //         defaultValue: .4,
        //         step: .01
        //     }
        // },
        genNodesReportFunc: null,
        getNodeKeysMap: null,
        // updateGraphNodeWithIds: null,
        // updateGraphNodeHighlightWithId: null,
        genEdgesReportFunc: null,
        getEdgeKeysMap: null
        // updateGraphEdgeWithIds: null,
        // updateGraphEdgeHighlightWithId: null
    }
};

// export default Config;