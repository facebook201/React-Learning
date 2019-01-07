### TS 报错

> 1 Cannot redeclare block-scoped variable 'name

在默认状态下，`typescript` 将 `DOM typings` 作为全局的运行环境，所以当我们声明 `name`时， 与 `DOM` 中的全局 `window` 对象下的 `name` 属性出现了重名。



既然与全局的变量出现重名，那我们将脚本封装到模块（[module](https://www.jianshu.com/p/78268bd9af0a)）内。`module` 有自己的作用域，自然不会与全局作用域的变量产生冲突。

```typescript
let name = 'bob';

export {}
```



