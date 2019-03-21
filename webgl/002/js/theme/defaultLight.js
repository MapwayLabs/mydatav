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
            fontSize: '12px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#383838',
            textAlign: 'left',
            textBaseline: 'middle',
            labelPointStyle: {
                show: true, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 6, // 标注点半径
                color: '#383838' // 标注点颜色，可以是 hexString、rgb、rgba
            }
        },
        nullTextStyle: {
            fontSize: '12px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#383838',
            textAlign: 'left',
            textBaseline: 'middle',
            labelPointStyle: {
                show: true, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 6, // 标注点半径
                color: '#383838' // 标注点颜色，可以是 hexString、rgb、rgba
            }
        }
    },
    areaMaterial: { // 面材质配置
        color: '#ebf8ff'
    },
    extrudeMaterial: {
        color: '#00a2ff',
        opacity: 1,
        textureSrc: '/static/images/light_edge.png'
    },
    outline: {
        normal: {
            show: true,
            color: '#0086ff',
            width: 6,
            opacity: 0.8
        }
    }
};