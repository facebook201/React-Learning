#### 阮一峰教程

Redux的设计思想很简单 就两句话

* Web 是一个状态机、试图与状态是一一对应的。
* 所有的状态、保存在一个对象里面。



#### 基本概念和API

* Store 保存数据的地方 可以看成一个容器。整个应用只能有一个Store。

  ```javascript
  // Redux 提供createStore这个函数 用来生成Store

  import { createStore } from 'redux';
  const store = createStore(); // 接收另一个函数作为参数返回新生成的Store对象
  ```

  ​

* State 

  Store 包含所有的数据， State是保存数据的。 当前的State 通过store.getStore() 拿到。

  ```javascript
  import { createStore } from 'redux';
  const store = createStore(fn);
  const state = store.getState();

  // 只要State相同 View就相同 
  ```

  ​

* Action Action就是View发出的通知 表示State要发生变化。Action是一个对象，其中type属性是必须的。表示Action的名称。 

  ```javascript
  const action = {
    type: 'ADD_TODO',
    payload: 'Learn Redux'
  };
  ```

  Action 描述当前发生的事情，改变State的唯一办法就是 使用Action。它会运送数据到Store。

  ​

* store.dispatch() View发出Action唯一方法

  ```javascript
  import { createStore } from 'redux';
  const store = createStore(fn);

  store.dispatch({
    type: 'ADD_TODO',
    payload: 'Learn Redux'
  });
  ```



#### Reducer 

Store 收到Action以后，必须给出一个新的State，这样View才会发生变化。 这种计算过程叫Reducer。

Reducer 是一个函数 接受Action和当前State作为参数 返回一个新的State

```javascript
const reducer = function(state, action) {
    return new_state;
}
```



### store.subscribe()

store 允许使用 store.subscribe方法设置监听函数。 一旦发生变化 自动执行这个函数。

```javascript
import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);

let unsubscribe = store.subscribe(() => { // 监听state变化
   console.log(store.getState()); 
});
unsubscribe();
```



### Store 的实现 store的三个方法

* store.getState()
* store.dispacth()
* store.subscribe()



工作流

* 用户发出 Action  store.dispatch(action);

* Store自动调用Reducer 并且传入两个参数 当前State和收到的Action

* state一旦有变化 Store就会调用监听函数 store.subscribe(listener); // 监听函数

  ​