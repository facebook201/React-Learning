中间件 处理异步action。 通常来说 应用中 A 和 B 部分中间的那一块。 中间件可以把A发送数据到B的形式转换为

A =====> middleware ====> middleware2 =====> … ======> B

最后形成的就是

action ====> dispatch =====> middleware1 ======> middleware2 =====> reducers

每当一个action 被分发时， 中间件就会被调用， 并在需要的时候协助 action creator 分发真正的action。

```javascript
// 中间件是纯粹的函数

var anyMiddleware = function ({ dispatch, getState }) {
  return function(next) {
    return function (action) {
      // 中间件业务代码    
    }      
  }
}

```

中间件是由三个嵌套的函数构成 会依次调用

* 第一层想其余两层分发函数 和 getState函数
* 第二层 提供next 函数。 允许 显示的将处理过得输入传递给下一个中间件 或 Redux
* 第三层 提供一个中间件 或 从 dispatch 传递过来的 action 可以调用一个中间件 或者 以想要的方式处理 action





























 