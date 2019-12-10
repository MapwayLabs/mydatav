var fs = require('fs');
var base64Img = require('base64-img');
// var baseUrl = './src/assets/images/svgs/etl/';
var baseUrl = './src/assets/images/svgs/etl/common/';
// var imgList = ['etl-flow-default', 'etl-flow-pass', 'etl-flow-error', 'etl-flow-update', 'etl-flow-lock'];
var imgList = ['etl-add_field', 'etl-addr_trans', 'etl-alter_field', 'etl-anti_join', 'etl-data_aggr', 'etl-data_filter', 'etl-deduplication', 'etl-full_join', 'etl-id_trans', 'etl-input', 'etl-join', 'etl-left_join', 'etl-machine_learning', 'etl-map_field', 'etl-more-operation', 'etl-output', 'etl-select', 'etl-sql', 'etl-streaming_data_aggr', 'etl-streaming_output', 'etl-table', 'etl-union'];
imgList.forEach(img => {
  const url = `${baseUrl}${img}.svg`;
  const base64 = base64Img.base64Sync(url);
  fs.writeFileSync('./svg64.output.js', img + '**********************\n' + base64 + '\n', {flag: 'a'});
  // console.log(img, '\n', base64);
});
// var data2 = base64Img.base64Sync('./src/assets/images/svgs/etl/etl-flow-default.svg');
// console.log('base64Data:', data2);