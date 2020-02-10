
// 将压缩包中的echarts.all.min.js文件后上传到内网服务器，再将这个url替换成内网的地址
var echartsUrl = chart.info.resourceUrl[0];
// 配置
var custom_setting = chart.info.meta.custom_chart_setting;
var chart_setting = custom_setting.charSetting;
var setting = {
    name: chart.views[0].data.y[0].nick_name || chart.views[0].data.y[0].name,
    //name: chart_setting.text, // 根节点名称
    color: chart_setting.topBubbleColor || '#ddb926',// 小圆点颜色
    hoverColor: chart_setting.bubbleColor || '#f4e925', // 放大气泡颜色
    backgroundColor: '#404a59', // 北京颜色
    text: chart_setting.title1, //主标题
    subtext: chart_setting.title2, // 副标题
    top: {
        max: chart_setting.topNum || 100, // 前100
        text: chart_setting.topText // 前60文字
    }
};
var option, myChart, app = {};
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
var views = chart.views;
// 没有维度
// if (views[0].data.x.length === 0) {
    // alert('必须包含维度值吧？！');
    // return;
// }
// 维度值不为时间
//  if (views[0].data.x[0]['data_type'] !== 'date') {
//     alert('维度值必须为时间！');
//     return;
// }
// 必须包含数值
// if (views[0].data.y.length === 0) {
//     alert('必须包含数值值吧？！');
//     return;
// }
var chartDate = views[0].data.x[0].source_data;
var chartData = views[0].data.y[0].data;
var dataTemp = [];
chartDate.forEach(function(item, index) {
    var num = chartData[index];
    num = parseInt(num < 0 ? 0 : num);
    dataTemp.push([item, num]);
});
// 从小到大排序
dataTemp.sort(function(a, b){
    return a[0] - b[0];
});
dataTemp.forEach(function(item, index) {
    item[0] = new Date(item[0]).format('yyyy-MM-dd');
});

var calendarEffectscatter = {
    /**
     * [sliceData]            将时间分割成每一年
     * @param  {Object} data [需要处理的数据]
     * @return {Object}      [返回处理好的数据]
     */
    sliceData: function(data) {
        var me = this;
        var dataLen = data.length;
        if (dataLen === 0) {
            return [];
        }
        // 最小日期
        var minDate = data[0][0];
        // 最小年
        var minYear = Number(minDate.split('-')[0]);
        var yearArr = [minYear];
        // 默认最大年为最小年
        var maxYear = minYear;
        var dataArr = [];
        var tempIndex = 0;
        data.forEach(function(item, index) {
            var date = item[0];
            var year = Number(date.split('-')[0]);
            if (year !== yearArr[yearArr.length - 1]) {
                yearArr.push(year);
                tempIndex++;
            }
            if (!dataArr[tempIndex]) {
                dataArr[tempIndex] = [];
            }
            dataArr[tempIndex].push(item);
        });
        var dataArrTemp = [];
        // 给每年的前后添加空元素
        dataArr.forEach(function(item, index) {
            dataArrTemp.push(me.addNull(item));
        });
        dataArr = dataArrTemp;
        var maxValue = calendarEffectscatter.getMaxValue(dataTemp);
        chartData = {
            data: [
                {
                    name: setting.name,
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    data: dataArr[0],
                    symbolSize: function (val) {
                        return val[1] / (maxValue / 16);
                    },
                    itemStyle: {
                        normal: {
                            color: setting.color
                        }
                    }
                },
                {
                    name: setting.name,
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    calendarIndex: 1,
                    data: dataArr[0],
                    symbolSize: function (val) {
                        return val[1] / (maxValue / 16);
                    },
                    itemStyle: {
                        normal: {
                            color: setting.color
                        }
                    }
                },
                {
                    name: setting.top.text,
                    type: 'effectScatter',
                    coordinateSystem: 'calendar',
                    calendarIndex: 1,
                    data: data.sort(function (a, b) {
                        return b[1] - a[1];
                    }).slice(0, setting.top.max),
                    symbolSize: function (val) {
                        return val[1] / (maxValue / 16);
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    itemStyle: {
                        normal: {
                            color: setting.hoverColor,
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                },
                {
                    name: setting.top.text,
                    type: 'effectScatter',
                    coordinateSystem: 'calendar',
                    data: data.sort(function (a, b) {
                        return b[1] - a[1];
                    }).slice(0, setting.top.max),
                    symbolSize: function (val) {
                        return val[1] / (maxValue / 16);
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    itemStyle: {
                        normal: {
                            color: setting.hoverColor,
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }
            ],
            calendar: [
                {
                    top: 100,
                    left: 'center',
                    range: [yearArr[0] + '-01-01', yearArr[0] + '-06-30'],
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#000',
                            width: 4,
                            type: 'solid'
                        }
                    },
                    yearLabel: {
                        formatter: '{start}  1st',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#323c48',
                            borderWidth: 1,
                            borderColor: '#111'
                        }
                    }
                },
                {
                    top: 300,
                    left: 'center',
                    range: [yearArr[0] + '-07-01', yearArr[0] + '-12-31'],
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#000',
                            width: 4,
                            type: 'solid'
                        }
                    },
                    yearLabel: {
                        formatter: '{start}  2nd',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#323c48',
                            borderWidth: 1,
                            borderColor: '#111'
                        }
                    }
                }
            ]
        }
        return chartData;
    },

    /**
     * [addNull]             给时间添加缺失的日期
     * @param {Object} data [需要处理的数据]
     * @return {Object}      [返回处理好的数据]
     */
    addNull: function(data) {
        var len = data.length;
        var minDate = data[0][0];
        var maxDate = data[len - 1][0];
        var year = minDate.split('-')[0];
        // 当年第一天
        var firstDate = year + '-01-01'
        var firstDateTimestamp = new Date(firstDate);
        // 当年最后一天
        var lastDate = year + '-12-31'
        var lastDateTimestamp = new Date(lastDate);
        // 最小日期时间戳
        var minDateTimestamp = new Date(minDate);
        // 最大日期时间戳
        var maxDateTimestamp = new Date(maxDate);
        // 如果最小日期不是当年第一天则添加之前的日期
        if (minDateTimestamp > firstDateTimestamp) {
            data = this.addLeftDateData(data, firstDate, minDate).concat(data);
        }
        // 如果最大日期不是当年最后一天则添加之后的日期
        if (maxDateTimestamp < lastDateTimestamp) {
            data = data.concat(this.addRightDateData(data, maxDate, lastDate));
        }
        return data;
    },

    /**
     * [addLeftDateData]      向前补全日期
     * @param {Object} data  [需要处理的数据]
     * @param {String} start [开始日期]
     * @param {String} end   [结束日期]
     * @return {Object}      [返回处理好的数据]
     */
    addLeftDateData: function(data, start, end) {
        return this.getSectionDate(start, end);
    },

    /**
     * [addLeftDateData]      向前补全日期
     * @param {Object} data  [需要处理的数据]
     * @param {String} start [开始日期]
     * @param {String} end   [结束日期]
     * @return {Object}      [返回处理好的数据]
     */
    addRightDateData: function(data, start, end) {
        return this.getSectionDate(start, end);
    },

    /**
     * [getSectionDate]        获取指定两个日期之间的所有日期
     * @param {String} start [开始日期]
     * @param {String} end   [结束日期]
     * @return {Object}      [返回处理好的数据]
     */
    getSectionDate: function(start, end) {
        var bd = new Date(start);
        var be = new Date(end);  
        var bdTime = bd.getTime();
        var beTime = be.getTime();
        var timeDiff = beTime - bdTime;  
        var arr = [];  
        for(var i = 0; i <= timeDiff; i += 86400000){
            var ds = new Date(bdTime + i);
            var year = ds.getFullYear();
            var month = (ds.getMonth() + 1).toString().length == 1 ? '0' + (ds.getMonth() + 1).toString(): (ds.getMonth() + 1).toString();
            var day = ds.getDate().toString().length == 1 ? '0' + ds.getDate(): ds.getDate();
            arr.push([year + '-' + month + '-' + day, '']);
        }
        return arr;
    },

    /**
     * [getMaxValue]          获取最大的值
     * @param  {Obkect} data [源数据]
     * @return {Number}      [返回最大的值]
     */
    getMaxValue: function(data) {
        if (data.length === 0) {
            return 0;
        }
        data.sort(function(a, b) {
            return a[1] - b[1]
        });
        return Number(data[data.length - 1][1]);
    }
};
var chartData = calendarEffectscatter.sliceData(dataTemp);
thirdPluginLoader({
  libSrc: echartsUrl,
    initFun: function() {
      $('#custom-chart').css({
        'padding-right': '20px',
        'height': 180*chartData.calendar.length + 120
      });
      myChart = echarts.init(chart.$elem.get(0));
      echartsCode();
      myChart.setOption(option);
      $('#custom-chart').css({
        'height': '100%',
        'overflow-y': 'auto'
      });
    }
}, {funcQueue: []});
function echartsCode() {
    var seriesData = chartData.data;
    var len = seriesData.length;
    option = {
        backgroundColor: setting.backgroundColor,
        title: {
            top: 30,
            text: setting.text,
            subtext: setting.subtext,
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip : {
            trigger: 'item'
        },
        legend: {
            top: '30',
            left: '100',
            data:[setting.name, setting.top.text],
            textStyle: {
                color: '#fff'
            }
        },
        calendar: chartData.calendar,
        series : seriesData
    };
}