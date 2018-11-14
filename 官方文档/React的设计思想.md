### React 的设计思想



#### 变化

UI只是把数据通过映射关系变成另一种形式的数据。同样的输入必有同样的输出。这恰好是纯函数。







#### 抽象

不可能只通过一个函数就能实现复杂的UI。你需要把UI抽象成多个隐藏内部细节。 又可复用的函数 通过在一个函数中调用另一个函数来实现复杂的UI。





#### 组合

抽象的容器再次进行组合 类似高阶函数。





#### 状态 State

UI 不单单是对服务器或业务逻辑状态复制。实际上还有很多状态针对具体的渲染目标。



#### Memoization 记忆化

对于纯函数 使用相同的参数一次次调用有点浪费资源。 可以创建一个函数的memorized 版本。 用来追踪最后一个参数和结果。

```javascript
function memoize(fn) {
    // 缓存参数
    var cahedArg;
    // 保存结果
    var cachedResult;
    
    return function(arg) {
        // 如果参数相同 直接返回之前缓存的结果
        if (cachedArg === arg) {
            return cachedResult;
        }
        cachedArg = arg;
        cachedResult = fn(arg);
        retur cachedResult;
    }
}
```





b