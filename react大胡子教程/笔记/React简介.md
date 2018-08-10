#### 事件监听

```javascript
class Title extends Component {
    constructor() {
        super();
        this.state = {isToggleOn: true};
        this.handleClickOnTitle = this.handleClickOnTitle.bind(this);
    }
    handleClickOnTitle(e) {
        console.log(e.target);
    }
    render() {
        return (
          <h1 onClick={this.handleClickOnTitle}>Click</h1>
        )
    }
}
```

* **on的事件监听只能用在普通的HTML的标签上 不能用在组件的标签上。**

* **event对象 是内部资金提供的 做好了兼容性处理。符合W3C处理**。

* **需要手动的绑定this  bind(this)**

  

> 如何同时调用两个函数

```javascript
class Title extends Component {
    constructor() {
        super();
        this.state = {isToggleOn: true};
        this.handleClickOnTitle = this.handleClickOnTitle.bind(this);
    }
    handleClickOnTitle(e) {
        console.log(e.target);
        this.run();
    }
    run() {
        console.log('run');
    }
    render() {
        return (
          <h1 onClick={this.handleClickOnTitle}>Click</h1>
        )
    }
}
```





#### setState 接收对象参数

 当调用这个函数的时候 组件会更新状态。并且重新调用 render方法。

shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate.

**当我们要改变状态的时候 不能直接使用this.state = xxx;  接收对象或者函数作为参数**



* **不要直接更新状态 构造函数是唯一能够初始化state的地方**

* **状态更新可能是异步 React 将多个setState 调用合并为一个调用来提高性能优化 不能使用第一种来计算下一个状态**  **使用第二种形式 接收一个函数而不是一个对象 该函数接收先前的状态作为第一个参数 将此次更新被应用时的props作为第二个参数**

  **对于第二个函数参数 特别说一下。 因为setState 不会立即执行。会先缓存起来。如果我们想要操作数据。 **

* setState 合并 **下面进行了三次 但是实际上组件只会重新渲染一次 而不是三次。**

  ```javascript
  // 1 不要直接更新状态
  this.state.count = 2;
  this.state({
     count: 2 
  });
  
  // 想要操作数据
  this.setState((prevState) => {
      return {
          count: 0
      } 
  });
  
      this.setState((prevState) => {
        return prevState.count = 0;
      });
  
      this.setState((prevState, props) => {
        return {
          count: prevState.count + 4 // 上一个setState 返回count 是 0
        };
      });
    }
  
  
  ```



#### 配置组件的 props

组件是独立的 可复用的单元。有时候我们能用的 但是其他同事也想要用。有可能出现 我们的数据不一样。这时候我们就需要配置自己想要的数据。React的 props可以达到这个效果。**每个组件接收一个props 它是一个对象 包含了所有你对这个组件的配置。**



```javascript
render() {
    // 定义两个配置项 通过父组件传
    const likeTxt = this.props.likeTxt || '取消';
    const unLikeTxt = this.props.unLikeTxt || '点赞';
    return (
      <div>
        <button id="like-btn" onClick={this.changeState}>
          <span className="like-text">{this.state.isLiked ? likeTxt : unLikeTxt}</span>
        </button>
      </div>
    );
  }

// 父组件
<LikeButton likedText='已赞' unlikedText='赞' />
```



#### state 和 props

**state主要作用是用于保存、控制、修改自己的状态。在组件内部初始化。可以被组件自身修改。外部不能访问 也不能修改**

**props是外部对组件自己配置**

React 鼓励多使用props 少使用state。没有state的组件叫无状态组件。



#### list 列表循环和key的使用

```javascript
const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
];

class List extends Component {
  render() {
    return (
      <ul>
        {
          // 添加唯一标识 key
          users.map((user, index) =>
            <li key={index}>{user.username}</li>
          )
        }
      </ul>
    );
  }
}
```



#### 实际开发 绑定表单的值

React 里面的state值要通过setState来改变其值。所以要通过监听一个方法来改变值

```javascript
changeValue(event) {
    this.setState({
        username: event.target.value
    })        
}

<input value={this.state.username} onChange={this.changeValue.bind(this)} />

```



那么我们把这个状态传给父组件 然后父组件下发给其他的子组件

* 首先父组件定义一个事件 通过props传给子组件
* 子组件接收到事件之后 触发一个事件 在这个事件里面调用父组件传来的函数 把要传给父组件的数据 传个这个函数即可
* 父组件会通过传过去的函数 接收到传过来的值

```javascript
// 父组件的函数
handleSubmitComment(val) {
    // val是子组件传来的
    console.log(val);
}
<CommentInput onSubmit={this.handleSubmitComment.bind(this)} />


// 子组件
submit() {
    if (this.props.onSubmit) {
        // 如果父组件有提供这个方法
        const { username, content } = this.state;
        this.props.onSubmit({ username, content })
    }
    this.setState({content: ''});
}
<button onClick={this.submit.bind(this)}></button>
```

