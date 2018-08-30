## 前言

什么是Vue.js，为什么使用Vue.js？

VueJS是当前流行的MVVM框架之一，其着重解决VM层，拥有轻量级、易上手、文档全、性能高的优点。

 VueJS社区正蓬勃发展，是2016年发展最火速的前端框架。 因其轻量的关系，可以让它完全融入到之前的任何项目中，但个人仍然推荐使用它的单文件组件进行开发。 

VueJS提供了一套完整的前端组件化、模块化编程方案，让前端组件化变的无比轻松。 

另外，结合Webpack的代码分割/合并、压缩、打包、热重载等功能更能实现一定程度的前端开发工程化。 

> 与VueJS使用场景相同的框架还有ReactJS和AngularJS。其中ReactJS是生态最丰富的最完善的前端框架，其开创性的JSX语言为以后的前端框架造成了相当大的影响。 并且ReactJS拥有成熟的移动端开发框架——React Native，可以在学习一次后写各个平台的移动端应用。VueJS 2.0版很大程度上借鉴了ReactJS。 AngularJS是由Google公司推出的大型前端框架，其开创性的“数据绑定、事件绑定”对其后的框架产生了十分深远的影响。当前AngularJS 2.0已由微软公司进行继续开发及维护。 



### 三大使用场景相同的前端框架

**学习难度**：Angular > React > Vue

Angular学习曲线即为陡峭已经成为不争的事实。React的纯JS编程写模板则过于复杂，而且 **没有中文文档**。Vue使用一种更为简练更为直白的模板语法并且拥有 **十分完善的中文文档**

**框架性能**：Angular < React < Vue

Angular因其提供过于详细的解决方法，导致其框架本身十分巨大而且十分的不灵活。Vue和React在框架灵活性上相差不大，但Vue的性能比React的要稍好一点。

**未来发展**：Angular < React = Vue

很多开发者十分讨厌那种非常重的框架的，即Angular。很明显轻量简洁的框架是更适合前端开发的。因为前端开发本身就在不断发展，而且前端页面变更频繁，重型框架，很有可能根本不能适应业务的频繁变化和发展。这也是为什么Jquery曾经那么流行的原因。

- Angular本身很好，而且它确实为现有的框架提供了很多思路，未来也可能继续提供新的思路及解决方案
- React当前已经十分成熟了，**使用React的项目也十分巨大，完整的生态圈，良好的跨平台（React Native）**，可以说是很强！ 
- Vue则本身就处于上升期间，近期Weex（Vue版的React Native）已经进入Apache基金会项目孵化器，项目的维护正式走上正轨。



### 1. 谈状态管理Status Manage：一般级别项目为什么不用上Vuex

#### Vuex 的应用层级状态管理

> Vue 参照 [Flux](https://github.com/facebook/flux) / [Redux](https://github.com/reactjs/redux)，实现出 [Vuex](https://github.com/vuejs/vuex)，专注于 **应用层级** 的状态管理。

但是，一般情况下，不需要使用到Vuex。为什么呢？



Vuex 的复杂化：

Vuex 为了 **全局状态** 管理，把原本 **简单纯粹的双向绑定** 以及 **操作方法** 都剥离开来，抽象成 Vuex 的 `state / mutation / action`。理解这些概念之后我们会发现这对于对于绝大部分中小型项目而言，显然是牛刀杀鸡。 

> 而 JavaScript的另一个框架，React框架，其使用 **集中管理** 是有道理的。
>
> 原因： 作为一个 View 层，不具备数据的双向绑定能力，其数据流是单向的。既然是 **单向数据流** ，那么将整个应用状态汇于一处集中管理（这就是传统意义上的 Model 层，在此只是改名为 **Store 层** 罢了），抽离出 **操作方法** 等（Controller 层，在此为 **Action** 与 **Reducer** 层），也是自然而然的。
>
> 这是基于大型项目协作开发中，前人踩坑后的最佳经验总结，同时也是当前前端 MVC 的最佳实践。 



#### Vue 简单的状态管理

而我们要学习的Vue，乃轻量级的 **MVVM框架** ，若完全照搬相对抽象的 Flux / Redux 架构，未免有点舍本逐末了。

所以，对于一个使用 MVVM 模式构建的单页应用而言，需要置于 **Store 层** 的，仅限于 **全局通用** 且 **状态持久** 的数据（例如用户认证信息）。~~若把所有应用数据（尤指一些 **实时性较高的数据** 以及 **非共享的数据** ）都糅合在一处，那就像是把所有变量都挂载到全局了。~~ 

> Vue 状态管理的最佳实践应为：
>
> 1. 不使用Vuex的Vue单页面应用
>    1. 状态都自包含于组件里面
> 2. 使用Vuex的Vue单页面应用
>    1. **组件自包含状态数据（组件本地状态，即data）**
>    2. **全局持久性通用性数据（应用层级状态，即store层）集中管理**



#### 总结

虽然 Vuex 可以帮助我们管理共享状态，但也附带了更多的概念和框架。这需要对短期和长期效益进行权衡。

如果不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。应用够简单，最好不要使用 Vuex。一个简单的 [store 模式](https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8)就满足所需了。因为引入 Vuex，虽可使 **数据流动明确** ，但破坏了 **组件的直观性** ，尤其是团队水平参差不齐的情况下，全局的状态管理很容易成为项目开发与维护的负担。对于一般级别的Vue单页面应用，我们不需要炫酷的“时光旅行”（即使用提交mutation的方式来追踪状态的改变）

> 结构约定俗成，条理清晰；代码风格统一，高内聚低耦合；容易上手、接手与维护······ 
>
> 最理想的状态也莫过于此。 

但是，如果需要构建一个中大型单页应用，很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。



其实，不需要引入Vuex的原因还有一个：使用了`vue-router`

### 2. URL是单页面应用的精华

`vue-router`，可以完全掌控 URL 以表示应用的状态 

> URL 可以表现应用的状态。
>
> 而且在一定程度上，URL 就是应用状态的 **最佳表现形式** 



**单页面** 的精华在于：

- 在拥有无缝切换体验的同时，保证  **URL 与页面状态的同步性 **，满足保存书签、强制刷新、前进回退等基本需求 

- **同步的粒度** 需要细致到什么程度，可以根据实际情况自行斟酌

  > 比如：例如，<https://github.com/kenberkeley> 表示 kenberkeley 的首页，而https://github.com/kenberkeley/vue-demo/issues/1> 表示 vue-demo 的第一个 issue 

- `vue-router` 提供的 [`data`](https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/pipeline/data.md) 函数，极其方便地让我们响应 URL 的变化以进行 xhr 请求。当然，如果并非路由页面组件，是不能够享受到 `data` 函数的便利。

  不过我们仍可以通过 [`watch`](http://v1.vuejs.org/api/#watch) 来实现同样的功能： 

  ```javas
  watch: {
    '$route.query' (query, oldQuery) {
       // ...
     }
  }
  ```



注意，由于我们没有引入 Vuex，因此不能使用 [vuex-router-sync](https://github.com/vuejs/vuex-router-sync) 来 **自动同步路由与组件的状态**

> 不过，也有解决办法能满足我们的需求：更为合理的 [`vue-sync-query-mixin`](https://github.com/kenberkeley/vue-sync-query-mixin) npm 包 



### 3. 引入服务层

#### 简介

服务层的主要功能：封装好 **与后端提供的API** 对应的请求类

> 例如，用户登录的 API 为 `/auth/login`， 那么 `src/services/authService.js` 这个类中就对应存在一个名为 `login` 的函数， 只需要调用 `authService.login({ 帐号, 密码 })` 即可实现请求。 



好处：

- **轻量化组件，统一管理 XHR 请求，提高代码复用，方便 mock**， 避免在组件中分别实现请求而导致管理上的混乱（对日后的重构也不友好）。 
- 而且，**前端的服务与后端的 API 对应** ，在理解上也会变得更加容易。 
- **服务层** 与 Vue技术栈 并没有太大关系（前提是您没有用 [`vue-resource`](https://github.com/pagekit/vue-resource)这类相对鸡肋的 Ajax 库）。 所以，往后改用其他技术栈（React 等）时，服务层可直接复制过去，毋须改动任何代码。 



#### 服务层的另一个妙用：缓存相关的数据

数据一般由 **本地组件data** 和 **全局store** ，但仍需要提供 **缓存**

例如，我们有一个选择用户的下拉框组件，里面的数据是动态获取的（假设 API 为 `GET /authors`）， 若不把这些数据缓存下来，那么每一次渲染该组件，都会发出一次请求。 尤其是该组件极其常用的情况下，更会造成很多不必要的资源消耗。 

于是，我们在服务层为其新建一个服务，命名为 `authorService`，里面定义一个 `getOptions`方法， 在组件初始化的时候，可以这样子操作： 

```vu
if (authorService.options) {
  // 存在缓存，则使用缓存
  this.options = authorService.options
} else {
  // 不存在缓存，则动态获取
  authorService.getOptions().then(options => {
    this.options = authorService.options = options // 设置缓存
  })
}
```

由此，就可以实现**页面级别**的缓存，强制刷新即可获取最新的数据，毋须特意去维护该缓存。 



> 试想，若使用 LocalStorage / SessionStorage 缓存，还要考虑**兼容性**、**数据更新**、**有效性**、**安全性**等诸多问题 



### 4. Ajax接口化

```
[路由页面组件 A [普通组件 B [普通组件 C]] ...]
      ↕             ↕          ↕
------------------------------------------
| aService      bService   cService      |  服务层
------------------------------------------
      ↕             ↕          ↕
------------------------------------------
|                  xhr                   |  Ajax 接口
------------------------------------------
                    ↕
                 API 服务器
```



```
/**
 * xhr 接口（详见 src/services/xhr/index.js）
 * @param  {String} options.method 请求方法（默认为 get）
 * @param  {String} options.url    请求路径（基于 rootPath 地址）
 * @param  {Object} options.body   请求体（例如后端 Express 可使用 req.body 获取该对象）
 * @return {Promise}
 */
```



#### 封装 xhr 接口的好处：

- 若项目升级需要替换 **Ajax 请求库** ，则仅需要 **重新实现 xhr** 即可，服务层与组件层完全不需要改动
- 统一化处理：**自定义拦截**、**API 格式变更**、**数据格式转换**、**错误处理**、**mock** 等



### 5. 配置

> 一般项目整体都采用 [Webpack](http://webpack.github.io/) 构建，
>
> 使用 [ESLint](https://kenberkeley.github.io/vue-demo/docs/_book/zh-cn/development/eslint.org) 对代码进行静态检测，
>
> 使用 [Babel](http://babeljs.io/) 转译 ES6 
>
> [Gulp](https://kenberkeley.github.io/vue-demo/docs/_book/zh-cn/development/gulpjs.com) 仅用于合并压缩打包静态基页（`src/index.html`）中 `build` 标签内全局引入的静态资源 



#### webpack

> 在开发过程中，改动`build/`目录下的配置，都需要重启才能生效（可以使用 [Nodemon](https://github.com/remy/nodemon)、[Supervisor](https://github.com/Supervisor/supervisor) 等工具进行自动监控重启） 



#### 路径别名@

> 源码目录位置可简写为 `@`，见 `build/webpack.base.conf.js` 中的 `resolve.alias` 
>
> ```vue
>   resolve: {
>     extensions: ['.js', '.vue', '.json'],
>     alias: {
>       'vue$': 'vue/dist/vue.esm.js',
>       '@': resolve('src'),
>     }
>   },
> ```



别名的好处：

- **简约**。例如，在某组件中，引入`authService`，需要`import authService from '../../../services/authService' `，而使用路径别名，`import authService from '@/services/authService' `
- **避免歧义**。例如，Webpack 只需要设定了 `resolve.root` 为 `src/` ，就可以直接 `import authService from 'services/authService'`。但在这里其实是会引起歧义的。试问：`import createBrowserHistory from 'history/lib/createBrowserHistory'`。您可能会觉得这是 `src/history/lib/createBrowserHistory.js` ，但实际上 [`history`](https://github.com/mjackson/history) 是一个 **npm package**。同样地，您又怎么知道 [`services`](https://www.npmjs.com/package/services) 不是一个 npm package？ 



#### 环境变量

> 由在`build/webpack.dev.conf.js`中的`DefinePlugin`提供
>
> ```vue
>     // src/build/webpack.dev.conf.js
> 	new webpack.DefinePlugin({
>       'process.env': require('../config/dev.env')
>     }),
> 
> // src/config/dev.env.js
> 'use strict'
> const merge = require('webpack-merge')
> const prodEnv = require('./prod.env')
> 
> module.exports = merge(prodEnv, {
>   NODE_ENV: '"development"'
> })
> 
> // src/config/prod.env.js
> 'use strict'
> module.exports = {
>   NODE_ENV: '"production"'
> }
> 
> ```
>
> 默认有这些全局变量： `process.env.NODE_ENV`、`__ENV__`、`__DEV__` 与 `__PROD__`（后三者在 `build/config/ENV.js` 中定义） 

若要继续添加全局变量，注意还需要在 `.eslintrc` 中 `globals` 同步写入 



根据当前运行环境执行对应的代码

```javas
if (__DEV__) {
  // 开发环境下执行的代码
}
if (__PROD__) {
  // 生产环境下执行的代码
}
```



> 提醒，在 `npm scripts` 中设置 `NODE_ENV` 时需要注意末尾空格的[问题](http://stackoverflow.com/questions/11104028/#38948727)。
>
> 使用前最好先 `trim` 一下：`process.env.NODE_ENV.trim()` 



#### ESlint

配置文件见项目根目录下的 `.eslintrc`，对其的任何修改都是立即生效（即不用重启）。配置规则请参考 [docs·rules](http://eslint.org/docs/user-guide/migrating-to-1.0.0)（请注意当前版本为 1.x） 



#### Babel

配置文件见项目根目录下的 `.babelrc`。配置详情请自行参考 [docs·babelrc](http://babeljs.io/docs/usage/babelrc/)



#### Gulp

 如下[参考](https://www.zhihu.com/question/27548038/answer/37140329) 



### 6. 直接跨域和代理转发

#### 不推荐：直接跨域

```
xhr 接口  <--（直接跨域）--> API 服务器
```

> 开发过程中，Chrome 可以使用 [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) 插件解除同源策略的限制 
>
> 同源策略



#### 推荐：代理转发

```
xhr 接口 <--（开发服务器代理转发）--> API 服务器
```

> 实际上，xhr接口和开发服务器之间，还有一层 **BrowserSync代理**（用于多端联合同步调试）。



#### 相关配置(需要自行添加)

- xhr接口：在 `src/service/xhr/`
- 开发服务器代理转发：在 `build/dev.js` 中的 `http-proxy-middleware` 实现
- BrowserSync：在 `build/webpack.conf.js` 中的 `BrowserSyncPlugin` 配置
- 上述各项服务的端口配置：在 `build/config/PORTS.js` 里



#### 生产环境下的代理

一般是使用 Nginx 部署 `dist/`，配置 `proxy_pass` 到对应的后端服务（详情请自行查阅相关资料） 



### 7. 最佳实践（重要）

> 基本的命名规范、代码风格等（请自行查阅相关资料）



> 项目使用 [ESLint](http://eslint.org/) 进行静态检测，配置见 `.eslintrc`



> 通读 Vue.js [Guide](http://v1.vuejs.org/guide/) / [API](http://v1.vuejs.org/api/) 文档，通读 Vue Router [文档](https://github.com/vuejs/vue-router/tree/1.0/docs/zh-cn)。例如，`slot` 和 `inline-template` 的编译作用域搞清楚了吗？



> 恪守 **代码、模块分离**，[DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself) （Dont Repeat Yourself）的开发理念。



> 单组件文件代码量若超 200 行，一般都有优化的空间。关键是 **拆**，前提是**粒度**要合理



> 善用 Webpack 的路径别名



> 引入文件时，省略默认解析的文件后缀。配置见 `build/webpack.base.conf.js` 中的 `resolve.extensions`

```
import FooBar from './FooBar.js'  // No good enough
import FooBar from './FooBar'     // Good
```



> 最小化引入类库（除非您使用了 [rollup](https://github.com/rollup/rollup) 或 [`lodash-webpack-plugin`](https://github.com/lodash/lodash-webpack-plugin) 等）

```
import _ from 'lodash'               // Bad
import isEmpty from 'lodash/isEmpty' // Good
```



> 过长的 HTML 代码应当拆写

```
<input type="text" class="form-control" v-model="text" placeholder="Please enter your name..." required>

<!-- ↑ Bad · Good ↓ -->

<input
  type="text"
  v-model="text"
  class="form-control"
  placeholder="Please enter your name..."
  required>
```



> 使用Vue缩写，如模板中使用 `:[prop]` 替代 `v-bind:[prop]`，使用 `@[verb]` 替代 `v-on:[verb]`

```
<foo-bar v-bind:xxx="yyy"></foo-bar>
<button v-on:click="handleClick">Click me</button>
<!-- ↑ Bad · Good ↓ -->
<foo-bar :xxx="yyy"></foo-bar>
<button @click="handleClick">Click me</button>
```



> 一般来说，涉及到权限的必须用 `v-if` 而非 `v-show`。例如，用户必须登录后才能查看的，请用 `v-if`



> 杜绝[片段实例](http://v1.vuejs.org/guide/components.html#Fragment-Instance)（fragment instance），最好有一个single root node

```
<template>
  <div></div>
  <div></div>
</template>

<!-- ↑ Bad · Good ↓ -->

<template>
  <div>
    <div></div>
    <div></div>
  </div>
</template>
```



> 尽量避免在模板中设置过多的判断条件，善用[计算属性](http://v1.vuejs.org/guide/computed.html)（computed）

```
<template>
  <div>
    <p v-if="i===0">Zero</p>
    <p v-if="i===1">One</p>
    <p v-if="i===2">Two</p>
  </div>
</template>
<script>
export default {
  data: () => ({ i: 0 })
}
</script>
<!-- ↑ Bad · Good ↓ -->
<template>
  <div>
    <p></p>
  </div>
</template>
<script>
export default {
  data: () => ({ i: 0 }),
  computed: {
    text () {
      return ['Zero', 'One', 'Two'][this.i]
    }
  }
}
</script>
```



> “物以类聚”，善用目录自包含
>
> 例如：
> `src/components/Select/` 下存放着全局通用的下拉框组件
> `src/components/Sidebar/` 下存放着全局通用的侧栏组件主体 `index.vue` 与其分拆出来的导航链接组件 `Link.vue`



> 请尽量保证数据流的可追踪性。
>
> 尽量不要使用 `$parent`，而是通过 `props` 属性接收父组件的传入



> 在 Vue 层面上，提高效能的优化手段有很多，例如 [`track-by`](http://v1.vuejs.org/guide/list.html#track-by)、[`Object.freeze`](http://v1.vuejs.org/guide/list.html#Using-Object-freeze)、[`keep-alive`](http://v1.vuejs.org/guide/components.html#keep-alive)、[`canReuse`](https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/pipeline/can-reuse.md) 等

























