
### 元素渲染 元素是构成React应用最小的单位

```javascript
const element = <h1>Hello, world</h1>
```

> 元素只是构成组件的一分部 跟内涵更广的定义“组件”给弄混了


### 将元素渲染到DOM中

我们将元素传入一个名为ReactDOM.render() 的方法

```javascript
const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('app');
);
``` 

### 更新元素渲染

React元素都是immutable 不可变的。当元素被创建之后，你是无法改变其内容或属性的。 现阶段更新界面唯一的办法就是创建一个新的元素 然后传入ReactDOM.render() 方法: 

```javascript

function tick() {
  const element = (
    <div>
      <h1>Hello World</h1>
      <h2> It is {new Date().toLocaleTimeString()}. </h2>
    </div>
  );

  ReactDOM.render(
    element,
    document.getElementById('app')
  );
}
setInterval(tick, 1000);
```

> 注意 实际开发中大多数React应用只会调用一次 ReactDOM.render()





