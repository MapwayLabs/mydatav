
https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=zh-cn#what
Shadow DOM 修复了 CSS 和 DOM。它在网络平台中引入作用域样式。
shadow DOM 最有用的功能是**作用域 CSS**：
* 外部页面中的 CSS 选择器不应用于组件内部。
* 内部定义的样式也不会渗出。它们的作用域仅限于宿主元素。

shadow DOM 内部使用的 CSS 选择器在本地应用于组件。
样式表的作用域也仅限于影子树：


## iframe 缺点

* iframe 阻塞 onload 事件
window 的 onload 事件直到它所包含的所有 iframe，以及所有 iframe 中的资源完全加载完成后才会触发。在 Safari 和 Chrome 中，用 javascritpt 动态创建 iframe 可以避免这种阻塞行为。

* 占用连接池
对每个 web 服务器来说，浏览器只打开极少的几个连接数。老的浏览器，包括 IE 6/7 和 Firefox 2，每个主机只有2个连接。在新的浏览器中，连接数增加鸟。Safari 3+ 和 Opera 9+ 增至4个，Chrome 1+ 、IE 8 及 Firefox 3 增至6个。
人们可能期望每个 iframe 有单独的连接池，但并非如此。在大多数浏览器中，连接被主页面和它的 iframe 所共享，这意味着有可能 iframe 中的资源占用了可用连接而阻塞了主页面的资源加载。

https://www.ostraining.com/blog/webdesign/against-using-iframes/

https://medium.com/@bluepnume/iframes-are-just-terrible-heres-how-they-could-be-better-974b731f0fb4



## iframe 耗时分析

* `eval` 或 `new Function` 比直接引入脚本要耗时，`eval` 或 `new Function` 耗时差不多。
* 在 iframe 中引入第三方脚本耗时较多，是引起性能问题的关键点。
* frame 页面加载`load`时间随着页面 frame 标签的数量增加而变长，变化幅度很明显。


## 解决思路

* 限制页面的 iframe 数量
* 提取公共文件，只加载一次
