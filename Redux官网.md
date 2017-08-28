### 整个流程图

View ==> action ==> reducer ==> store(State)  ==> view 

首先 store(state) 决定了view。 然后用户与view的交互会产生action。 这些action会触发Reducer 改变state。 然后state的改变又会造成view的改变。



**Redux** 是为了更好的模块通信。 通过一个数据对象来维护模块通信。



首先我们要熟悉React是什么东西。

* React 有 props和state。 Props 意味着父级分发下来的属性。state意味着组件内部可以自行管理的状态，并且整个React没有数据向上回溯的能力。也就是说数据只能单向向下分发，或者自行内部消化。

* 一个React组件内部可能是一个完整的应用，它自己工作良好。但是有时候无法让两个组件相互交流。 使用对法的数据。这时候唯一的办法就是提升state。 将state放到共有的父组件中来管理。再作为props分发回子组件。

* 子组件改变父组件state的办法只能是通过onClick触发父组件声明好的回调，也就是父组件提前声明好函数或方法作为契约描述自己的state将如何变化。再将它同样作为属性交给子组件使用

* 为了面临所有可能的扩展，最容易的办法就是把所有的state 集中放到所有组件顶层。 然后分发给所有组件

  这就是Redux。



a: 需要回调通知state（等于回调参数） ==> action

b: 需要根据回调处理（等同于父级方法）==> reducer

c: 需要state （等同于总状态）==> store 



Redux的三个要素：

a: action 是纯声明式的数据结构  纸提供事件的所有要素 不提供逻辑。

b: reducer 是一个匹配函数。 action的发送时全局的：所有的reducer都可以捕捉到并匹配与自己相关与否。 相关就拿走action中的要素进行逻辑处理。修改store的状态。不相关就不对state做处理原样返回。

c: store 负责存储状态并可以react api回调。 发布action。



还有一个binding 叫做react-redux。 提供一个Provider 和 connect。

1> Provider是一个普通组件 可以作为顶层app的分发点。 只需要store属性就可以了 会将state分发给所有被connect的组件。不管在哪里 被嵌套多少层

```javascript
app.js

import {Provider} from 'react-redux';
import store from './Redux/Store/Store';

store.subscribe(() => { // 监听state的变化
   // console.log(store.getState()); 
});

render(
	<Provider store={store}>
  		{route}
    </Provider>,
  	document.getElementById('app');
);
```



2> connect 是真正的重点，它是一个柯里化函数。接受两个参数（数据绑定mapStateToProps 和 事件绑定 mapDispatchToProps）, 再接受一个参数



 

### 三大原则

* 单一数据源

  整个应用的state被存储在一颗 object tree里面。 

  ​

* State 是只读的

  唯一改变state的方法就是触发action。 action是一个用于描述已发生时间的普通对象。

  ```Javascript
  store.dispacth({
     type: 'COMPLETE_TODO',
     index: 1
  });

  store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'SHOW_COMPLETED'
  })
  ```

  ​

* 使用纯函数来修改

  **为了描述action如何改变state tree。需要编写reducers** 

  Reducer只是一些纯函数。接收先前的state和action。返回新的state。 开始你可以只有一个Reducer。随着应用的增大 你可以拆分成多个小的。 分别独立的操作 state。

  ​

  ​

  ### 基础

  ​

  #### Action

  Action 是把数据从应用传到store的有效载荷。是store数据的**唯一**来源。 一般通过store.dispatch() 将action传到store。

  ​

  ```javascript
  /**
   * action 类型
   */
  export const ADD_TODO = 'ADD_TODO';

  /* 其他的常量 */
  export const VisibilityFilters = {
      SHOW_ALL: 'SHOW_ALL',
    	SHOW_ACTIVE: 'SHOW_ACTIVE'
  };

  /*action创建函数*/

  export const addTodo = (text) => {
      return {
          type: ADD_TODO,
          text
      }
  }

  ```

  **Action是描述了有事情发生** 但是没有指明如何更新state。 这是reducer要做的事情。

  ​

  #### Reducer

* 设计State的结构

  ​

* Action处理

  确定好state对象结构之后。就开始开发reducer。它就是一个纯函数。接收**旧的state和action。 返回新的state**。

  **纯函数指的是： 不依赖于且改变它作用域之外的变量状态的函数。纯函数的返回值由它调用时的参数决定**

  ```javascript
  (previousState, action) => newState
  ```

  **永远不要在reducer里面做这些操作。**

  * 修改传入参数
  * 执行有副作用的操作，API请求和路由跳转
  * 调用非纯函数。Math.random() Date.now() 

  ​

  ​

  ### Store 

  前面action 描述发生了什么、 使用reducers根据action更新state。 

  **store就是把他们联系到一起**

  * 维持 应用的state
  * 提供getState() 方法获取state
  * dispatch(action) 方法更新state
  * subscribe(listener) 注册监听器
  * subscribe(listener) 返回的函数注销监听器

  ​

  **Redux只有一个单一的store。** 当需要拆分数据处理逻辑的时候。 应该使用reducer组合。 不能创建多个store。

  ​

  store.js

  ```javascript
  import { createStore, combineReducers } from 'redux';
  import * as reducer from '../Reducer/Index'; // 传入所有的reducer 等待合并

  // 创建 Redux store 来存放应用中所有的state。应用中有且仅有一个store
  // createStore 用来生成 store
  var store = createStore(
  	combineReducers(reducer)
  );

  export default store;
  ```

  ​

  ​

  ​

  ### 数据流

  严格的单向数据流是redux的核心。 使得你的应用变得更加容易理解 同时变得可以预测。

  **Redux的生命周期的4个步骤**

  * 调用 store.dispacth(action)

    Action 就是一个描述 “发生了什么” 的普通对象。 可以在任何地方调用 dispatch(action)

    ```javascript
    {type: 'ADD_TODO', text: 'Read the Redux docs.' }
    {type: 'LIKE_ARTICLE', articleId: 42 }
    // 可以理解为 在 ‘任务列表里面添加了学习Redux文档’ 玛丽喜欢42号文章
    ```

    ​

  * Redux store 调用传入的reducer函数

    store 会把两个参数传入reducer：当前的state树和action。 在这个todo应用中 根reducer可能接受这样的数据：

    ```javascript
    // 当前应用的state TODO列表和选中的过滤器
    let previousState = {
      visibleTodoFilter: 'SHOW_ALL',
      todo: [
        {
          text: 'Read the docs',
          complete: false
        }
      ]
    };

    // 要执行的action
    let action = {
      type: 'ADD_TODO',
      text: 'UnderStand the flow'
    };

    // render 返回处理后的应用状态
    let nextState = todoApp(previousState, action);

    ```

  * 根reducer 应该把多个子reducer输入合成一个单一的state 树。

    ```javascript
    // 加入我有两个reducer 一个TODOlist 一个是当前选择的过滤器设置

    function todos(state = [], action) {
        return nextState;
    }

    function visibleTodoFilter(state = 'SHOW_ALL', action) {
        return nextState;
    }

    // 合并reducer
    let todoApp = combineReducers({
       todos,
       visibleTodoFilter
    });
    ```

    ​

  * Redux store 保存了根reducer返回的完整state树

    ​

    ​

    ​

  ​

  ​

  ​

  ​

  ​

  ​

  ​

  ​

  ​

  ​

  ​

  ​