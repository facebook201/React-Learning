### Render Props

render props 是一种在React组件之间使用一个**值为函数的prop**在React组件间共享代码的

**也就是说这个prop它是一个函数，它的组件会返回一个函数且函数而不是自己的渲染逻辑**

带有它的组件带有一个返回一个React元素的函数并调用该函数



```javascript
<DataProvider render={data => (
  <h1>hello { data.target } </h1>
)}>
```



假设下面有个组件 追踪鼠标的位置

```jsx
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{heigth: '100%'}} onMouseMove={this.handleMouseMove}>
        <h1>The Current mouse position is ({this.state.x}, {this.state.y})</h1>
      </div>
    );
  }
};
```

那么怎么在另一个组件中重用。若另一个组件需要知道鼠标的位置 该怎么封装？



```jsx
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{heigth: '100%'}} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
};

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <div>
          x:{ mouse.x } y: { mouse.y }
        <img src="" height="150" width="150" style={{position: 'absolute', left: mouse.x, top: mouse.y }} />
      </div>
    );
  }
};

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Move the mouse around!
        </h1>
        {/* 提供一个函数prop 能够动态的决定什么需要渲染 而不是克隆 Mouse */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )} />
      </div>
    );
  }
};
```

**render prop是一个组件用来了解要渲染什么内容的函数prop。** 子组件想得到父组件的值 只要父组件传一个函数prop。**可以使用render prop来实现高阶组件 **



#### 而且解决HOC的固有问题

该技术规避了所有 mixin 和 HOC 会面对的问题：

- **ES6 class**。不成问题，我们可以在 ES6 class 创建的组件中使用 render prop。
- **不够直接**。我们不必再担心 state 或者 props 来自哪里。我们可以看到通过 render prop 的参数列表看到有哪些 state 或者 props 可供使用。
- **名字冲突**。现在不会有任何的自动属性名称合并，因此，名字冲突将全无可乘之机。

并且，render prop 也不会引入 **任何繁文缛节**，因为你不会 **包裹** 和 **装饰** 其他的组件。它仅仅是一个函数！如果你使用了 [TypeScript](https://link.juejin.im?target=https%3A%2F%2Fwww.typescriptlang.org) 或者 [Flow](https://link.juejin.im?target=https%3A%2F%2Fflow.org%2F)，你会发现相较于 HOC，现在很容易为你具有 render prop 的组件写一个类型定义。当然，这是另外一个话题了。

另外，这里的组合模型是 **动态的**！每次组合都发生在 render 内部，因此，我们就能利用到 React 生命周期以及自然流动的 props 和 state 带来的优势。







#### 在React.PureComponent 中使用render Props

