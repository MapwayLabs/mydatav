
var config = {
  resource: [
      'https://www.bdp.cn/api/chart_resource/get?re_id=re_13ff3a4ff04920f77a6ac2d2984a8e62',
      'https://www.bdp.cn/api/chart_resource/get?re_id=re_7ea31590f7cb61210de7bf84d3e2e927'
  ],
  color: {
      light: {
          text: 'rgba(10,18,32,.64)'
      },
      dark: {
          text: '#fff'
      }
  },
  init: function() {
      var BoxplotChart = getChartDirective();
      var myChart = new BoxplotChart(chart, config);
      myChart.draw();
  }
}

bdp.loadjs({
  src: ['https://cdn.bootcss.com/babel-polyfill/6.26.0/polyfill.min.js'].concat(config.resource[0]),
  callback: function() {
      bdp.loadjs({
          src: config.resource[1],
          callback: config.init
      });
  },
});

function getChartDirective() {
  // 获得自定义图表的相关信息，快速获取
  class CustomChart {
      constructor(chartInstant = chart) {
          this.originInfo = chartInstant;
          this.container = document.getElementById('custom-chart');
          this.wrapHeight = window.innerHeight,
              this.isMobile = !this._isPC();
      }

      async loadResource() {
          if (this.resource.length === 0) {
              return true;
          } else {
              await new Promise((resolve, reject) => {
                  bdp.loadjs({
                      callback: () => resolve(),
                      src: this.resource, //或者是一个数组: ['a.js', 'b.js', __uri('/static/js/lib/mapv/mapv.min.js')]
                  });
              });
          }
      }

      _isPC() {
          var userAgentInfo = navigator.userAgent;
          var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
          var flag = true;
          for (var v = 0; v < Agents.length; v++) {
              if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
          }
          return flag;
      }
  }

  class BoxplotChart extends CustomChart {
      constructor(apiData = chart, config = {}) {
          super(apiData);

          this.apiData = apiData;
          this.config = config;
          this.chartOption = this._getChartOption();
          this.chart = echarts.init(chart.$elem.get(0));
      }

      setConfig(config) {
          Object.assign(this.config, config);
          this.chartOption = this._getChartOption();
      }

      draw() {
          this.chart.setOption(this.chartOption);
      }

      _getChartOption() {
          let theme = this.apiData.theme === 'default'? 'light' : this.apiData.theme;
          let fontColor = config.color[theme].text;
          // let chartTitle = this.apiData.info.meta.custom_chart_setting.charSetting.chartTitle;
          // let yAxisName = this.apiData.info.meta.custom_chart_setting.charSetting.yTitle;
          let chartTitle = this.apiData.chartInfo.name;
          let yAxisName = this.apiData.views[0].info.y[0].name;
          let xAxisData = this._getXaxisData();
          let yAxisData = this._getYaxisData();
          let seriesData = this._getSeriesData(yAxisData);
          let chartOption = {
              title: [
                  {
                      text: chartTitle,
                      left: 'center',
                      top: 20,
                      textStyle: {
                          color: fontColor
                      }
                  }
              ],
              tooltip: {
                  trigger: 'item',
                  axisPointer: {
                      type: 'shadow'
                  }
              },
              grid: {
                  left: '10%',
                  right: '10%',
                  bottom: '15%'
              },
              xAxis: {
                  type: 'category',
                  data: xAxisData.map( (item) => item.name ),
                  boundaryGap: true,
                  nameGap: 30,
                  splitArea: {
                      show: true
                  },
                  axisLabel: {
                      formatter: '{value}',
                      color: fontColor
                  },
                  splitLine: {
                      show: true
                  }
              },
              yAxis: {
                  type: 'value',
                  name: yAxisName,
                  nameTextStyle: {
                      color: fontColor
                  },
                  splitArea: {
                      show: true,
                      color: fontColor
                  },
                  axisLabel: {
                      color: fontColor
                  },
              },
              series: seriesData
          };
          return chartOption;
      }

      /**
       * [getYAxisData]  获取Y轴值
       * @return {Array} 返回组装好的Y轴信息
       */
      _getYaxisData(xAxisData = this._getXaxisData()) {
          let yData = this.apiData.views[0].data.y;
          let yAxisData = [];
          yData.forEach(function(item, index){
              item.data = item.data.map(function(ys, si) {
                  return +ys;
              });
              yAxisData.push({
                  name: item.nick_name || item.name,
                  data: xAxisData.map( (xs, xi) => item.data.slice(xs.start, xs.end) )
              });
          });
          return yAxisData;
      }

      /**
       * [getXAxisData]  获取x轴信息
       * @return {[Array]} 返回组装好的x轴信息
       */
      _getXaxisData() {
          var xData = this.apiData.views[0].data.x[0].data;
          var xAxisData = [];
          // 开始元素
          var start;
          for (let i = 0, len = xData.length; i < len; i++) {
              if (xData[i] !== start) {
                  start = xData[i];
                  xAxisData.push({
                      name: start,
                      start: i,
                      end: i + 1,
                  });
              }else {
                  xAxisData[xAxisData.length - 1]['end'] = i + 1;
              }
          }
          return xAxisData;
      }

      _getSeriesData(yAxisData = this._getYaxisData()) {
          let data = [];
          let seriesData = [];
          yAxisData.forEach(function(item, index) {
              data.push(echarts.dataTool.prepareBoxplotData(item.data));
              data[index]['name'] = item.name;
          });
          data.forEach(function(item, index) {
              seriesData.push({
                  name: item.name,
                  type: 'boxplot',
                  data: item.boxData,
                  tooltip: {
                      formatter: function(param) {
                          return [
                              param.name + ': ' + item.name,
                              '上边缘: ' + param.data[4],
                              '上四分位数: ' + param.data[3],
                              '中位数: ' + param.data[2],
                              '下四分位数: ' + param.data[1],
                              '下边缘: ' + param.data[0]
                          ].join('<br/>')
                      }
                  }
              });
              seriesData.push({
                  name: item.name,
                  type: 'pictorialBar',
                  symbolPosition: 'end',
                  symbolSize: 8,
                  barGap: '30%',
                  data: item.outliers,
                  tooltip: {
                      formatter: function(param) {
                        var yAxisDataTemp = yAxisData[0].data[param.data[0]];
                        var num = param.data[0];
                        var len = 0;
                        yAxisData.forEach(function(item, index) {
                            if (param.seriesName === item.name) {
                                yAxisDataTemp = item.data[param.data[0]];
                            }
                        });
                        num--;
                        while(num >= 0) {
                            len += yAxisData[0].data[num].length;
                            num--;
                        }
                        len += yAxisDataTemp.indexOf(param.data[1]);
                          return [
                              param.name + '-' + chart.views[0].data.x[1].data[len] + '-' + item.name + ': ' + param.data[1]
                          ].join('<br/>')
                      }
                  }
              });
          });
          return seriesData;
      }
  }

  return BoxplotChart;
}