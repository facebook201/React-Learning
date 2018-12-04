## Fragments 类似于Vue的template



每个组件都有一个根标签来包围里面的节点。例如

```jsx
render() {
  return (
    <div>
      <span>1</span>
      <div>2</div>	
    </div>
  );    
}
```



但是有些情况下 渲染一些有效的html。不需要子组件里面的根标签。 有几个方案



### 1 数组

```jsx
function () {
    return [
        <div> 一步01 </div>
        <div> 二步02 </div>
        <div> 三步03 </div>
        <div> 四步04 </div>
    ];
}
// 这里需要使用key属性 不然会报错
```





#### 2 Fragments React16.3

```jsx
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

React.Fragment 的语法糖是 <></> 但是有的工具不支持。还有一种情况如果在循环里面使用了 React.Fragments 要带上key属性。目前是唯一的属性。