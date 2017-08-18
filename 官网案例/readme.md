
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



### 组合组件
组合组件可以在它的输出中引用其他组件，这就可以让我们同用一个组件来抽象出任意层次的细节。
我们可以创建一个App组件 用来多次渲染Welcome组件。

```javascript

// 创建一个Welcome 组件
class Welcome extends React.component {
  render() {
    return (
      <h1>Hello {this.props.name}</h1>
    );
  }
}

// 创建父组件 App
class App extends React.component {
  render() {
    return (
      <div>
        <Welcome name="sy"/>
        <Welcome name="sy1"/>
        <Welcome name="sy2"/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')  
);

```

**组件的返回值只能有一个根元素。这也是我们要用一个<div></div>来包裹所有 <Welcome />元素的原因**

#### 提取组件

```javascript

class Welcome extends React.component {
  render() {
    return (
      <div className="comment">
        <div class="userInfo">
          <img className="Avatar"
            src={props.author.avatarUrl}
            alt={props.author.name}
          />
          <div className="userInfo-name">
            {props.author.name}
          </div>
        </div>
        <div className="comment-text">
          {props.text}
        </div>
        <div className="comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    );
  }
}
ReactDOM.render(
  <Welcome />,
  document.getElementById('app')
);
```

#### Props的只读性

```javascript
function sum(a, b) {
  return a + b;
}

// 上面的函数叫做纯函数 没有改变自己的输入值，当传入的值相同时 返回相同的结果。

```

**React非常灵活 所有的React组件必须向纯函数那样使用它们的Props**

### 将函数转化为类

* 创建一个名称扩展为React.Component 的ES6类
* 创建一个叫做 render() 的空方法
* 将函数体移到 render() 方法中
* 在render() 方法中 使用 this.props 替换 props
* 删除剩余的空函数的声明

> 添加一个类构造函数来初始化状态 this.state

**如何传递props到基础构造函数**
```javascript
constructor(props) {
  // 调用父类的constructor(x, y)
  super(props);
  this.state = {data: new Date()};
}
// 类组件应始终用props调用基础构造函数。
```

#### 将生命周期方法添加到类中
每当Clock组件第一次加载到DOM中的时候，我们都想生成定时器，这在React中被称为挂载
同样，每当Clock生成的这个DOM被移除的时候，我们也会想要清除定时器，这在React中被称为卸载。
我们可以声明特殊的方法 当组件挂载或卸载的时候 来运行一些代码。

**这些方法被称为生命周期钩子**

```javascript
// 第一步 定义组件类

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  // 组件渲染之后进行挂载
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  // 组件将要卸载的时候 一些事件
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // 时间
  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('app')
);
```
来看看上面的代码执行的步骤

* 当 <Clock /> 被传递给ReactDOM.render() 时。React调用Clock组件的构造函数。由于Clock
需要显示当前时间 所以使用包含当前时间的对象来初始化this.state。我们稍后会更新此状态。
* React 然后调用Clock 组件的render() 方法
* 当Clock 的输出插入到DOM中，React 调用componentDidMount() 生命周期钩子。在其中，Clock 组件要求浏览器设置一个定时器，每秒钟调用一次 tick()。
* 浏览器每秒钟调用 tick() 方法。 在其中，Clock 组件通过使用包含当前时间的对象调用 setState() 来调度UI更新。 通过调用 setState() ，React 知道状态已经改变，并再次调用 render() 方法来确定屏幕上应当显示什么。 这一次 render() 方法中的 this.state.date 将不同，所以渲染输出将包含更新的时间，并相应地更新DOM。
* 一旦Clock组件被从DOM中移除，React会调用componentWillUnmount()这个钩子函数，定时器也就会被清除。
