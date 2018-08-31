// 用于导航栏
var data = [
    {
        path: '/home',
        name: '首页'
    },
    {
        name: '完整示例',
        child: [
            {
                path: '/example/table',
                name: '列表页面',
                permission: ['edit']
            },
            {
                path: '/example/charts',
                name: '图表页面'
            }
        ]
    },
    {
        path: '/theme',
        name: '主题切换'
    },
    {
        path: '/manageUser',
        name: '用户管理'
    },
    {
        path: '/manageSubject',
        name: '活动管理'
    }
]

export default [{
    path: '/user/navlist',
    data: data
}]