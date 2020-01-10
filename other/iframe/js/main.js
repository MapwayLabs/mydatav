
　　require.config({

  　　　　paths: {
  
  　　　　　　"jquery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min",
            "echarts": "https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts.min"
  
  　　　　}
  
  　　});
require(['echarts', 'jquery'], function (echarts, jquery){
  console.log('echarts', echarts);
  console.log('jquery', jquery);
});