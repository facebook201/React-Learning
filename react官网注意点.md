#### 关于state状态的使用

```javascript
class Parent extends React.Component {
	constructor(props) {
    	super(props);
      	this.state = {value: ''};
    }
}
// 通过使用 this.setState({value: 's'})
```

关于使用setState的一些注意点：

* 不要直接更新状态 (**构造函数是唯一可以初始化this.state的地方**)

  ```javascript
  // error
  this.state.value = 'lisi';

  // Correct
  this.setState({
     value: 'syo' 
  });
  ```

* 状态更新可能是异步 代码的执行步骤 同步 => 异步 => 回调

  可以将多个setState调用合并成一个调用来提高性能

  ```javascript
  // error
  this.setState({
      value: this.state.a + this.props.b
  });

  // Correct
  // 该函数接收两个参数 一个是先前的状态 另一个是需要更新的值
  this.setState((prevState, props) => ({
      value: prevState.value + props.b
  }));

  // 如果想在setState之后再执行一些操作可能这样写
  this.setState({xxState});
  if (this.state.xxState) {...}

  // 但是上面的代码不行 this.state.xxState并没有被改变，原因在于setState是异步的，而js执行代码的顺序是同步 => 异步 => 回调，所以会先执行if的语句，如果想要在设置完state之后再执行后面的语句，代码如下

  this.setState({xxState}, () => {
    if (this.state.xxState) {...}   
  });
  ```

  ​

* 状态更新合并

  React将你提供的对象合并到当前状态

  ```javascript
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }

  // 独立更新
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }

  ```

   数据自顶向下流动 父组件或子组件都不能知道某个组件的状态任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中`下方`的组件。



### 状态提升

**如果几个组件需要共用状态数据的情况，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。**





































