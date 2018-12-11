## React.Component



#### React.PureComponent

PureComponent通过prop和state的浅对比来实现shouldComponentUpdate。



**React.PureComponent 的 shouldComponentUpdate() 只会对对象进行浅对比。如果对象包含复杂的数据结构，它可能会因深层的数据不一致而产生错误的否定判断(表现为对象深层的数据已改变视图却没有更新, 原文：false-negatives)。当你期望只拥有简单的props和state时，才去继承PureComponent** ，或者在你知道深层的数据结构已经发生改变时使用 [`forceUpate()`](https://react.docschina.org/docs/react-component.html#forceupdate) 。或者，考虑使用 [不可变对象](https://facebook.github.io/immutable-js/) 来促进嵌套数据的快速比较。

此外,React.PureComponent` 的 `shouldComponentUpate() 会忽略整个组件的子级。请确保所有的子级组件Pure





#### PureComponent的 浅比较

PureComponent是React中创建组件的一种方式。 可以减少不必要的更新。每次更新会自动更新前后的props和state进行简单的比较。来决定是否进行更新。

```javascript
if (ctor.prototype && ctor.prototype.isPureComponent) { // 判断组件是否继承的PureComponent
  return (
    !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
  );
}

function shallowEqual(objA, objB) {
  // 如果相等
  if (is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== 'object' || objA === null
    typeof objB !== 'object' || objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  // 比较两个对象属性的长度
  if (keysA.length !== keys.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}
```

* 通过is函数对两个参数进行比较 判断是否相同 相同直接返回 true
* 如果两个参数不相同 判断两个参数是否至少有一个不是引用类型 存在即返回false 如果两个都是引用类型对象 继续比较下面
* 判断两个不同引用类型对象是否相同
  * 先通过key 获取到两个对象的所有属性 具有相同属性 每个属性值相同即两个对象相同









### render() 函数

render() 方法是必须的。且是纯净的。意思是不应该改变组件的状态。每次调用都应该返回相同的结果。不直接和浏览器交互。 将任务放在componentDidMount()阶段或其他的生命周期。 **如果shouldComponentUpdate 返回false render函数不会被调用。**









