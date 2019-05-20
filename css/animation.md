# 前端动画

## CSS3 动画

### transition

* transition
* transition-property
* transition-duration
* transition-timing-function
* transition-delay

```css
div {
    // 单个属性
    transition: <property> <duration> <timing-function> <delay>;
    // 多个属性
    transition: [<property> <duration> <timing-function> <delay>, <property> <duration> <timing-function> <delay>, ......];
}
```

```js
el.addEventListener("transitionstart", signalStart, true);
el.addEventListener("transitionrun", signalStart, true);
el.addEventListener("transitionend", updateTransition, true);
```

### animation

* animation
* animation-name
* animation-duration
* animation-timing-function
* animation-delay
* animation-iteration-count
* animation-direction
* animation-fill-mode:设置CSS动画在执行之前和之后如何将样式应用于其目标。
* animation-play-state

### transform

变换函数按从左到右的顺序相乘，这意味着复合变换按从右到左的顺序有效地应用。

只能转换由盒子模型定位的元素。除了：非替换的内联元素，table-column元素。

## JS 动画
