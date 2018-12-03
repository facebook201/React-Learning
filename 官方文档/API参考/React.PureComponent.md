## React.Component



#### React.PureComponent

PureComponent通过prop和state的浅对比来实现shouldComponentUpdate。



**React.PureComponent 的 shouldComponentUpdate() 只会对对象进行浅对比。如果对象包含复杂的数据结构，它可能会因深层的数据不一致而产生错误的否定判断(表现为对象深层的数据已改变视图却没有更新, 原文：false-negatives)。当你期望只拥有简单的props和state时，才去继承PureComponent** ，或者在你知道深层的数据结构已经发生改变时使用 [`forceUpate()`](https://react.docschina.org/docs/react-component.html#forceupdate) 。或者，考虑使用 [不可变对象](https://facebook.github.io/immutable-js/) 来促进嵌套数据的快速比较。

此外,React.PureComponent` 的 `shouldComponentUpate() 会忽略整个组件的子级。请确保所有的子级组件Pure





### render() 函数

render() 方法是必须的。且是纯净的。意思是不应该改变组件的状态。每次调用都应该返回相同的结果。不直接和浏览器交互。 将任务放在componentDidMount()阶段或其他的生命周期。 **如果shouldComponentUpdate 返回false render函数不会被调用。**









