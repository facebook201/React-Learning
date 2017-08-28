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

  **当你调用 `setState` 的时候，*React.js 并不会马上修改 state*。而是把这个对象放到一个更新队列里面，稍后才会从队列当中把新的状态提取出来合并到 `state` 当中，然后再触发组件更新**

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



### 事件监听

**onClick的事件监听只能用在普通的HTML标签上，而不能用在组件标签上。** <header onClick={...} /> 是不会有效果的。

关于事件中的this。 react.js 调用你所传递过去的方法不是通过对象方法调用的方式 而是直接通过函数调用。所以事件监听函数不能监听到。 需要手动的绑定this



###配置组件的Porps 

组件是相互独立、可复用的单元。一个组件可能在不同地方被用到。但是在不同的场景下这个组件的需求可能会根据

* 为了使得组件的可定制性更强，在使用组件的时候，可以在标签上加属性来传入配置参数。
* 组件可以在内部通过 `this.props` 获取到配置参数，组件可以根据 `props` 的不同来确定自己的显示形态，达到可配置的效果。
* 可以通过给组件添加类属性 `defaultProps` 来配置默认参数。
* `props` 一旦传入，你就不可以在组件内部对它进行修改。但是你可以通过父组件主动重新渲染的方式来传入新的 `props`，从而达到更新的效果。



### State VS Props (state 是让组件控制自己的状态，props 是让外部对组件自己进行配置)

state的主要作用是用于组件保存、控制、修改**自己**的可变状态。state在组件内部初始化，可以被组件自身修改，而外部不能访问不能修改。**类似于一个局部的、只能被组件自身控制的数据源。** 

Props的主要作用是让使用该组件的父组件可以传入参数来配置该组件。 是外部传进来的配置参数。组件内部无法控制也无法修改，除非外部组件主动传入新的props，否则组件的props永远不变。

没有 `state` 的组件叫无状态组件（stateless component），设置了 state 的叫做有状态组件（stateful component）。因为状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有状态的组件。这样会降低代码维护的难度，也会在一定程度上增强组件的可复用性。





#### 列表渲染

```javascript
const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

class User extends Component {
  render () {
    const { user } = this.props
    return (
      <div>
        <div>姓名：{user.username}</div>
        <div>年龄：{user.age}</div>
        <div>性别：{user.gender}</div>
        <hr />
      </div>
    )
  }
}

class Index extends Component {
  render () {
    return (
      <div>
        {users.map((user, i) => <User key={i} user={user} />)}
      </div>
    )
  }
}
```





#### key

**对于表达式套数组罗列到页面上的元素，都要为每个元素加上key属性，这个key必须是每个元素唯一的标识。** 一般来说 key的值可以直接是后台数据返回的id。因为id是唯一的

































