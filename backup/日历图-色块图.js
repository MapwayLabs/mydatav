// 将压缩包中的s文件后上传到内网服务器，再将这个url替换成内网的地址
var g2Url = chart.info.resourceUrl[0];
var option = {};
var theme = chart.theme;
theme = theme === 'default' ? 'light' : theme;
var height = $(chart.$elem).height();
var setting = {
    light: {
        textColor: 'rgba(10,18,32,.64)'
    },
    dark: {
        textColor: '#fff'
    }
};
Date.prototype.format = function(format) {
    var o = {
        'M+' : this.getMonth() + 1, //month
        'd+' : this.getDate(), //day
        'h+' : this.getHours(), //hour
        'm+' : this.getMinutes(), //minute
        's+' : this.getSeconds(), //second
        'q+' : Math.floor((this.getMonth()+3)/3), //quarter
        'S' : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4- RegExp.$1.length));
        for (var k in o) {
            if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        return format;
    }
}
thirdPluginLoader({
    libSrc: g2Url,
    initFun: function() {
        g2Code();
        $('#custom-chart').css({
            'overflow-y': 'auto'
        });
    }
}, { funcQueue: [] });

function g2Code() {
    var data = packageData();
    var axisName = getName();
    var chart = new G2.Chart({
        id: 'custom-chart',
        forceFit: true,
        height: height,
        plotCfg: {
            margin: [20, 80, 120, 80]
        }
    });
    var obj = {};
    obj[axisName.xName] = {
        type: 'cat',
        tickCount: 8 // 设置坐标轴刻度线个数
    };
    obj[axisName.x1Name] = {
        type: 'cat'
    };
    chart.source(data, obj);
    chart.axis(axisName.xName, {
        formatter: function(val) {
            return val;
        },
        labels: {
            label: {
                fill: setting[theme].textColor, // 文本的颜色
                rotate: 10
            }
        },
        title: {
            fill: setting[theme].textColor,
            text: ''
        }
    });
    chart.axis(axisName.x1Name, {
        formatter: function(val) {
            return val;
        },
        labels: {
            label: {
                fill: setting[theme].textColor, // 文本的颜色
                rotate: 0
            }
        },
        title: {
            fill: setting[theme].textColor
        }
    });
    // 右侧浮标字颜色
    chart.legend({
        title: {
            fill: setting[theme].textColor
        },
        word: {
            fill: setting[theme].textColor
        },
    });
    chart.polygon().position(axisName.xName + '*' + axisName.x1Name).color(axisName.yName, '#3060cf-#fffbbc-#c4463a');
    chart.render();
}
function getName() {
    var chartData = chart.views[0].data;
    var x0 = chartData.x[0];
    var x0Name = x0.nick_name || x0.name;
    var x1 = chartData.x[1];
    var x1Name = x1.nick_name || x1.name;
    var y = chartData.y[0];
    var yName = y.nick_name || y.name;
    return {
        xName: x0Name,
        x1Name: x1Name,
        yName: yName
    };
}

function packageData() {
    var chartData = chart.views[0].data;
    var x0 = chartData.x[0];
    var x0Data = x0.data;
    var x0Name = x0.nick_name || x0.name;
    var x1 = chartData.x[1];
    var x1Data = x1.data
    var x1Name = x1.nick_name || x1.name;
    // var x2 = chartData.x[2];
    // var x2Data = x2.data
    var y = chartData.y[0];
    var yData = y.data
    var yName = y.nick_name || y.name;
    var data = [];
    x0Data.forEach(function(item, index) {
        var json = {};
        json[x0Name] = item;
        json[x1Name] = x1Data[index];
        json[yName] = +yData[index];
        data.push(json);
    });
    return data;
}