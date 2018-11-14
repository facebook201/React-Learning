### JSX原理

javascript对象是如何用来表现DOM元素的结构。 举个🌰

```html
<div class="box" id="box">
    <div class="title">
        我是内部title
    </div>
    <button>
        Click me
    </button>
</div>
```

每个DOM元素的结构都可以用 javascript 对象来表示 你会发现一个DOM元素包含的信息其实就三个 

* 标签名 div
* 属性 class="box" id="box"
* 子元素 div button

所以可以这样表示

```javascript
{
    tag: 'div',
    attrs: { className: 'box', id: 'box' },
    children: [
        {
            tag: 'div'
            attrs: { className: 'title' },
        	children: ['我是内部title']
        },
        {
            tag: 'button',
            attrs: null,
            children: ['click me']
        }
    ]
}
```



React.js 就把javascript 的语法扩展了一下。让javascript可以支持写类似HTML标签结构的语法。

```react
class Header extends Component (
    render() {
    	// 可以在return之前定义变量 执行一些操作 返回最终需要渲染 但是要注意 {  } 来解析
    const Component = <upload {...data}>{}</upload>;
    	return (
			<div>
        		{
        			Component
        		}
    		</div>
		);
    }
);

ReactDOM.render(
  <Header />,
  document.getElementById('root');
);
```

**JSX就是 JavaScript 对象。js表达式 遇到 < 就当html解析 遇到 { 就当javascript解析**



```javascript
return (
  <div className={ 2 > 1 ? 'class-a' : 'class-b'}>{content}</div?
);

return (
  <div>
    { 2 > 1 ? <Nav /> : <div><div/div> }  
  </div>
);
```



#### JSX属性

* 使用引号来定义以字符串为值的属性
* 用大括号来定义以javascript 为表达式为值的属性

```javascript
const element = <div tabIndex="0"></div>;

const element = <img src={user.avatarUrl}></img>
```



#### JSX延伸属性

不要改变props。 有些属性是在后续添加的 没有办法一开始就确定 



```javascript
const component = <Component />;

component.props.foo = x; // bad
```

初始化完成的props后。 props是不可变的 所以引入了 延伸属性。

```javascript
const props = {
    foo: x,
    bar: y
};

const component = <Component {...props} />;

// 如果需要覆盖
let props = {foo: 'default'};

const component = <Component {...props} foo={'override'} />
```



#### JSX陷阱

style属性

```javascript
React.render(
  <div style="{{color: 'rde'}}">
    XXX 
  </div>,
  document.body
);
```



**自定义属性 如果有自定义属性 React是不会渲染的 **

```javascript
React.render(
  <div dd="xxx"> content </div>,
  document.body
);

// 要这样用
React.render(
  <div data-dd='xxx' aria-dd='xxx'></div>
);
```



















