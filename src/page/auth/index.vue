<template>
    <div class="sys-full-page">
        这里是授权页面
        <a href="javascript:void(0)" @click="auth">点我进行授权</a>
    </div>
</template>

<script>
export default {
    // 授权方法
    methods: {
        auth () {
            // vuex设置this.$store.dispatch更新，对应store中action中定义的方法，成功则运行then
            this.$store.dispatch("user/getNewToken").then(() => {
                console.log("已在授权页面获得授权")
                // 在history记录中前进或者后退val步，当val为0时刷新当前页面
                this.$router.go(-1)
            })
        }
    }
}
</script>