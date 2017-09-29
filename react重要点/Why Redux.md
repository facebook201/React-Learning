因为Redux的数据流是单向的，子组件的数据和方法只能由父级组件赋予。一旦组件嵌套层次变深，传递数据变的很复杂。 我们希望的是组件和数据不能耦合在一起。 而且不同的项目 不同的组件的数据是不同的，所以你需要单独再次重写一个header组件。 但是Redux 解决了这个问题。 简单来说 它就是将react 由父级传递数据 变为了一个统一的数据源store单向地向各个组件传递数据。

![border](http://7xjduk.com1.z0.glb.clouddn.com/rre-4.png)



View ==> Action ==> diapatch(action) ==> reducer ==> store ==> view

UI视图。用户来触发action，分发动作，根据action类型 来匹配reducer 处理数据。得到新的返回值 然后store改变 render重新渲染 更新DOM 



所有的数据都存放在store中 组件内部不再维护任何数据。 store 提供了dispatch 方法 来触发改变store数据。dispatch传入的值被称为action。 dispatch(action) 之后 会到store中称为reduer的处理函数，这些reducer 会依据不同的Action类型 进行不同处理。 返回的值就作为新store的数据。一个reducer 对应的是store中的一个数据字段。 每多一个reducer， store中就多一个数据字段 数据发生改变之后 store就会通知对应的组件重新渲染。



通过redux 提供的connect高阶组件函数。 直接从store 选取需要的数据和申明需要使用的方法传入组件中。以redux作为状态管理框架 我们定义了4中类型的组件。

* 展示组件

  仅仅是展示作用，内部不会维护任何动态数据。 除了部分只和组件本身有关的数据。 

* 存储中心组件

  就是Redux 里面的store。 默认定义了一些reducer 处理函数和一些middleware，还包含了连接redux 和 react 高阶函数和向store注入新的reducer的方法。

* 数据组件

  数据组件即为 redux 架构中某个action 和 对应的 reducer 的合集。数据组件提供了各种 action 可以去调用，并且定义了对应的 action 去处理，数据组件中必须引用存储中心组件，因为数据组件必须向 store 中注入对应的 reducer 处理函数。

* 高阶组件

  高阶组件即为经过 connect 高阶组件中申明使用的展示组件和数据组件。 函数处理后的展示组件。通常情况下，被使用的组件一般都是高阶组件。 高阶组件确定向该展示组件传入的属性和方法。高阶组件是和业务耦合的，复用性不强。高阶组件高度聚合，而展示组件和数据组件间又充分解耦。一个高阶组件中可能包含多个数据组件，例如 Ranklist 这个展示组件，需要由提 roomInfo 和 rankList 这两个数据组件提供数据。

  高阶组件可能不会引入任何数据组件的方法，只需 import 对应的数据组件，将reducer 注入进 store

  ​





















