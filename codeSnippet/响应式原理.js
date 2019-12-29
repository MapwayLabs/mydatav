// 探究Vue响应式原理
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

// 【 基本思路 】
var obj = { name:'mlh', age: 27, child: [1,2], home: { a: 1, b: 2 } }
function toResponsiveObject(obj) {
  Object.keys(obj).forEach(key => {
    var value = obj[key];
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get: function() {
        console.log('get:' + key);
        return value;
      },
      set: function(v) {
        console.log('set:' + key);
        value = v;
      }
    });
  });
  // vue文档：一旦观察过，不需要再次在数据对象上添加响应式属性。因此推荐在创建实例之前，就声明所有的根级响应式属性。
  Object.seal(obj);
}
toResponsiveObject(obj);

//【 问题1 】？
/**
1.如果对象属性值是基本类型，可以正常触发
2.如果对象属性值是数组或对象
obj.child、obj.child[0]、obj.child[0]=10 都只触发 get, 同理 obj.home、obj.home.a、obj.home.a=11 也都只触发 get
只有 obj.child=xxx 或 obj.home=xxx 时才触发 set
*/

// 解决方案：Vue 将会递归将 data 的属性转换为 getter/setter
var obj = { name:'mlh', age: 27, child: [1,2], home: { a: 1, b: 2 } }
function toResponsiveObject(obj) {
  Object.keys(obj).forEach(key => {
    var value = obj[key];
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get: function() {
        console.log('get:' + key);
        return value;
      },
      set: function(v) {
        console.log('set:' + key);
        value = v;
      }
    });
    // 递归监听对象值的修改
    if (typeof value === 'object' && value != null) {
      toResponsiveObject(value);
    }
  });
  // vue文档：一旦观察过，不需要再次在数据对象上添加响应式属性。因此推荐在创建实例之前，就声明所有的根级响应式属性。
  Object.seal(obj);
}
toResponsiveObject(obj);

//【 问题2 】如果给属性赋新值是对象类型，对属性值的监听将失效？？
// 解决方案：在 set 里面判断
var obj = { name:'mlh', age: 27, child: [1,2], home: { a: 1, b: 2 } }
function toResponsiveObject(obj) {
  Object.keys(obj).forEach(key => {
    var value = obj[key];
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get: function() {
        console.log('get:' + key);
        return value;
      },
      set: function(v) {
        console.log('set:' + key);
        value = v;
        // 如果新值是对象类型，递归监听
        if (typeof value === 'object' && value != null) {
          toResponsiveObject(value);
        }
      }
    });
    if (typeof value === 'object' && value != null) {
      toResponsiveObject(value);
    }
  });
  // vue文档：一旦观察过，不需要再次在数据对象上添加响应式属性。因此推荐在创建实例之前，就声明所有的根级响应式属性。
  Object.seal(obj);
}
toResponsiveObject(obj);

//【 问题3 】如何通知，对象的哪个属性发生了改变，新值和旧值分别是什么？？？
// 依赖收集：在getter中收集依赖，在setter中通知依赖更新。

