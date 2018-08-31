import Mock from 'mockjs'

import navlist from './navlist'
import login from './login'
import echarts from './echarts'
import table from './table'
import groupList from './groupList'
import getToken from './getToken'

let data = [].concat(navlist, login, echarts, table, groupList, getToken)

data.forEach(function(res){
    Mock.mock(res.path, res.data)
})

export default Mock

// 使用Mock
// var Mock = require('mockjs')
// var data = Mock.mock({
//     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//     'list|1-10': [{
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1
//     }]
// })
// 输出结果
// console.log(JSON.stringify(data, null, 4))