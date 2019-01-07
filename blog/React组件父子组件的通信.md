### React 组件通讯

React中的组件关系是从属关系 有父子 有兄弟（有同级 不同级） 

 父组件可以向子组件通过传props的方式 向子组件进行通讯。

```javascript
class Parent extends React.Component {
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
    return <Child_1 msg={this.state.msg} />;
  }
}

class Child_1 extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.msg}</p>
        //如果父组件与子组件之间不止一个层级  通过...扩展运算符展开 将父组件的信息 以简单的方式传递给更深层级的子组件。
        <Child_1_1 {...this.props} />
      </div>
    );
  }
};


class Child_1_1 extends React.Component {
  render() {
    return <p>{this.props.msg}</p>
  }
};
```

如果父组件与子组件之间不止一个层级  通过...扩展运算符展开 将父组件的信息 以简单的方式传递给更深层级的子组件。



> 子组件向父组件通讯

父组件可以通过传递props的方式。 自顶而下向子组件进行通讯。**而子组件向父组件通讯 , 同样需要父组件向子组件传递props进行通讯，只是父组件传递的是作用域为父组件自身的函数，子组件调用该函数 将子组件想要传递的信息 作为参数，传递到父组件的作用域中 **

```jsx
class Parent extends React.Component {
  state = {
    msg: 'start'
  };

  // 父组件中定义一个函数
  transferMsg(msg) {
    this.setState({
      msg
    });
  }

  render() {
    return (
      <div>
        <p>msg: {this.state.msg} </p>
        <Child_1 transferMsg = {msg => this.transferMsg(msg)} />
      </div>
    ); 
  }
}

class Child_1 extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.transferMsg('end');
    }, 1000);
  }

  render() {
    return (
      <div>
        <p>Child_1 Component</p>
      </div>
    );
  }
};
```



#### 兄弟组件通讯

首先向传给相同的父组件。然后在通过父组件传给另一个子组件

```javascript
class Parent extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: '子组件1'
    };
    this.transferMsg = this.transferMsg.bind(this);
  }

  transferMsg(msg) {
    this.setState({
      msg
    });
  }

  componentDidUpdate() {
    console.log('parent Update');
  }

  render() {
    return (
      <div>
        <Child_1 transferMsg={this.transferMsg} />
        <Child_2 msg={this.state.msg} />
      </div>
    ); 
  }
}

class Child_1 extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.transferMsg('修改子组件的值');
    }, 1000);
  }

  componentDidUpdate() {
    console.log('child_1 update');
  }

  render() {
    return (
      <div>
        <p>Child_1</p>
      </div>
    );
  }
};

class Child_2 extends React.Component {
  
  componentDidUpdate() {
    console.log('child_2 update');
  }

  render() {
    return (
      <div>
        <p>Child_2 component: {this.props.msg}</p>
        <Child_2_1 />
      </div>
    );
  }
};

class Child_2_1 extends React.Component {
  
  componentDidUpdate() {
    console.log('child_2_1 update');
  }

  render() {
    return (
      <div>
        <p>Child_2_1</p>
      </div>
    );
  }
};
```



但是有个问题。parent的state发生变化，会触发parent以及从属与parent的子组件的生命周期。

![border]()

那有没有其他的方法来解决这个问题？



#### 观察者模式

观察者模式也叫发布订阅模式 发布者发布事件 订阅者监听事件并作出反应 。

```javascript
class Parent extends React.Component {

  componentDidUpdate() {
    console.log('parent Update');
  }

  render() {
    return (
      <div>
        <Child_1 />
        <Child_2 />
      </div>
    ); 
  }
}

class Child_1 extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      // 发布msg 事件
      eventProxy.trigger('msg', 'end');
    }, 1000);
  }

  componentDidUpdate() {
    console.log('child_1 update');
  }

  render() {
    return (
      <div>
        <p>Child_1</p>
      </div>
    );
  }
};

class Child_2 extends React.Component {

  constructor() {
    super();
    this.state = {
      msg: 'start'
    };
  }
  
  componentDidUpdate() {
    console.log('child_2 update');
  }

  componentDidMount() {
    // 监听msg事件
    eventProxy.on('msg', (msg) => {
      console.log(msg);
      this.setState({
        msg
      });
    });
  }

  render() {
    return (
      <div>
        <p>Child_2 component: {this.state.msg}</p>
        <Child_2_1 />
      </div>
    );
  }
};

class Child_2_1 extends React.Component {
  
  componentDidUpdate() {
    console.log('child_2_1 update');
  }

  render() {
    return (
      <div>
        <p>Child_2_1</p>
      </div>
    );
  }
};
```







##### eventProxy.js

```javascript
'use strict';

const eventProxy = {
  ret: [],
  eventKeys: [],
  on(eventName, fn) {
    if (eventName) {
      if (!this.eventKeys.includes(eventName)) {
        this.eventKeys.push(eventName);
        this.ret.push({
          key: eventName,
          callback: fn
        });
      }
    }
  },
  // 触发
  trigger(eventName, value) {
    if (eventName && this.eventKeys.includes(eventName)) {
      const ret = this.ret.filter(ele => {
        return ele.key === eventName;
      });
      ret[0].callback(value);
    }
  }
};

export default eventProxy;
```



#### Redux









