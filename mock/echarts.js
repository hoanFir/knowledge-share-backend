/**
 * 因Mock自身原因，不能直接模拟不带属性名的数组。而这里需要的是[1,2,3]，不是{data: [1,2,3]}
 * 以下被注释掉的方法不可取，因每次获取后，返回值不变
 */

// import Mock from 'mockjs'

// var data = Mock.mock({
       // 'name|count': string：通过重复string生成一个字符串，重复次数为count
//     "data|7": [
//         '@natural(60, 100)'
//     ]
// })

// export default [{
//     path: '/charts',
//     data: data.data
// }]

export default [{
    path: '/charts',
    data: function () {
        var res = []
        for (var i = 0; i < 7; i++) {
            res.push(parseInt(Math.random()*100)+1)
        }
        return res
    }
}]
