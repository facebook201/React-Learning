```javascript
// app.js
class App extends Component {
  render() {
    return (
      <div>
        <h1>React-router</h1>
        <h1>React Router Tutorial</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/home">Homes</Link></li>
        </ul>
      	// 替换child 类似于vue的 router-view
        {this.props.children}
      </div>
    );
  }
}

// index.js
import { Router, Route, hashHistory, IndexRoute } from 'react-router'; // 3.0版本
import App from './component/app';
import About from './component/about';
import Home from './component/home';

render(
  <Router history={hashHistory}> // 
    <Route path="/" component={App}> // 这里类似于一级路由
      <IndexRoute component={Home} /> // 使用 IndexRoute 来设置一个默认页面。
      <Route path="home" component={Home}/>  // 二级路由 里面还可以嵌套
      <Route path="about" component={About}>
  	    // 添加一个路由 嵌套进我们想要的UI里
  	    <Route path="message/:id" component={Message} />
  		// 这里可以访问about/messages/jkei3c32 会匹配一个新路由
      </Route>
    </Route>
  </Router>
, document.getElementById('root'));


```



#### 获取URl参数

你也可以通过 query 字符串来访问参数。比如你访问 `/foo?bar=baz`，你可以通过访问 `this.props.location.query.bar` 从 Route 组件中获得 `"baz"` 的值。

```javascript
  componentDidMount() {
    // 来自于路径 `/inbox/messages/:id`
    const id = this.props.params.id

    fetchMessage(id, function (err, message) {
      this.setState({ message: message })
    })
  },
```



#### 路由配置

路由配置是一组指令，用来告诉 router 如何[匹配 URL](http://react-guide.github.io/react-router-cn/docs/guides/basics/RouteMatching.html)以及匹配后如何执行代码。

```javascript
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/home">Homes</Link></li>
          <li><Link to="message/:3">Message</Link></li>
        </ul>
        {this.props.children}  


<Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home}/>
      <Route path="about" component={About}>
        // 这里就是 about/message/3
        <Route path="message/id" component={Message} />
      </Route>
    </Route>
  </Router>
```



#### 让 UI 从 URL 中解耦出来

我们可以将 `/inbox` 从 `/inbox/messages/:id` 中去除，并且还能够让 `Message` 嵌套在 `App ->Inbox` 中渲染，那会非常赞。绝对路径（绝对路径可能无法使用动态路由）可以让我们做到这一点。

```javascript
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/home">Homes</Link></li>
          <li><Link to="/message/:3">Message</Link></li>
        </ul>
        {this.props.children}  


<Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home}/>
      <Route path="about" component={About}>
        // {/* 使用 /messages/:id 替换 messages/:id */} 但是有个问题 如果有人访问 about/message/4 就会看到一个错误的页面 这样不好 所以可以使用重定向
        <Route path="/message/id" component={Message} />

        {/* 跳转 /about /messages/:id 到 /messages/:id */}
        <Redirect from="messages/:id" to="/messages/:id" />
         // 当有人点击 /about/messages/5 这个链接，他们会被自动跳转到 /messages/5
      </Route>
    </Route>
  </Router>
```



#### 进入和离开的钩子函数

Route可以定义onEnter和onLeave两个hook。 在**权限验证或者路由跳转前将一些数据持久化保存起来**。在路由跳转过程中。onLeave会在所有将离开的路由中触发，从最下层的子路由开始直到最外层父路由结束。onEnter会从最外层的父路由开始直到最下层子路由结束。 这两个钩子有三个参数

```javascript
(nextState, replace, callback) => {
  // nextState 是返回当前路由的状态对象 里面主要有 location {pathname路径名,} params 带的参数
  // replace 是一个函数 ({pathname: '/', query: router.query, state: '' })
  // callback
}
const require = (nextState, replace, callback) => {
  if (nextState.location.pathname === '/home') {
      replace({pathname: '/'}); // 路由转发
  }
  console.log('我进来了');
}

const hook = (nextState) => {
  console.log('我出去了');
}

<Route path="home" component={Home} onEnter={require} onLeave={hook} />
  <Route path="about" component={About}>
    <Route path="/message/:id" component={Message} />
  </Route>
</Route>
```



#### History

React Router 是建立在history 之上的。它知道怎么去监听浏览器地址栏的变化。解析这个URL转化为location对象。

**browserHistory**  是React推荐的history。 创建一个像 example.com/some/path的URL



#### IndexRoute 与 IndexLink

默认路由是为了解决App内部的this.props.children为undefined的问题。

<IndexRoute component={Home} />



#### 高级路由

React-router和组件加载都是异步完成的。 不仅允许你延迟加载组件。还可以延迟加载路由配置。

**动态路由其实就是动态加载** 比如我们按照用户的权限来加载内容，有这个权限才会给你加载信息，不像静态路由那样全部加载进来

```javascript
// 动态路由匹配 主页
const applyHome = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./component/home').default)
  }, 'applyHome')
}
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute getComponent={applyAbout} /> 
// 当你点击这个路径的时候 会根据权限来判断 权限可以根据 进入路由的钩子来判断
      <Route path="home" getComponent={applyHome} />
      <Route path="about" getComponent={applyAbout}>
        <Route path="/message/:id" getComponent={applyMessage} />
      </Route>
    </Route>
  </Router>
```





### API

* <Link></Link> 以适当的href去渲染一个可访问的锚描述

* Props

  * activeClassName 当一个route是激活状态 link可以接收传入的className。失活状态下是默认的class。
  * activeStyle 当某个人router是激活状态 可以将样式添加到链接元素上
  * onClick (e) 自定义点击事件的处理方法。如处理<a> 标签一样。调用 e.preventDefault()防止过度点击。e.stopPropagation() 防止冒泡的事件。

  ​

