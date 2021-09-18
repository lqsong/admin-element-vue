<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被验证前调用
        // 不能获取组件实例 `this` ！
        // 因为当守卫执行时，组件实例还没被创建！
        // console.log('refresh', to, from, next)
        next(vm => {
            vm.$router.replace(from);
            // 跳到该路由页面后，再替换为from来源
        })
    },

})
</script>
