# bdp自定义图表改版计划

要求：
* 兼容旧版
* 性能提升
* 安全性提升


## thirdPluginLoader 缺陷

* 最多只能导入两个库，且必须是有独立全局变量的库（如echarts、threejs）；不能导入插件（如 jquery 插件，因为暴露的 $ 变量并不在iframe中）。

* 最好提供 libId 选项，可利用缓存，不然每次在代码中需要实时重复下载库，造成图表响应慢。



## 语法规范

### 系统全局变量

### 代码规范

* 自定义代码运行在 `严格模式下`，需要遵循严格模式定义。(已去除严格模式)

* 不准使用 `window、eval、alert` 等关键字。

* 自己声明的变量都要用 `var` 声明，否则报错。

* `d3.select('chart-box')` => `d3.select(chart.$elem.get(0))`。

* `$('.g2-legend')` => `customChart.find('.g2-legend')`。

* `$('#custom-chart')` => `chart.$elem`。

* 不要改变原生对象的原型 `Array.prototype.min、Date.prototype.formate`，这些改变的影响是全局的（所有的自定义图表）。

* `chart.root` 访问 shadowDom 的根结点。

* `return`只能在函数内，不能在代码体中。如果非要，代码要用IIFE包裹住，`(function(){ return 0; })()`。

* 不要定义外部提供的全局变量，如 `var chart = xxx;`会导致无法访问外部chart对象。

* 第三方库如果是独立的库，最好提供`libId`参数，该参数是字符串，表示暴露出的变量，如`libId："echarts"`。如果是插件，则
只准引用已加载的库的变量作为全局变量，如声明 jquery 插件，`Jquery.fn.extend()`。

* 第三方库不能引用图表里面的参数，如`chart.$elem、bdpChart`等外部提供的全局变量。可以通过函数传参的方式使用。

* 操作DOM或计算DOM尺寸，一律只能基于`chart.$elem`作为DOM起点。以下都 _不正确_`$(".chart-box"),d3.select(".chart-box"),document.body.clientWith,$(".chart").width()`。

* 如何引入多个script？引入单独库？引入插件库？

* 引入css？

* 重复引用第三方库问题？有些被二次修改的第三方库会导致不能直接使用？？？需要强制关闭缓存？

* 不需自己手动销毁图表，如`chart.$elem.html('')`，可能会导致append进去的style被无意释放。

* Strict mode code may not include a with statement

### 加载第三方库问题？

* 加载多个 js？

bdp.loadjs

* 多版本共存？

* 内部添加 style 标签？

* 内部查找 dom？

* 缓存影响？？有时不需要缓存的被缓存了？多个库共享缓存。

### 动态图-表格滚动 改动大？？？


### 存在问题

1、多个库冲突解决问题？(比较棘手)

2、自定义图表导出问题?(涉及 exportDashboardDirective.js、export-img.js)

```js
chartIframe.id = '_iframe_' + chart.ct_id;
chartIframe.className = 'J-export-iframe-img';
```

3、一些公用方法的兼容性问题？（因为两套方案的实现机制不同，造成一些公用方法的使用不兼容，如`bdp.loadjs、thirdPluginLoader`等)

4、整理新的语法规范文档？