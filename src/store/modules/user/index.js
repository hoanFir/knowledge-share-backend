import Cookies from 'js-cookie'

const state = {
    // 用户名
    name: ''
}

const mutations = {
    setName: (state, data) => {
        if(data){
            // 将字符串作为URI组件进行编码，返回值为URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。
            Cookies.set('userName', encodeURIComponent(data), {
                expires: 365
            })
        } else {
            Cookies.remove('userName')
        }
        state.name = data
    }
}

export default {
    namespaced: true,
    state,
    mutations
}