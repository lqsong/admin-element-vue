<template>
    <router-link to="/" class="indexlayout-top-message">
      <icon-svg type="message"  :style="{ fontSize: '16px' }"></icon-svg>
      <el-badge
        class="indexlayout-top-message-badge"
        :value="message"
        type="danger"
      />
    </router-link>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { StateType as UserStateType } from "@/store/user";
import IconSvg from "@/components/IconSvg";

interface RightTopMessageSetupData {
    message: ComputedRef<number>;
}

export default defineComponent({
    name: 'RightTopMessage',
    components: {
      IconSvg
    },
    setup(): RightTopMessageSetupData {

        const store = useStore<{user: UserStateType}>();
        
        const message = computed<number>(()=> store.state.user.message);


        onMounted(()=>{
            store.dispatch("user/fetchMessage");
        })


        return {
            message
        }
    }
})
</script>