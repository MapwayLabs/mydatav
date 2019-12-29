---
presentation:
  theme: black.css
  width: 1024
  height: 1200
---



# bezier 曲线



## 什么是 bezier 曲线？

bezier 曲线是法国工程师为雷诺公司车身设计而开发的。

![car](./car.png)



#### 一阶 bezier

控制点：2

![bezier1](./bezier1.gif)

#### 二阶 bezier

控制点：3

![bezier2](./bezier2.gif)

#### 三阶 bezier

控制点：4

![bezier3](./bezier3.gif)



<p class="codepen" data-height="500" data-theme-id="0" data-default-tab="js,result" data-user="tholman" data-slug-hash="foxtn" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Bezier Sim">
  <span>See the Pen <a href="https://codepen.io/tholman/pen/foxtn/">
  Bezier Sim</a> by Tim Holman (<a href="https://codepen.io/tholman">@tholman</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>



特点：

1. 并不是所有控制点都在 bezier 曲线上

2. bezier 曲线的阶数等于控制点数减1

3. 曲线总在控制点组成的[最小凸多边形](https://cloud.tencent.com/developer/information/%E6%9C%80%E5%B0%8F%E5%87%B8%E5%A4%9A%E8%BE%B9%E5%BD%A2%E7%AE%97%E6%B3%95)内部（用于优化图形相交检测）

![bezier3-e](./bezier3-e.png)



### bezier 曲线生成过程

假设一条由三个控制点生成的 bezier 曲线，生成步骤如下：

1. 首先画出三个控制点

2. 按照 1->2->3 的顺序连成两条线段

3. 定义一个变量 t，并且 t 从 0 到 1 变化。（如：t = 0, 0.05, 0.1, 0.15, 0.2,......0.95, 1）
对于 t 的每个取值：

    * 分别从两条线段取总长度的 t 倍点，得到两个点
    * 连接这两个点，得到一条新线段

4. 对于新得到的线段，同样取线段总长度的 t 倍点

5. 重复步骤 4，直到只生成一个点，这个点即为曲线上的一点。

6. 取下一个 t 值，重复步骤 3，直到 t 为 1，这时就得到 bezier 曲线上所有点，连接这些点就构成 bezier 曲线。


![1](./step1.png)

![2](./step2.png)

![3](./step3.png)

![4](./step4.png)

![5](./step5.png)

![6](./step6.png)

![7](./step7.png)

![8](./step8.png)

![9](./step9.png)


[演示示例](http://192.168.8.159:8080/docs/bezier/bezierMaker.js/example/playground.html)



对于 N 个控制点，步骤：

1. 连接控制点生成 N-1 条线段

2. 取 t 从 0 到 1 变化，取每条线段的 t 倍点连接，得到 N-2 条线段

3. 重复步骤 2，直到得到一个点



### 数学公式

* 一阶 bezier
![bformula1](./bformula1.png)

* 二阶 bezier
![bformula2](./bformula2.png)

* 三阶 bezier
![bformula3](./bformula3.png)

* n阶 bezier(多项式展开式)
![bformulan](./bformulan.png)



## bezier 曲线的应用



### 绘制优美的曲线

<p class="codepen" data-height="500" data-theme-id="0" data-default-tab="js,result" data-user="linghuam" data-slug-hash="VNLMeg" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Canvas: 绘制心形">
  <span>See the Pen <a href="https://codepen.io/linghuam/pen/VNLMeg/">
  Canvas: 绘制心形</a> by linghuam (<a href="https://codepen.io/linghuam">@linghuam</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>



### 绘制路径文字(来自[codepen](https://codepen.io/))

<p class="codepen" data-height="500" data-theme-id="0" data-default-tab="js,result" data-user="linghuam" data-slug-hash="BEZLgg" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="SVG text on an interactive bezier path.">
  <span>See the Pen <a href="https://codepen.io/linghuam/pen/BEZLgg/">
  SVG text on an interactive bezier path.</a> by linghuam (<a href="https://codepen.io/linghuam">@linghuam</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>



### 艺术效果(来自[codepen](https://codepen.io/))

<p class="codepen" data-height="500" data-theme-id="0" data-default-tab="js,result" data-user="loktar00" data-slug-hash="tbgDv" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Bezier curve art">
  <span>See the Pen <a href="https://codepen.io/loktar00/pen/tbgDv/">
  Bezier curve art</a> by Loktar (<a href="https://codepen.io/loktar00">@loktar00</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>



### 制作不同动效的动画

* css `transition-timing-function` 和 `animation-timing-function` 属性(来自[codepen](https://codepen.io/))

<p class="codepen" data-height="500" data-theme-id="0" data-default-tab="js,result" data-user="jamiejefferson" data-slug-hash="sFDBe" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Adding bezier curve eases to GSAP">
  <span>See the Pen <a href="https://codepen.io/jamiejefferson/pen/sFDBe/">
  Adding bezier curve eases to GSAP</a> by Jamie Jefferson (<a href="https://codepen.io/jamiejefferson">@jamiejefferson</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>



### 旋转动画

<p class="codepen" data-height="500" data-theme-id="0" data-default-tab="css,result" data-user="linghuam" data-slug-hash="GLJEME" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="css动画-animation">
  <span>See the Pen <a href="https://codepen.io/linghuam/pen/GLJEME/">
  css动画-animation</a> by linghuam (<a href="https://codepen.io/linghuam">@linghuam</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


### js 动画

<p class="codepen" data-height="500" data-theme-id="0" data-default-tab="js,result" data-user="linghuam" data-slug-hash="zXGzQv" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="tween-example">
  <span>See the Pen <a href="https://codepen.io/linghuam/pen/zXGzQv/">
  tween-example</a> by linghuam (<a href="https://codepen.io/linghuam">@linghuam</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


缓动函数
![linear](./linear.png)
![ease](./ease.png)
![ease-in](./ease-in.png)
![ease-out](./ease-out.png)
![ease-in-out](./ease-in-out.png)



### 酷炫效果(来自[codepen](https://codepen.io/))

<p class="codepen" data-height="500" data-theme-id="0" data-default-tab="js,result" data-user="kryo2k" data-slug-hash="yNjdZb" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Bezier Curves">
  <span>See the Pen <a href="https://codepen.io/kryo2k/pen/yNjdZb/">
  Bezier Curves</a> by kryo (<a href="https://codepen.io/kryo2k">@kryo2k</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>



[时序图示例](http://192.168.8.159:8080/map/timeplay/)



## 参考文档

* [维基百科](https://zh.wikipedia.org/wiki/%E8%B2%9D%E8%8C%B2%E6%9B%B2%E7%B7%9A)

* [bezier-curve](https://javascript.info/bezier-curve)

* [w3cPlus](https://www.w3cplus.com/canvas/drawing-curve.html)

* [css-animations](https://javascript.info/css-animations)

* [js-animation](https://javascript.info/js-animation)