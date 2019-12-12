var fs = require('fs');
var base64Img = require('base64-img');
var baseUrl = './';
var imgList = ['etl-customize'];
imgList.forEach(img => {
  const url = `${baseUrl}${img}.svg`;
  const base64 = base64Img.base64Sync(url);
  console.log(img, '\n', base64);
});
