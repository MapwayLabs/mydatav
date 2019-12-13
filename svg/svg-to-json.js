/**
 * 将 svg 文件压缩成 json 对象 
 * 【不要把 svg 转成 base64】(https://www.qianduan.net/dont-svg-base64/)
 * 【压缩 svg 库】：https://github.com/svg/svgo
 * 使用 svg 做背景图
 ```
 var data = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgFile);
 background-image: url('data:image/svg+xml;utf8,%3Csvg%3E%3C%2Fsvg%3E');
 ```
 */
var fs = require('fs');
var path = require('path');
var SVGO = require('svgo');

var svgo = new SVGO({
  plugins: [{
    cleanupAttrs: true,
  }, {
    removeDoctype: false,
  },{
    removeXMLProcInst: true,
  },{
    removeComments: true,
  },{
    removeMetadata: true,
  },{
    removeTitle: true,
  },{
    removeDesc: true,
  },{
    removeUselessDefs: true,
  },{
    removeEditorsNSData: true,
  },{
    removeEmptyAttrs: true,
  },{
    removeHiddenElems: true,
  },{
    removeEmptyText: true,
  },{
    removeEmptyContainers: true,
  },{
    removeViewBox: false,
  },{
    cleanupEnableBackground: true,
  },{
    convertStyleToAttrs: true,
  },{
    convertColors: true,
  },{
    convertPathData: true,
  },{
    convertTransform: true,
  },{
    removeUnknownsAndDefaults: true,
  },{
    removeNonInheritableGroupAttrs: true,
  },{
    removeUselessStrokeAndFill: true,
  },{
    removeUnusedNS: true,
  },{
    cleanupIDs: true,
  },{
    cleanupNumericValues: true,
  },{
    moveElemsAttrsToGroup: true,
  },{
    moveGroupAttrsToElems: true,
  },{
    collapseGroups: true,
  },{
    removeRasterImages: false,
  },{
    mergePaths: true,
  },{
    convertShapeToPath: true,
  },{
    sortAttrs: true,
  },{
    removeDimensions: false,
  }]
});

const baseUrl = './';

console.log('----开始转换----');
fs.readdir(baseUrl, function(err, files) {
  if (err) return;
  // 获取文件夹下所有 svg 文件
  const svgFiles = files.filter(f => {
    return path.extname(f).toLowerCase() === '.svg';
  });
  // 将 svg 转成 json 格式
  svgFiles.forEach((svgName, i) => {
    const baseName = path.basename(svgName, '.svg');
    const svgUrl = `${baseUrl}${svgName}`;
    const jsUrl = `${baseUrl}${baseName}.js`;
    
    // 压缩 svg
    fs.readFile(svgUrl, 'utf-8', function(err, data){
      if (err) throw err;
      svgo.optimize(data, { path: svgUrl }).then(function(result){
        const content = `export default ${ JSON.stringify(result) };`
        fs.writeFileSync(jsUrl, content, { flag: 'w' });
        if (i === svgFiles.length - 1) {
          console.log('----转换完成----');
        }
      });
    });
  });
});
