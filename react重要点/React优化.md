#### React优化点



> 1 不要使用index当做key值



因为React的状态改变之后。会触发render函数。生成新的虚拟DOM树。这时候就进行新老DOM对比。

假如使用的index作为key

```jsx
// key={index}

// 老dom
<li key="0"> 1 </li>
<li key="1"> 2 </li>
<li key="2"> 3 </li>

// 新dom
<li key="0"> 0 </li>
<li key="1"> 1 </li>
<li key="2"> 2 </li>
<li key="3"> 3 </li>


// 如果是id或者是值的字符串形式

// 老dom
<li key="001"> 1 </li>
<li key="002"> 2 </li>
<li key="003"> 3 </li>

// 新dom
<li key="000"> 0 </li>
<li key="001"> 1 </li>
<li key="002"> 2 </li>
<li key="003"> 3 </li>

```

然后发现

* 第一项key都是0 内容不同 替换文本
* 第二项key都是1 内容不同 替换文本
* 第三项key都是2 内容不同 替换文本
* 第四项key是3 新的 新增



这样子发现每一项都做了处理。

* 第一项key是新的 替换文本
* 第二项key都是001 不变
* 第三项 key都是002 不变
* 第四项 key 003 不变



**相同的key如果内容不同 则替换文本 如果内容相同 则不变**





> ## 2 将列表和列表项单独写成纯组件



```jsx
render(){
    render (
        <ul>
            {this.state.list.map(item=><li key={item.id}>{item.text}<li>)}
        </ul>
    )
}
```

当我们改变组件状态的时候，`reactjs`都会重建当前组件的整个虚拟dom树，也就是说不管你的`state.list`是否有改变，整个树都会重建，而这个时候列表的渲染是不必要的，当列表过长，组件状态更新频繁，甚至手机性能不佳的情况下，不断的重新创建虚拟dom树很有可能会导致页面帧数下降。



**纯组件跟普通组件没什么区别 它默认在`shouldUpdateComponent`里面默认做了**浅比较**，如果相同，则不会触发更新渲染。**



```jsx
function List(props) {
  return <li>{props.name}</li>
}

function Lists(props) {
  const numbers = props.numbers;
  const listItems = numbers.map(item => <List key={item.id} name={item.name} /> );
  return (
    <ul>
      { listItems }
    </ul>
  );
}

export default Lists;

// Lists

    const numbers = [
      { name: 'one', id: 1, title: '11'},
      { name: 'two', id: 2, title: '22'},
      { name: 'three', id: 3, title: '33'}
    ];

ReactDOM.render(
  <Lists numbers={numbers} />,
  document.body
);
```



> 3 shouldComponentUpdate

当props或state改变的时候。 如果他返回一个true，render会被调用。组件会重新渲染。





#### React.PureComponent 















