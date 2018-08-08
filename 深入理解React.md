React中, 数据流是自上向下单向的从父节点传递到子节点，所以组件是简单且容易把握的。他们需要从父节点提供props中获取数据并渲染。如果顶层组件的某个prop改变了 React会递归地向下遍历整个组件 重新渲染所有使用这个属性的组件。**props是组件唯一的数据来源，对于组件来说 props永远是只读的。 React每一个组件就是一个单独的状态，内部通过state来维护状态的变化。 这也是state的唯一作用** 



#### 事件处理

![border](https://mc.qcloudimg.com/static/img/06de736cc01b4284cf8ee2c70f0882d4/image.jpg)



![border](https://mc.qcloudimg.com/static/img/ad785060840a01bebf7da7ce498150c2/image.jpg)

#### React 的生命周期

生命周期可以分为三个部分

* 初始化 
* 更新
* 销毁

![border](https://mc.qcloudimg.com/static/img/dba5e6cddce25b078213d9083e2902bf/image.jpg)

组件类在声明时，会先调用 getDefaultProps() 方法来获取默认props值，这个方法会且只会在声明组件类时调用一次，这一点需要注意，它返回的默认props由所有实例共享。在组件被实例化之前，会先调用一次实例方法 getInitialState() 方法，用于获取这个组件的初始state.实例化之后就是渲染，componentWillMount方法会在生成虚拟DOM之前被调用，你可以在这里对组件的渲染做一些准备工作，比如计算目标容器尺寸然后修改组件自身的尺寸以适应目标容器等等。接下来就是渲染工作，在这里你会创建一个虚拟DOM用来表示组件的结构。对于一个组件来说，render 是唯一一个必须的方法。render方法需要满足这几点：

* 只能通过this.props 或 this.state访问数据
* 只能返回一个顶级组件
* 可以返回 null、false、或React组件
* 不能对props、state、或DOM进行修改
* render 返回的是虚拟DOM



组件被初始化完成后，它的状态会随着用户的操作、时间的推移、数据更新而产生变化，变化的过程是组件声明周期的另一部分。

![border](https://mc.qcloudimg.com/static/img/a58e42614d9321107f7a57b14529a9f7/image.jpg)

















