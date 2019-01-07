



#### 高阶组件

高阶组件其实只是一个装饰器模式，用于增强原有组件的功能。

**高阶组件其实并不是组件，只是一个函数而已**。它接收一个组件作为参数，返回一个新的组件。我们可以在新的组件中做一些功能增加，渲染原有的组件。这样返回的组件增强了功能，但渲染与原有保持一致，没有破坏原有组件的逻辑。因此在提取不同类别组件**相似的行为**时，高阶组件是非常合适的选择。举例说明的话，组件异步加载、异步加载 script 后显示组件、数据源绑定、拖拽排序。











假设有一个简单的组件 有name和age通过props传入后初始化的state 一个年龄输入框 一个点击后focus输入框的按钮和一个静态方法。

```jsx
class Student extends React.Component {
  static sayHello() {
    console.log('hello from Student'); // eslint-disable-line
  }
  constructor(props) {
    super(props);
    console.log('Student constructor');
    this.focus = this.focus.bind(this);
  }

  componentWillMount() {
    console.log('Student componetWillMount');
    this.setState({
      name: this.props.name,
      age: this.props.age
    });
  }

  componentDidMount() {
    console.log('Student componentDidMount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('Student componentWillReceiveProps');
    console.log(nextProps);
  }

  focus() {
    this.inputElement.focus();
  }

  render() {
    return (
      <div>
        <p>姓名: {this.state.name}</p>
        <p>
          年龄:
          <input
            value={this.state.age}
            ref={(input) => {
              this.inputElement = input;
            }}
          />
        </p>

        <p>
          <input
            type="button"
            value="focus input"
            onClick={this.focus}
          />
        </p>
      </div>
    );
  }
};

```



一般来说 高阶组件中返回新组件有三种形式:



**1、直接返回一个 stateless component**

```jsx
function EnhanceWrapper(WrappedComponent) {
    const newProps = {
        source: 'app'
    };
    return props => <WrappedComponent {...props} {...newProps} />;
}
```

无状态的组件 没有自己内部state以及生命周期，所以这种方式常用于对组件的props进行简单统一的逻辑处理。

* √   原组件所在位置（能否被包裹或包裹其他组件）
* √   能否取到或操作原组件的props
* 乄 能否取到或操作state
* 乄 能否通过ref访问到原组件中的dom元素
* X  是否影响原组件生命周期等方法
* √   是否取到原组件static方法
* X  能否劫持原组件生命周期
* 乄  能否渲染劫持



```jsx

```

