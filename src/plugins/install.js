// 组件全局注册
import Vue from 'vue'

import hasPermission from './hasPermission'

// 定义插件库
const Plugins = [
    hasPermission
]

// 注册所有插件
Plugins.map((plugin) => {
    Vue.use(plugin)
})
// 注册插件
// Vue.use(plugin-name)

export default Vue