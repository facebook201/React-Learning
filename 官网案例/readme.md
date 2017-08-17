
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

