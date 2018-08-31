import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import store from '@/store'
import staticRoute from './staticRoute'
import whiteList from './whiteList'
import Auth from '@/util/auth'

// 获取permissionList权限列表，用于判断用户要跳转的页面是否在权限列表中
var permissionList = []
function initRoute (router) {
    return new Promise((resolve) => {

        if (permissionList.length == 0) {
            console.log("没有权限数据，正在获取...")

            // 在全局状态store中获取
            store.dispatch('auth/getNavList').then(() => {

                store.dispatch('auth/getPermissionList').then((res) => {
                    console.log("权限列表生成完毕")
                    permissionList = res
                    res.forEach( function (v) {
                        let routeItem = router.match(v.path)

                        if (routeItem) {
                            routeItem.meta.permission = v.permission ? v.permission : []
                            routeItem.meta.name = v.name
                        }
                    })
                    resolve()
                })
            })
        } else {
            console.log("已有权限数据")
            resolve()
        }
    })
}


Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: staticRoute
})

router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();

  // 判断用户是否处于登录状态
  // debugger
  if (Auth.isLogin()) {
    if(to.path === '/login') {
      console.log("处于登录状态直接跳转home页面")
      next({path: '/home', replace: true})
    } else if (to.path.indexOf("/error") >= 0) {
      // 防止重定向到error页面造成beforeEach死循环
      next()
    } else {
      // 当用户手动修改地址栏地址时，判断其要跳转的页面是否在权限列表中
      initRoute(router).then(() => {
        let isPermission = false
        console.log("进入权限判断")

        permissionList.forEach((v) => {
          if(v.path == to.fullPath) {
            isPermission = true
          }
        })

        // 没有权限则跳转到401页面
        if (!isPermission) {
          next({path: "/error/401", replace: true})
        } else {
          next()
        }
      })
    }
  } else {
    // 第一次登录，跳转到登录页面
    // 假如是免登陆页面，直接进入
    if (whiteList.indexOf(to.path) >= 0) {
      console.log("进入一个白名单页面");
      next()
    } else {
      console.warn("当前未登录，请登录")
      next({path: "/login", replace: true})

      // 登录超时：store中有token，同时cookie中没有登录状态
      if (store.state.user.token) {
        Message({
          message: "登录超时，请重新登录"
        })
      }

      // 结束进度条
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 结束进度条
  NProgress.done();
})

export default router