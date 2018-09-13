// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 生产环境中需要注释掉以下语句
import 'sysStatic/css/theme-default.scss'
import '../mock/index.js'

// 国际化
import i18n from './util/i18n'

import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import store from './store'
import axios from './util/ajax'

// 子组件全局注册
import './components/install'
// 插件注册
import './plugins/install'

// 注册组件到Vue
Vue.prototype.$axios = axios
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
})

// 默认为true，设置为false防止出现生产提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  axios,
  store,
  router,

  render: h => h(App)
}).$mount('#app')
