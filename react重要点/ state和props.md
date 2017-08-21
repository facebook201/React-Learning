Props 的只读性。 无论是函数还是类组件 都不能修改它自身的Props。要像纯函数那样来使用。它没有改变它自己的输入值，当传入的值相同时，总是会返回相同的结果



### State 

React的核心是组件化，组件里面最重要的是State（状态）。State是一个组件的UI数据模型。是组件渲染时的数据依据。

如何定义state （state必须能够代表一个组件UI的完整状态，组件的任何UI改变都可以从State里面中反映出来；同时 State还必须是代表一个组件UI的变化的最小状态集，所有的状态都是用于反映组件UI的变化 不会有多余的状态）可以从下面四个方面来判断一个变量是不是应该作为组件的状态

* 这个变量是否通过Props从父组件中获取？ 如果是 那就不是一个状态
* 这个变量是否在组件的整个生命周期里面都保持不变 如果是 那么不是一个状态。
* 这个变量是否可以通过其他状态（state）或者属性（props）得到，如果是那么就不是一个状态
* 这个变量是否在组件的render方法中使用？ 如果不是 那么它不是一个状态。这种更适合定义为组件的一个普通属性。例如组件中用到的定时器 this.timer.




#### State 和 Props的区别

除了State, 组件的Props也是和组件的UI 有关系。 他们之间的主要区别是 

* State是可变的，是组件内部维护的一组用于反映组件UI变化的状态集合；
* Props 对于使用它的组件来说 是只读的 要想修改Props 只能通过该组件的父组件修改。 在组件**状态上移**的场景中，父组件正是通过子组件的Props，传递给子组件其所需要的状态



### 怎么修改 State 

* **不能直接修改State**

  this.setState({title: 'React'});

  ​

* **State 的更新是异步的**

  调用setState，组件的state并不会立即改变，setState 只是把要修改的状态放入一个队列中。 并且可能出于优化的原因，可能会将多次setState的状态修改合并成一次状态修改。 所以不要依赖当前的State，计算下个State。 同样的不能依赖当前Props计算下个状态。因为Props一般也是从父组件的State中获取，依然无法确定在组件状态更新时的值。

  ​

* **State的更新是一个浅合并的过程**

  当调用setState 修改组件状态时，只需要传入发生改变的state。

  ​



### State与Immutable

State 中包含的状态都应该是不可变对象。当State中的某个状态发生改变，我们应该重新创建这个状态，而不是直接修改原来的状态。 那么 当状态发生改变时， 如何创建新的状态？ 根据状态的类型、分三种 

* 状态的类型是不可变类型（数字、字符串、布尔值、null、undefined）

  ```Javascript
  this.setState({
    count: 1,
    title: 'ss'
  });
  ```

* 状态是数组

  如果有一个数组类型的状态books，当向books中增加一本书的时候， 使用数组的concat方法 或者 ES6de数组扩展语法

  ```javascript
  // 将state先赋值给另外的变量 然后使用concat 创建新数组

  // 1 
  var books = this.state.books;
  this.setState({
     books: books.concat(['React Guide']); 
  });
  // 2 使用preState、concat 创建新的数组
  this.setState(preState => ({
    books: preState.bookd.concat(['React']);    
  }));

  // 3 ES6 的spread syntax
  this.setState(preState => {
     books: [...preState.books, 'React'] 
  });


  // 当从books过滤部分元素后，作为新状态时，使用数组的filter方法:
  var books = this.state.books;
  this.setState({
    books: books.filter(item => {
      return item != 'React';    
    });  
  });

  ```

  **push 、pop、shift、unshift、splice** 等方法来修改数组的状态会修改原数组， 而concat slice filter 会返回新的数组，建议使用此类方法修改。



### 状态的类型是普通对象 

```javascript
// 方法一 将state 先赋值给另外的变量 然后使用Object.assign创建新对象
var owner = this.state.owner;
this.setState({
  owner: Object.assign({}, owner, {name: 'Jason'});
});
```







