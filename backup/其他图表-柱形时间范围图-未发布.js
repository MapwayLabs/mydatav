var init = function() {
  var charSetting = chart.info.meta.custom_chart_setting.charSetting;
  	var theme = chart.theme;
    theme = theme === 'default' ? 'light' : theme;
    var setting = {
        light: {
            textColor: '#333',
            background: '#fff'
        },
        dark: {
            textColor: '#fff',
            background: 'rgba(36, 39, 62, .6)'
        },
        fillColor: 'rgb(244,91,91)'
    };
    var handleStyle = function() {
      var styleStr = ".highcharts-background {\
          	fill: " + setting[theme].background + ";\
        }\
        .highcharts-title,\
        .highcharts-xaxis-labels text,\
        .highcharts-yaxis-labels text,\
        .highcharts-yaxis text {\
            color: " + setting[theme].textColor + "!important;\
		    fill: " + setting[theme].textColor + "!important;\
        }\
       .highcharts-point {\
           fill: " + setting.fillColor + ";\
	   };"
        if (!$("style#chart-style").length) {
          	$("head").append("<style id='chart-style'>" + styleStr + "</style>");
        }
    }
    handleStyle();
    var option = {
        chart: {
            type: 'columnrange',
            inverted: true
        },
        title: {
            text: charSetting.title
        },
        subtitle: {
            text: ''
        },
        credits: { 
            enabled: false //不显示LOGO 
        },
        xAxis: {
            categories: chart.views[0].data.x[0].data
        },
        yAxis: {
            title: {
                text: '小时.分'
            }
        },
        tooltip: {
             useHTML: true,
              formatter: function() {
                var content = this.key + "<br>开门时间: " + this.point.low + "<br>关门时间: " + this.point.high;
                return '<div class="tooltip-content">' + content + '</div>';
              }

        },
        plotOptions: {
            columnrange: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.y;
                    }
                }
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: '时间',
            data: getData()
        }]
    }
    function toDecimal2(x) { 
      var f = parseFloat(x); 
      if (isNaN(f)) { 
        return false; 
      } 
      var f = Math.round(x*100)/100; 
      var s = f.toString(); 
      var rs = s.indexOf('.'); 
      if (rs < 0) { 
        rs = s.length; 
        s += '.'; 
      } 
      while (s.length <= rs + 2) { 
        s += '0'; 
      } 
      return s; 
    } 
    function getData() {
        var data = [];
        chart.views[0].data.x[1].data.forEach(function(item, index){
             data.push([+(toDecimal2(+item)),  +toDecimal2(+chart.views[0].data.x[2].data[index])]);
        });
        return data;
    }
    Highcharts.chart(chart.$elem[0], option);
 }

thirdPluginLoader({
  	libSrc: chart.info.resourceUrl[0],
	initFun: init
});