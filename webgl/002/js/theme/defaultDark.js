export const mapOptions = {
    bgColor: null,
    light: {
        main: {
            color: '#E6E8EA',
            intensity: 0.8
        },
        ambient: {
            color: '#E6E8EA',
            intensity: 0.6
        }
    },
    bloom: {
        show: false
    }
};

export const geojsonLayerOptions = {
    areaText: {
        offset: 0.1,
        textStyle: {
            fontSize: '10px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#fff',
            textAlign: 'left',
            textBaseline: 'middle',
            labelPointStyle: {
                show: true, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 3, // 标注点半径
                color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
            }
        },
        nullTextStyle: {
            fontSize: '10px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#fff',
            textAlign: 'left',
            textBaseline: 'middle',
            labelPointStyle: {
                show: true, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 3, // 标注点半径
                color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
            }
        }
    },
    areaMaterial: { // 面材质配置
        color: '#142b77'
    },
    extrudeMaterial: {
        color: '#0086FF',
        opacity: 1,
        textureSrc: '/static/images/dark_edge.png'
    },
    outline: {
        normal: {
            show: true,
            color: '#3ca0f7',
            width: 3,
            opacity: 1
        }
    }
};
