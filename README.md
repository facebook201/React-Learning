# react-learning

React的学习历程

* 文件头部引入React 和 React.js 的组件父类Component。只要写react组件 就必须引入这两个
* ReactDOM 帮助我们把React组件渲染到页面上去。 可以发现它是从react-dom中引入的。而不是从react引入。ReactDOM.render 功能就是把组件渲染并且构造DOM树，然后插入到页面上某个特定的元素上。
![border](http://huzidaha.github.io/static/assets/img/posts/44B5EC06-EAEB-4BA2-B3DC-325703E4BA45.png)

有可能会有人问 为什么不直接从JSX直接渲染DOM结构。

* 第一 我们有时候不一定立即把元素渲染到普通页面上。 我们有可能把这个结构渲染到canvas上。或者手机APP。 可以想象有一个react-canvas 可以帮我们帮我们把UI渲染到canvas上。或者是有一个react-app 可以帮我们转换成原生APP(ReactNative)。
* 第二 有这个对象之后 数据发生变化之后。 需要更新组件的时候。 就可以用比较快的算法操作这个对象。而不用直接操作页面的DOM。 减少浏览器的重排 优化性能。

```javascript
import React, { Component } form 'react'; // 必须引入


```
所谓的JSX语法就是JavaScript对象的表示。

* JSX 是 JavaScript 语言的一种语法扩展，长得像 HTML，但并不是 HTML。
* React.js 可以用 JSX 来描述你的组件长什么样的。
* JSX 在编译的时候会变成相应的 JavaScript 对象描述。
* react-dom 负责把这个用来描述 UI 信息的 JavaScript 对象变成 DOM 元素，并且渲染到页面上。


#### 组件的render方法
在编写 React.js 组件的时候，一般都需要继承 React.js 的 Component.一个组件类必须要实现一个 render 方法，这个 render 方法必须要返回一个 JSX 元素。但这里要注意的是，必须要用一个外层的 JSX 元素把所有内容包裹起来。返回并列多个 JSX 元素是不合法的。

```javascript
render () {
  const word = 'is good'; // 表达式插入
  return (
    <div>
      <h1>React 小书 {word}</h1>
    </div>
  )
}

// 类名
render () {
  const className = 'header';
  return (
    <div className={className}>
      <h1>React 小书</h1>
    </div>
  )
}
```

简而言之 {} 里面可以放任何的JavaScript代码