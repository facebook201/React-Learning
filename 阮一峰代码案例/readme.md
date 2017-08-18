### 项目说明


#### 1
* script 标签type属性是 text/babel。 这是因为React独有的JSX语法。凡事使用JSX的地方 都要加上type="text/babel"。

* 其次 三个库 react.js（**React的核心库**） 、react-dom.js（**DOM相关的功能**）、Browser.js（**将JSX语法转为JavaScript语法**）。 必须首先加载


#### 2 ReactDOM.render()

最基本的方法。将模板转为HTML语言。 插入指定节点
```javascript

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('app');
);

```

#### 3 JSX 语法
html可以直接写在JavaScript语言之中。不加任何括号。

```javascript

var names = ['Alice', 'Emily', 'Kate'];

ReactDOM.render(
  <div>
  {
    names.map(function (name) {
      return <div>Hello, {name}!</div>
    })
  }
  </div>,
  document.getElementById('example')
);

var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);

```

### 组件 Component
React允许代码封装成组件。然后像插入普通HTML标签一样。在网页插入这个组件。 React.createClass

```javascript

var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>
  }
});

ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('app');
);

```
组件类的的第一个字母必须大写。否则会报错。 比如Hello 不能写成hello。另外组件类只能包含一个顶层标签，否则会报错。 组件的用法与原生的HTML标签完全一致。可以任意加入属性，比如 <Hello name="John"> 就是Hello组件加入一个name属性，值为John。 **组件的属性可以在组件类的this.props对象上获取，比如name属性可以通过this.props.name读取**



### this.props 对象的属性与组件的属性一一对应。但是有个例外 this.props.children 属性

```javascript
var NodeList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function(child){
          return <li>{child}</li>
        })
      }
      </ol>
    );
  }
});

ReactDOM.render(
  <NodeList>
    <span>hello</span>
    <span>world</span>
  </NodeList>,
  document.body
);

```

this.props.children 的值有三种可能: 如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children 的时候要小心。React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。更多的 React.Children 的方法.



#### PropTypes

组件的属性可以接受任意值、字符串、对象、函数等等。有时候我们需要一种机制来验证别人使用组件时 提供的参数是否符合要求。

```javascript

var MyTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },
  // 设置默认的属性
  getDefaultProps: function() {
    return {
      title: 'hello world'
    };
  },
  render: function() {
    return <h1>{this.props.title}</h1>;
  }
});

var data = '123';

ReactDOM.render(
  <MyTitle title={data} />,
  document.getElementById('app')
);

```


### 获取真实的DOM节点

组件不是真实的DOM节点。 而是存在于内存之中的一种数据结构, 虚拟的DOM。只有插入之后才能变成真实的DOM。 所有的DOM变动都会发生在虚拟DOM上 然后才会在实际的DOM中发生变化。这种算法叫做 DOM diff。 可以极大的提高网页的性能表现。

有时候要查看真实的DOM节点 **ref属性**

```javascript
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus();
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});

ReactDOM.render(
  <MyComponent />,
  document.getElementById('app')
);

// this.refs.[refName] 属性获取的是真实的DOM 所以必须要确保真实的DOM发生Click时间之后
// 才会读取 this.refs.[refName] 属性
```


### this.state
组件免不了与用户互动。React 的一大创新，就是讲组件看成是一个状态机。 一开始有一个初始化状态，导致状态变化 从而触发重新渲染UI。

```javascript
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('app')
);
// 一个 LikeButton 组件，它的 getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。
// 由于 this.props 和 this.state 都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性
```


### 表单组件

用户跟组件的互动。不能用this.props 读取。

```javascript
var Input = React.createClass({
  getInitialState: function() {
    return {value: 'hello'};
  },
  handleChange: function(event) {
    console.log(this.state);
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange}/>
        <p>{value}</p>
      </div>
    );
  }
});

ReactDOM.render(<Input />, document.getElementById('app'));

/**
 * 表单的值不能使用 this.props.value 读取。而要定义一个onChange事件的回调函数，通过
 * event.target.value 读取用户输入的值。 textarea 元素、select 元素、radio元素。
 **/

```

### 组件的生命周期

* Mounting： 已插入真实的 DOM
* Updating：正在被重新渲染
* Unmounting：已移除真实的 DOM

React 为每个状态提供了两种处理函数， will 函数在进入状态之前调用，did函数在进入状态之后调用

* componentWillMount()
* componentDidMount()
* componentWillUpdate(object nextProps, object nextState)
* componentDidUpdate(object prevProps, object prevState)
* componentWillUnmount()

* componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
* shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

```javascript
var Hello = React.createClass({
  getInitialState: function () {
    return {
      opacity: 1.0
    };
  },

  componentDidMount: function () {
    this.timer = setInterval(function () {
      var opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity
      });
    }.bind(this), 100);
  },

  render: function () {
    return (
      <div style={{opacity: this.state.opacity}}>
        Hello {this.props.name}
      </div>
    );
  }
});

ReactDOM.render(
  <Hello name="world"/>,
  document.body
);

```


**组件style属性的设置方式要注意 不能使用 style="opacity: {this.state.opacity}。而是style={{opacity: this.state.opacity}}"。因为React组件的样式是一个对象。第一个重大括号是JavaScript语法。两个是样式对象**


### Ajax

组件的数据来源，通常是通过Ajax请求服务器获取。可以使用componentDidMount方法设置Ajax请求。等到成功之后，再用this.setState 方法渲染UI

```javascript



```
