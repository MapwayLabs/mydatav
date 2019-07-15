node编程中最重要的思想就是模块化，import和require都是被模块化所使用。

1、遵循规范

require / exports 是CommonJS的一部分

import / export 是ES6的新规范，如果要兼容浏览器的话必须转化成es5的语法

2、调用时间

require 是运行时调用，所以require理论上可以运用在代码的任何地方

import 是编译时调用，所以必须放在文件开头

3、本质

require 是赋值过程，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量

import 是解构过程，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require
--------------------- 
作者：黑子Kuroko 
来源：CSDN 
原文：https://blog.csdn.net/fifteen718/article/details/86009379 
版权声明：本文为博主原创文章，转载请附上博文链接！