var dataSet = [
{
  // https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts.min.js
  // https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
  scripts: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts.min.js',
  chartData: {
      title: '自定义图表1',
      x: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
      y: [5, 20, 36, 10, 10, 20]
  },
  code: `
     echarts.dispose(customEle);
     var myChart = echarts.init(customEle);
     // 指定图表的配置项和数据
     var option = {
         title: {
             text: title
         },
         tooltip: {},
         legend: {
             data:['销量']
         },
         xAxis: {
             data: x
         },
         yAxis: {},
         series: [{
             name: '销量',
             type: 'bar',
             data: y
         }]
     };
     // 使用刚指定的配置项和数据显示图表。
     myChart.setOption(option);
  `
}, 
{
  scripts: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts.min.js',
  chartData: {
      title: '自定义图表2',
      x: ["衬衫","羊毛衫","高跟鞋","袜子"],
      y: [36, 10, 10, 20]
  },
  code: `
     echarts.dispose(customEle);
     var myChart = echarts.init(customEle);
     // 指定图表的配置项和数据
     var option = {
         title: {
             text: title
         },
         tooltip: {},
         legend: {
             data:['销量']
         },
         xAxis: {
             data: x
         },
         yAxis: {},
         series: [{
             name: '销量',
             type: 'bar',
             data: y
         }]
     };
     // 使用刚指定的配置项和数据显示图表。
     myChart.setOption(option);
  `
}, 
{
    scripts: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts.min.js',
    chartData: {
        title: '自定义图表3',
        x: ["羽绒服","衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
        y: [32, 5, 20, 36, 10, 10, 20]
    },
    code: `
      echarts.dispose(customEle);
       var myChart = echarts.init(customEle);
       // 指定图表的配置项和数据
       var option = {
           title: {
               text: title
           },
           tooltip: {},
           legend: {
               data:['销量']
           },
           xAxis: {
               data: x
           },
           yAxis: {},
           series: [{
               name: '销量',
               type: 'bar',
               data: y
           }]
       };
       // 使用刚指定的配置项和数据显示图表。
       myChart.setOption(option);
    `
},
{
    scripts: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts.min.js',
    chartData: {
        title: '自定义图表4',
        x: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
        y: [5, 20, 36, 10, 10, 20]
    },
    code: `
       echarts.dispose(customEle);
       var myChart = echarts.init(customEle);
       // 指定图表的配置项和数据
       var option = {
           title: {
               text: title
           },
           tooltip: {},
           legend: {
               data:['销量']
           },
           xAxis: {
               data: x
           },
           yAxis: {},
           series: [{
               name: '销量',
               type: 'bar',
               data: y
           }]
       };
       // 使用刚指定的配置项和数据显示图表。
       myChart.setOption(option);
    `
  }, 
  {
    scripts: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts.min.js',
    chartData: {
        title: '自定义图表5',
        x: ["衬衫","羊毛衫","高跟鞋","袜子"],
        y: [36, 10, 10, 20]
    },
    code: `
       echarts.dispose(customEle);
       var myChart = echarts.init(customEle);
       // 指定图表的配置项和数据
       var option = {
           title: {
               text: title
           },
           tooltip: {},
           legend: {
               data:['销量']
           },
           xAxis: {
               data: x
           },
           yAxis: {},
           series: [{
               name: '销量',
               type: 'bar',
               data: y
           }]
       };
       // 使用刚指定的配置项和数据显示图表。
       myChart.setOption(option);
    `
  }, 
  {
      scripts: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts.min.js',
      chartData: {
          title: '自定义图表6',
          x: ["羽绒服","衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
          y: [32, 5, 20, 36, 10, 10, 20]
      },
      code: `
        echarts.dispose(customEle);
         var myChart = echarts.init(customEle);
         // 指定图表的配置项和数据
         var option = {
             title: {
                 text: title
             },
             tooltip: {},
             legend: {
                 data:['销量']
             },
             xAxis: {
                 data: x
             },
             yAxis: {},
             series: [{
                 name: '销量',
                 type: 'bar',
                 data: y
             }]
         };
         // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(option);
      `
  },
  {
    scripts: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts.min.js',
    chartData: {
        title: '自定义图表7',
        x: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
        y: [5, 20, 36, 10, 10, 20]
    },
    code: `
       echarts.dispose(customEle);
       var myChart = echarts.init(customEle);
       // 指定图表的配置项和数据
       var option = {
           title: {
               text: title
           },
           tooltip: {},
           legend: {
               data:['销量']
           },
           xAxis: {
               data: x
           },
           yAxis: {},
           series: [{
               name: '销量',
               type: 'bar',
               data: y
           }]
       };
       // 使用刚指定的配置项和数据显示图表。
       myChart.setOption(option);
    `
  }, 
  {
    scripts: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts.min.js',
    chartData: {
        title: '自定义图表8',
        x: ["衬衫","羊毛衫","高跟鞋","袜子"],
        y: [36, 10, 10, 20]
    },
    code: `
       echarts.dispose(customEle);
       var myChart = echarts.init(customEle);
       // 指定图表的配置项和数据
       var option = {
           title: {
               text: title
           },
           tooltip: {},
           legend: {
               data:['销量']
           },
           xAxis: {
               data: x
           },
           yAxis: {},
           series: [{
               name: '销量',
               type: 'bar',
               data: y
           }]
       };
       // 使用刚指定的配置项和数据显示图表。
       myChart.setOption(option);
    `
  }, 
  {
      scripts: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts.min.js',
      chartData: {
          title: '自定义图表9',
          x: ["羽绒服","衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
          y: [32, 5, 20, 36, 10, 10, 20]
      },
      code: `
        echarts.dispose(customEle);
         var myChart = echarts.init(customEle);
         // 指定图表的配置项和数据
         var option = {
             title: {
                 text: title
             },
             tooltip: {},
             legend: {
                 data:['销量']
             },
             xAxis: {
                 data: x
             },
             yAxis: {},
             series: [{
                 name: '销量',
                 type: 'bar',
                 data: y
             }]
         };
         // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(option);
      `
  },
  {
    scripts: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts.min.js',
    chartData: {
        title: '自定义图表10',
        x: ["羽绒服","衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
        y: [32, 5, 20, 36, 10, 10, 20]
    },
    code: `
      echarts.dispose(customEle);
       var myChart = echarts.init(customEle);
       // 指定图表的配置项和数据
       var option = {
           title: {
               text: title
           },
           tooltip: {},
           legend: {
               data:['销量']
           },
           xAxis: {
               data: x
           },
           yAxis: {},
           series: [{
               name: '销量',
               type: 'bar',
               data: y
           }]
       };
       // 使用刚指定的配置项和数据显示图表。
       myChart.setOption(option);
    `
}
]