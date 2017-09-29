异步Action

之前的同步都是返回action，而是返回function。这个function 会在合适的时机 dispatch action. 但是如果我们希望这个function 能够dispatch action。那么就需要向它传入dispatch 函数。

```javascript
export const asyncSayAction = function(message) {
  return function(dispatch) {
    setTimeout(() => {
      dispatch({
        type: 'SOMETHING',
        message
      });    
    });
  }
}

// Action
  asyncSayActionCreator() {
    return function(dispatch) {
      setTimeout(() => {
        dispatch({
          type: 'PUSH_ELEMENT'
        });
      }, 2000);
    }
  }

  componentDidMount() {
    store.dispatch(this.asyncSayActionCreator());
    console.log(store.getState());
  }
/// 输出：
//     ...
//     /Users/classtar/Codes/redux-tutorial/node_modules/redux/node_modules/invariant/invariant.js:51
//         throw error;
//               ^
//     Error: Invariant Violation: Actions must be plain objects. Use custom middleware for async actions.
//     ...

// 我们所设计的 function 似乎没有进入 reducer 函数。但是 Redux 给出了温馨提示：使用自定义中间件（middleware）来支持异步 action。
// 看来我们的方向是正确的，可中间件（middleware）又是什么呢？

// 我向你保证 action creator asyncSayActionCreator_1 不仅没有问题，而且只要我们搞清楚 middleware 的概念并掌握它的使用方法，
// 这个异步 action creator 就会按照我们所设想的结果执行。
```

