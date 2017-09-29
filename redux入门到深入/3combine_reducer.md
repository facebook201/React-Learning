很显然 一个reducer 是很难hold住整个应用所有的action操作。 Redux 可以把多个合并成一个

```javascript
// 定义两个reducer 一个是对象 一个数组
export const userReducer = function(state = {}, action) {
  switch (action.type) {
    case 'SAY_SOMETHING':
      return {
        state: state,
        message: action.value
      }
    default:
      return state;
  }
}

// 空数组
export const itemsReducer = function(state = [], action) {
  switch (action.type) {
    case 'PUSH_ELEMENT':
      return {
        state: state.push(1),
        message: action.value
      }
    default:
      return state;
  }
}

```



reducer 可以处理任何类型的数据结构。 在多个reducer模式下面 我们可以让每个reducer 只处理整个应用的部分state。 但是我们要知道 createStore 只接收一个reducer函数。 所以要用到 combineReducers 辅助函数。

**它接收一个对象并返回一个函数，当combineReducers被调用时，会去调用每个reducer 并把返回的每一块state 重新组合成一个大state对象**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import * as reducer from './reducer';

const store = createStore(combineReducers(reducer));
// store 的结构就是
{
  userReducer: {},
  itemsReducer: []
}

export default class Root extends React.Component {

  items(data) {
    return {
      type: 'PUSH_ELEMENT',
      data
    }
  }
  componentDidMount() {
    console.log(store, store.getState());
    // 这里在组件里面触发action 来执行redu函数 从而改变state
    store.dispatch(this.items({}));
    console.log(store.getState());
  }

  render(){
    return(
      <div>
        <h1>Redux</h1>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('app'));

```























