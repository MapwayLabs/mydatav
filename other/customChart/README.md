# 浏览器沙箱模式-如何隔离 css 与 js

## [Iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) 介绍

iframe 元素表示嵌套的[浏览上下文](https://developer.mozilla.org/en-US/docs/Glossary/browsing_context)。每个嵌入式浏览上下文都有其自己的会话历史记录和文档。

```js
window === frame.contentWindow // false
window.document === frame.contentDocument // false
window.Array === frame.contentWindow.Array // false
```

**注：** 由于每个浏览上下文都是完整的文档环境，页面中的每个`<iframe>`都需要增加内存和其他计算资源。从理论上讲，您可以根据需要使用任意多个`<iframe>`，但请检查性能问题。

[example-iframe-onload](./example-iframe-onload.html)
[example-iframe-more](./example-iframe-more.html)
[example-iframe-less](./example-iframe-less.html)

**iframe问题：**

* `iframe 阻塞 onload 事件`：iframe会在主页面的onload之前加载。

* `占用连接池`

* `耗性能`：iframe 数量过多页面性能明显下降。

## [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) 隔离 CSS 和 DOM

[example](./example-shadowdom.html)

## 在主线程中如何隔离 js ?

### [eval(str)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) ？

```js
eval('1+1;');
eval('function(){return 123;}');
eval('window.document.write("<script src=https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts.min.js></script>")');
```

### 如何隐藏全局变量——[Realm](https://github.com/tc39/proposal-realms/#ecmascript-spec-proposal-for-realms-api)

使用示例：

```js
let g = window; // outer global
let r = Realm.makeRootRealm(); // realm object
 
let f = r.evaluate("(function() { return 17 })");
 
f() === 17 // true
 
Reflect.getPrototypeOf(f) === g.Function.prototype // false
Reflect.getPrototypeOf(f) === r.global.Function.prototype // true

```

核心原理：

```js
function simplifiedEval(scopeProxy, userCode) {
  'use strict'
  with (scopeProxy) {
    eval(userCode)
  }
}
```

**[with](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with) 语句【限制作用域】**

with 语句接收的对象会添加到作用域链的前端并在代码执行完之后移除。

```js
// https://www.tuicool.com/articles/FjiMFrY
// example 1
var obj = { name: 'xiaoming' };
function sayName() {
  var name = 'xiaoqiang';
  with(obj) {
    console.log(name);
  }
  console.log(name);
}
sayName();

// example2
var obj = { name: 'xiaoming' };
function sayName() {
  var name = 'xiaoqiang';
  with(obj) {
    name = 'xiaohua';
    age = 30;
  }
  console.log(name);
  console.log(age);
}
sayName();
console.log(obj.name);
console.log(obj.age);
```

**[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 对象【访问拦截】**


```js
const scopeProxy = new Proxy(whitelist, {
  get(target, prop) {
    // here, target === whitelist
    if (prop in target) {
      return target[prop];
    }
    return undefined;
  }
});
```

## 最终方案

[example](./main.html)

**优点：**

1. `n`个自定义图表，仅需`2`个 iframe 解决，大大减少了`iframe`数量。
2. 主线程中运行速度很快。
3. 共享公共资源，节省内存和网络请求开支。
4. 代码`安全性`比原来更高。

**缺点和改进：**
1. 兼容性：`Proxy` IE11不支持，Edge支持，chrome 49以上支持。
2. 加载多个`第三方库冲突`问题。
3. 实践中的`安全性`和`性能`问题仍有待进一步验证。

## 参考文档
[如何安全的运行第三方 JavaScript 代码（上）？](https://www.infoq.cn/article/LDV1D4ASVSpT8H7PVCvr)
[如何安全的运行第三方 JavaScript 代码（中）？](https://www.infoq.cn/article/5KosuiHOeBL4tbXk0HkH)
[如何安全的运行第三方 JavaScript 代码（下）？](https://www.infoq.cn/article/SaCHSl6KW7b7erkJHIiH)
[原文-How to build a plugin system on the web and also sleep well at night](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/)
[JS中的沙箱个人见解](https://chinese.freecodecamp.org/forum/t/topic/587)
[iframe异步加载技术及性能](https://www.open-open.com/solution/view/1319458447249)
[Realm-shim](https://github.com/tc39/proposal-realms/#ecmascript-spec-proposal-for-realms-api)
[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)