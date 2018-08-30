Vuex

Vuex 是一个专为 Vue.js 应用程序开发的 **状态管理模式**。它采用集中式存储管理应用的所有组件的状态（全局通用、状态持久的特点），并以相应的规则保证状态以一种可预测的方式发生变化。 

Vuex 也集成到 Vue 的官方调试工具 [devtools extension](https://github.com/vuejs/vue-devtools)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。 



## 一般级别项目为什么不用Vuex

#### Vuex 的应用层级状态管理

> Vue 参照 [Flux](https://github.com/facebook/flux) / [Redux](https://github.com/reactjs/redux)，实现出 [Vuex](https://github.com/vuejs/vuex)，专注于 **应用层级** 的状态管理。



但是，一般情况下，不需要使用到Vuex，而只需要简单的 store 模式 呢，为什么呢？



Vuex 的复杂化：

Vuex 为了 **全局状态** 管理，把原本 **简单纯粹的双向绑定** 以及 **操作方法** 都剥离开来，抽象成 Vuex 的 `state / mutation / action`。理解这些概念之后，我们会发现这对于对于绝大部分中小型项目而言，显然是牛刀杀鸡。引入 Vuex，虽可使 **数据流动明确** ，但破坏了 **组件的直观性** ，尤其是团队水平参差不齐的情况下，全局的状态管理很容易成为项目开发与维护的负担。 另外不需要引入 Vuex 的原因还有一个：其使用了`vue-router`

> 而 JavaScript的另一个框架，React框架，其使用 **集中管理** 是有道理的。
>
> 原因： 
>
> 作为一个 View 层，不具备数据的双向绑定能力，其数据流是单向的（”单向数据流理念“）。既然是 **单向数据流** ，那么将整个应用状态汇于一处集中管理（这就是传统意义上的 Model 层，在此只是改名为 **Store 层** 罢了），抽离出 **操作方法** 等（Controller 层，在此为 **Action** 与 **Reducer** 层），也是自然而然的。



#### Vue 简单的状态管理

Vue是轻量级的 **MVVM框架** ，若完全照搬相对抽象的 Flux / Redux 架构，未免有点舍本逐末了。

所以，对于一个使用 MVVM 模式构建的单页应用而言，需要置于 **Store 层** 的，仅限于 **全局通用** 且 **状态持久** 的数据（例如用户认证信息）。~~若把所有应用数据（尤指一些 **实时性较高的数据** 以及 **非共享的数据** ）都糅合在一处，那就像是把所有变量都挂载到全局了。~~ 

> 所以，Vue 状态管理的最佳实践应为：
>
> - 不使用Vuex的Vue单页面应用
>   1. 状态都自包含于组件里面
> - 使用Vuex的Vue单页面应用
>   1. **组件自包含状态数据（组件本地状态，即data）**
>   2. **全局持久性通用性数据（应用层级状态，即store层）集中管理**



### 总结

虽然 Vuex 可以帮助我们管理共享状态，但也附带了更多的概念和框架。这需要对短期和长期效益进行权衡。

如果不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。应用够简单，最好不要使用 Vuex。一个简单的 [store 模式](https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8)就满足所需了。因为引入 Vuex，虽可使 **数据流动明确** ，但破坏了 **组件的直观性** ，尤其是团队水平参差不齐的情况下，全局的状态管理很容易成为项目开发与维护的负担。对于一般级别的Vue单页面应用，我们不需要炫酷的“时光旅行”（即使用提交mutation的方式来追踪状态的改变）

> 结构约定俗成，条理清晰；代码风格统一，高内聚低耦合；容易上手、接手与维护······ 
>
> 最理想的状态也莫过于此。 

但是，如果需要构建一个中大型单页应用，很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。



## Vuex

相对于 vue2 和 vue 的较大改动，vue的状态管理工具 vuex的改动不是很大，比较常用的在使用方面多了几个 Helper，利用ES6的展开函数可以更加方便的使用`state,getters,mutations,actions`。

下面简单介绍下vuex各个部分的概念

- `state`是一个全局的状态存储，数据会存储在其中，vue组件可以直接访问其中的值，但是只可以读，不可以进行写操作
- `getter`，有些时候我们需要对获取的数据进行加工，而不是直接获取state中的数据，这时候可以通过getter定义函数，返回对应的数据
- `mutations`是vuex中唯一一个可以修改数据的地方，`mutations`可以定义事件函数，在vue组件中可以通过commit发射事件，调用函数。需要注意的是，`mutations`中的操作必须是同步Sync的，不可以存在异步操作的情况。
- `actions`和 `mutation`比较相似，不同的是actions中不直接修改state，而是通过commit调用mutations修改数据，而且actions中可以存在**异步**处理逻辑



示例：

```vue
import {mapState, mapMutations, MapActions} from "vuex"
export default  {
	computed: mapState(["count", "list"]),
    methods:{
		...mapMutations(["addItem"]),  // 只能同步
		...mapActions(["replaceLsit"])	// 允许异步
    }
}
```

这个文件使用了vuex管理的数据，在此前的版本的vuex中，在组件使用数据需要写很多的`computed`，`methods`,在新版本的可以配合ES6的展开函数和vuex的helper，简写很多函数。



### 一个简单的单组件 Vue 计数案例

```vue
new Vue({
  // state，驱动应用程序的数据源
  data () {
    return {
      count: 0
    }
  },

  // view，以声明方式将state映射到视图
  template: `
    <div>{{ count }}</div>
  `,

  // actions，响应在view上用户输入导致的状态变化
  methods: {
    increment () {
      this.count++
    }
  }
})
```

单向数据流”理念：

![](https://vuex.vuejs.org/flow.png)



### 复杂的多组件

问题：

当应用为多组件共享状态，”单项数据流“的简洁性很容易被破坏。

- 问题一：多个视图依赖于同一个状态

传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力 

- 问题二：来自不同视图的行为需要变更同一个状态

开发者经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。 



解决：

因此，多组件的Vue单页面应用，会将组件的共享状态抽取处理出来，以全局单例模式来管理。另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，代码也会变得更结构化和易维护。

这就是 Vuex 背后的基本思想，借鉴了 [Flux](https://facebook.github.io/flux/docs/overview.html)、[Redux](http://redux.js.org/)、和 [The Elm Architecture](https://guide.elm-lang.org/architecture/)。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。 



多组件单向数据流“理念：

![](https://vuex.vuejs.org/vuex.png)

组件vue里的 data 抽象成  store中的State；

组件vue里的 methods 抽象成 Mutations；

过程：**组件通过 计算属性，然后在/store中的 store.dispatch方法触发 /store 中的actions，再通过 actions 中的 commit 方法唤醒 mutations，最后 mutate 状态，渲染到组件中。**



### /store

每一个 Vuex 应用的核心就是 store（仓库）。这个仓库会包含应用中大部分的状态（state）。

Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地 **提交 (commit) mutation**。这样使得我们可以方便地（使用提交mutation的方式可以）**更明确地跟踪每一个状态的变化**，从而让我们能够实现一些工具（比如状态快照导入导出）帮助我们更好地了解我们的应用。



最简单的 store 示例：

```javascript
// 仅需要提供一个初始 state 对象和一些 mutation
// 可以发现，组件vue里的 data 抽象成  store中的State；组件vue里的 methods 抽象成 Mutations；

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

```javascript

// 通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更
actions: {
    store.commit('increment')
	console.log(store.state.count) // -> 1
}
```

tips：

我们通过提交 mutation 的方式，而非直接改变 `store.state.count`，是因为我们想要更明确地追踪到状态的变化。 这就是所谓的”时空穿梭“调试体验。



### state

**单一状态树**——用一个对象就包含了全部的应用层级状态。每个应用将仅仅包含一个 store 实例。 

**使用计算属性获取Vuex状态**——由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在[计算属性](https://cn.vuejs.org/guide/computed.html)中返回某个状态，通过计算属性，每次`store.state.count`状态变化的时候，都会重新计算属性，并且触发更新相关联的DOM。

**使用计算属性获取Vuex状态的缺点**——然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。 

**Vue.use(Vuex)注册状态**——Vuex 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中，且子组件能通过 `this.$store` 访问到。 

```javascript
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})

----
      
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```



### mapState 辅助函数

当一个组件组件需要获取多个状态时，可以使用mapState辅助函数帮助统一将多个所需状态生成计算属性（起初这些多个状态需要每一个声明为计算属性，重复冗余）

```javascript
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
  // mapState 辅助函数返回的是一个对象，通常，我们为了将其能与局部计算属性混合使用，需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给computed属性。但是，现在我们可以使用对象展开运算符来极大简化写法，将对象混入到外部对象（组件局部计算属性）中
}

----

computed: 
	localComputed () {}

	// 使用对象展开运算符将此对象混入到外部对象（组件局部计算属性）中
	...mapState({
    
	})
```

当映射的计算属性的名称与state的子节点名称相同时，也可以给mapState传一个字符串数组。

```javascript
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
// mapState 辅助函数返回的是一个对象，通常，我们为了将其能与局部计算属性混合使用，需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给computed属性。但是，现在我们可以使用对象展开运算符来极大简化写法，将对象混入到外部对象（组件局部计算属性）中S
```



tips：

使用 Vuex 并不意味着你需要将**所有的**状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。 



### 模块化

单状态树和模块化并不冲突——如何将状态和状态变更事件分布到各个子模块中？

问题：单一状态树，应用的所有应用级状态会集中到一个大对象里，当应用复杂，store对象会变得臃肿。

解决：Vuex允许将store分割成模块，每一个模块拥有自己的state、mutation、action、getter、甚至是嵌套子模块——从上之下进行同样方式的分割。

```javascript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```



tips：

1. 对于模块内部的mutation和getter，接收的第一个参数是模块的局部状态对象
2. 对于模块内部的action，局部状态通过context.state暴露出来，根节点状态则为context.rootState
3. 对于模块内部的getter，根节点状态会作为第三个参数暴露出来
4. 默认情况下，模块内部的mutation、action、getter是注册在全局命名空间的，这样使得多个模块能够对同一mutation或action做出响应。
5. 如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名 
6. 如果你希望使用全局的state和getter，rootState和rootGetter会作为第三和第四参数传入getter，也通过context对象的属性传入action
7. 若需要在全局命名空间内分发 action 或提交 mutation，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 
8. 若需要在带命名空间的模块注册全局action，可添加`root: true`，并将该action的定义放在函数 `handler`中
9. ~~当使用mapState、mapGetter、mapActions 和 mapMutations这些辅助函数来绑定带命名空间的模块时，写起来会比较繁琐~~，对于这种情况，你可以将模块的空间名称字符长作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。而且，你可以通过使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数： 
10. 在store创建之后，可以使用store.registerModule方法动态注册模块。之后就可以通过 `store.state.myModule` 和 `store.state.nested.myModule` 访问模块的状态。 模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。 例如，[`vuex-router-sync`](https://github.com/vuejs/vuex-router-sync) 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。 你也可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。
11. 又是我们需要创建一个模块的多个实例，例如：~~创建多个store，他们公用同一个模块~~；或者一个store多次注册同一个模块。 可以使用一个函数来声明模块状态（类似于vue组件的data定义，为的是解决一起变化的问题，使用函数声明解决）。

```javascript
const MyReusableModule = {
  state () {
    return {
      foo: 'bar'
    }
  },
  // mutation, action 和 getter 等等...
}
```



### mutation

想要更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。 



**在/store中使用mutations 和 commit**——每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。 

```javascript
const store = new Vuex.Store({
  state: {
    count: 1
  },

  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

```javascript
// 不能直接调用一个mutation handler（类似于事件注册），要唤醒需要以响应的type调用store.commit方法
actions: {
	store.commit('increment')   
}
```



**载荷**——向store.commit 传入额外的参数，即mutation的载荷

```javascript
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
```

```javascript
store.commit('increment', 10)
```

在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

```javascript
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

```javascript
actions: {
    store.commit('increment', {
      amount: 10
    })
}
```



在有载荷对象的情况下，提交 mutation 的另一种方式是直接使用包含 `type` 属性的对象（对象风格的提交方式）： 

```javascript
actions: {
 store.commit({
      type: 'increment',
      amount: 10
    })   
}
```

当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：

```javascript
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```



**遵守Vue的响应规则**——

1. 最好提前在store中初始化好所有所需属性
2. 当需要在对象添加新属性时，应该使用  `Vue.set(obj, 'newProp', 123)`  或者以新对象替换老对象。 例如：

```
state.obj = { ...state.obj, newProp: 123 }
```



**使用常量替代 mutation 事件类型**——在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然 

```javascript
// mutation-types.js
// const 定义该值为一个常量
export const SOME_MUTATION = 'SOME_MUTATION'
```

```javascript
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```



**也可以在组件中提交Mutation**——在组件中可以使用 `this.$store.commit('xxx')` 提交mutation，或者使用`mapMutations` 辅助函数将组件中的mutations 映射为`/store`中 `store.commit` 调用（需要在根节点注入store）。



tips：

mutation 必须是同步函数。任何由某个 mutation 导致的状态变更都应该在此刻完成。

因为当 mutation 触发的时候，回调函数（假如在mutations中使用了回调函数）还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上**任何在回调函数中进行的状态的改变都是不可追踪的** 



### action

![](https://vuex.vuejs.org/vuex.png)

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含**任意异步操作**。



**在/store中使用Action 函数**——该函数接受一个与 store 实例具有相同方法和属性的 **context** 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。 但是注意，context 对象不是store实例本身（在模块化中解释）。

```javascript
// /store/index.js

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
    
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```



但实践中，我们会经常用到 ES2015 的 [参数解构](https://github.com/lukehoban/es6features#destructuring) 来简化代码（特别是我们需要调用 `commit` 很多次的时候）：

```javascript
actions: {
    // increment (context) {
    //  context.commit('increment')
    // }

  increment ({ commit }) {
    commit('increment')
  }
}
```



**分发action**——action通过store.dispatch方法触发。

```
store.dispatch('increment')
```

乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？

实际上并非如此，还记得 **mutation 必须同步执行**这个限制么？

Action 就不受约束！我们可以在 action 内部执行**异步**操作：

```javascript
actions: {
  // increment ({ commit }) {
  //  commit('increment')
  // }
    
    // 异步函数
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

Actions 支持同样的载荷方式和对象方式进行分发：

```javascript
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```



**购物车实例**——

```javascript
actions: {
    checkout ({commit, state }, products) {
// 把当前购物车的物品备份起来
        const savedCartItems = [...state.cart.added]
// 发出结账请求，然后清空购物车
        commit(typed.CHECKOUT_REQUEST)
// 购物 API 接受一个成功回调和一个失败回调
        shop.buyProducts(
        	products,
            () => commit(types.CHECKOUT_SUCCESS),
            () => commit(types.CHECKOUT_FAILURE, savedCartITems),
        )
    }
}
```



**在组件中分发 action**——在组件中可以使用 `this.$store.dispatch('xxx')` 分发 action，或者使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`） 



**组合action**——在项目中，Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？ 

首先，需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

```javascript
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在你可以：

```javascript
// 返回promise对象，使用其then方法
store.dispatch('actionA').then(() => {
  // ...
})
```

在另外一个 action 中也可以：

```javascript
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 [async / await](https://tc39.github.io/ecmascript-asyncawait/)，我们可以如下组合 action：

```javascript
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
    
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
      
  async actionB ({ dispatch, commit }) {
    // 等待 actionA 完成
    await dispatch('actionA') 
      
    commit('gotOtherData', await getOtherData())
  }
    
}
```

tips：

**一个store.dispatch在不同模块中可以触发多个action函数**（我们要解决的问题），而在上述情况下，只有当所有触发函数完成后，返回的Promise才会执行。





## 总结

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        list: [1,2,3,4],
        conunt: 1
    }
    actions: {
        replaceList: context=> {
            var t = [];
            let i = 0;
            while(i<3) {
                t.push(Math.radom());
                i++
            }
            setTimeOut(() => {
                context.commit("replaceList", t);
            }, 1000)
        }
	},
    mutations:{
		// ...	
    },
    getters: {
        cc: state => {
            return state.count + " hello!";
        }        
    }       
})

export default store
```

首先，想要使用vuex需要在`Vue.use`中引入，然后实例化一个`Vuex.Store`对象就即可；

然后，对象中需要定义`state,actions,mutations,getters`等内容，这样子就可以建立一个全局的状态管理机制；

由此，开发者可以从应用的顶端去处理数据，各个组件中对数据进行操作也是通过事件直接传递到Vuex中进行数据更新，然后再进行响应到其他使用同个数据的组件中，进行视图更新。









