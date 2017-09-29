#### Flux

Flux是一种架构思想 解决软件的复杂结构问题。

分为四个部分：

* View: 视图层
* Action: 视图层发出的消息 比如mouseClick
* Dispatcher: 派发器 接收Actions、执行回调函数
* Store: 数据层 用来存放应用的状态 一旦发生变动 提醒Views 要更新页面



![border](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016011503.png)

Flux 最大的特点就是 ”单向数据流动“

* 用户访问view
* view发出用户的Action
* Dispatcher 收到Action 要求 Store 进行相应的更新
* Store 更新之后 发出一个 "change" 事件 
* View 收到事件之后 更新页面



#### Vuex











#### Redux





