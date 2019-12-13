/**
 * 将 svg 文件转成相应的 base64 文件
 * 用途：模型连线优化功能，模型图标采用 base64 可降低网络请求，优化图片加载速度
 * 使用方法：
 * 1. 修改 `baseUrl` 路径参数，指定要转换的 svg 图片所在的文件夹
 * 2. 执行 `node svgTo64.js` 即可在 baseUrl 文件夹下生成同名的 .js 文件
 * 3. 使用 `import` 加载 js 中的 base64 编码图片在业务代码中使用
 */
var fs = require('fs');
var path = require('path');
var base64Img = require('base64-img');

const baseUrl = './';

fs.readdir(baseUrl, function(err, files) {
  if (err) return;
  // 获取文件夹下所有 svg 文件
  const svgFiles = files.filter(f => {
    return path.extname(f).toLowerCase() === '.svg';
  });
  // console.log(svgFiles);
  // 将 svg 转换成对应的 base64 文件
  svgFiles.forEach(svgName => {
    const baseName = path.basename(svgName, '.svg');
    const base64 = base64Img.base64Sync(`${baseUrl}${svgName}`);
    // 将 base64 写入到对应 js 文件
    const jsUrl = `${baseUrl}${baseName}.js`;
    const content = `export default '${base64}';`;
    fs.writeFileSync(jsUrl, content, { flag: 'w' });
  });
});
