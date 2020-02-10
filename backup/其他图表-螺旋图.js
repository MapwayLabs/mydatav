// 将压缩包中的xxx.js文件后上传到内网服务器，再将这个url替换成内网的地址
var chartUrl = 'https://gw.alipayobjects.com/as/g/datavis/g2/2.3.9/index.js';

var theme = chart.theme || 'default';
var wordFill = '3c3c3c';
if (theme === 'dark') {
    wordFill = '#fff';
}
var setting = {
    height: getCustomChartHeight() || 400, // 高度
    value: chart.views[0].data.y[0].nick_name || chart.views[0].data.y[0].name, // 数据以及显示的值
    mask: 'yyyy年mm月dd日', // 日期格式
    color: '#F7CB4A-#F35352', // 颜色值范围，从小到大
    wordFill: wordFill
};
var views = chart.views;
// 没有维度
if (views[0].data.x.length === 0) {
    // alert('必须包含维度值吧？！');
    return;
}
// 维度值不为时间
if (views[0].data.x[0]['data_type'] !== 'date') {
    // alert('维度值必须为时间！');
    return;
}
// 必须包含数值
if (views[0].data.y.length === 0) {
    // alert('必须包含数值值吧？！');
    return;
}
var chartDate = views[0].data.x[0].source_data;
var chartData = views[0].data.y[0].data;
var dataTemp = [];
chartDate.forEach(function(item, index) {
    var num = chartData[index];
    var value = setting.value;
    var json = {
      time: item
    };
    json[value] = +num;
    dataTemp.push(json);
});
// 从小到大排序
dataTemp.sort(function(a, b) {
    return a.time - b.time;
});

thirdPluginLoader({
    libSrc: chartUrl,
    initFun: myChartCode
}, { funcQueue: [] });

function myChartCode() {
    var chart = new G2.Chart({
        container: document.getElementsByClassName('chart')[0],
        forceFit: true,
        height: setting.height
    });
   var json = {
       'time': {
            type: 'timeCat',
            mask: setting.mask
        }
   };
   json[setting.value] = {
            min: 0
    };
    chart.source(dataTemp, json);
    chart.coord('helix', {
        startAngle: 0.5 * Math.PI,
        endAngle: 12.5 * Math.PI
    });
    chart.axis('time', {
        line: null
    });
    chart.legend({
        title: {
            fill: setting.wordFill
        },
        itemWrap: true,
        word: {
            fill: setting.wordFill
        }
    });
    chart.interval().position('time*' + setting.value).color(setting.value, setting.color).size(0.45);
    chart.render();
}
function getCustomChartHeight() {
    return Math.max(chart.$elem.height()*0.8, 400);
}