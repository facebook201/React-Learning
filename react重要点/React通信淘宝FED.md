### 父组件向子组件通信 (淘宝UED)

在React中。React组件之间的关系为从属关系， 通信是单向的。 父组件向子组件通信是 传props的方式

```javascript
class Parent extends Component{
  state = {
    msg: 'start'
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        msg: 'end'
      });
    }, 1000);
  }

  render() {
    // 这里在父组件中 把 msg 传过去 子组件使用props接收
    return <Child_1 msg={this.state.msg} />;
  }
}

class Child_1 extends Component{
  render() {
    // 这里的this.props 就可以访问子组件的属性msg 就返回父组件this.state.msg 的值
    return (
      <p>{this.props.msg}</p>
      <Child_1_1 {...this.props}/>
    );
  }
}

// 子子组件
class Child_1_1 extends Component {
  render() {
    return (
      <div>
        {this.props.msg}
      </div>
    );
  }
}
```



#### 子组件向父组件通信

父组件通过传递props来传给子组件。而子组件向父组件通信，同样也需要父组件向子组件传递props进行通讯。 只是父组件传递的 是作用域为父组件自身的函数(就是定义在父组件作用域中的函数) 子组件调用该函数 将子组件想要传递的信息 作为参数 传递到父组件的作用域中。

```javascript
// 父组件
class Parent extends Component{
  state = {
    msg: 'start'
  };
  // 在父组件作用域里面定义一个函数
  transferMsg(msg) {
    this.setState({
      msg
    });
  }
  
  
  render() {
    return(
      <div>
        <p>child msg: {this.state.msg}</p>
        // 在父组件里面 将函数用属性的方式传给子组件
        <Child_1 transferMsg = {msg => this.transferMsg(msg)} />
      </div>
    );
  }
}

// 子组件 
class Child_1 extends Component{
  componentDidMount() {
    setTimeout(() => {
      // 通过props接收父组件的函数 然后调用该函数 将想要传递的信息作为参数传给该函数
      this.props.transferMsg('end')
    }, 1000);
  }

  render() {
    return <div>
      <p>child_1 component</p>
    </div>
  }
}
```





#### 高性能组件（来自淘宝UED）

React的组件，离不开props和state。我们可以在props和state存放任何类型的数据，通过改变props和state，去控制整个组件的状态，**当props和state发生变化的时候，React就会重新渲染整个组件**。

![border](http://img1.tbcdn.cn/L1/461/1/c3c7f7f478d86c40530967b5b0fc12037bc71d22)

当props和state变化的时候，React将会构建新的virtual DOM，使用diff算法把新老的虚拟DOM 进行比较。如果新老虚拟DOM 树不相等 就重新渲染，如果我们要提高组件的性能就要减少组件的重新渲染。



#### 组件优化

* Pure Component （纯组件）

  给定相同的 props 和 state 就会渲染出相同的结果，那么这个组件就叫做纯组件，换一句话说纯组件只依赖于组件的 props 和 state

  ```javascript
  render() {
       return (
           <div style={{width: this.props.width}}>
                    {this.state.rows}
           </div>
       );
  }
  ```

  ​

* shouldComponentUpdate

  shouldComponentUpdate 这个函数会在组件重新渲染之前调用。函数的返回值确定了组件是否需要重新渲染。函数默认的返回值是true，只要props和state发生了变化就会重新构建虚拟DOM，然后使用diff算法比较。 函数的返回值如果是false 就不需要重新渲染。

  ​

* Immutable.js

  基本原则是对于不变的对象返回相同的引用，而对于变化的对象，返回新的引用。因此对于状态的比较只需要使用如下代码

  ```javascript
  shouldComponentUpdate() {
      return ref1 !== ref2;
  }
  ```

  ​

* 动静分离

  ```Javascript
  <ScrollTable width={300} color="red" scrollTop={this.props.offsetTop} />

  // 推荐写法
  <OuterScroll>
    <InnerTable width={300} color='red' />  
  </OuterScroll>
  ```

  offsetTop 是代表可视区距离浏览器上边界的距离。 随着鼠标的滚动，这个值将会不断的发生变化。导致组件的props不断的发生变化，组件也会不断的重新渲染。

  ​

* Container and Component 

  我们可以通过组件的容器来隔离外界的变化。**容器就是一个数据层，而组件就是专门负责渲染**，不进行任何数据交互 只根据得到的数据渲染相应的组件。

  ​



#### React 的 key属性的原理和用法

React元素可以具有一个特殊的属性key, 这个属性不是给用户自己用的 是给React自己用的。 如果我们动态地创建React元素 或者元素包含的数量或顺序不确定的子元素时候 我们就需要提供key这个特殊的属性。

```javascript
const UserList = props => {
  <div>
    <h1>用户列表</h1>
    {props.users.map(u => <div key={u.id}>{u.id}:{u.name}</div>)} // 没有提供key
  </div>
}
```

当我们知道组件属性变化了之后，其render方法会被重新调用 组件会被重新渲染 比如UserList组件的users 属性改变了 就要重新渲染UserList组件。 由于其处在一个长度不确定的数组中 React需要判断 对数组中的每一项 到底是新创建一个元素加入到页面还是更新原来的。

数组中的元素传一个唯一的key 就很好的解决这个问题。 React 会比较更新前后的元素的key值。 如果相同则更新 如果 不同则销毁之前的元素 重新创建一个元素

* ​























