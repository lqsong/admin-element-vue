<template>
    <spin v-if="(!isLogin && loading) || !isReady" style="height: 200px;"/>
    <router-view v-if="isLogin" />
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Spin from '@/components/Spin/index.vue';
import { StateType as UserStateType, CurrentUser } from "@/store/user";

interface SecurityLayoutSetupData {
    isLogin: boolean;
    loading: boolean;
    getUser: () => Promise<void>;
    isReady: boolean;
}

export default defineComponent({
    name: 'SecurityLayout',
    components: {
        Spin
    },
    setup(): SecurityLayoutSetupData {
        const router = useRouter();
        const store = useStore<{user: UserStateType}>();

        // 获取当前登录用户信息
        const currentUser = computed<CurrentUser>(()=> store.state.user.currentUser);

        // 判断是否登录
        const isLogin = computed<boolean>(()=> currentUser.value ? currentUser.value.id > 0 : false);

        // 读取当前用户信息func
        const isReady = ref<boolean>(false); // 是否读取过用户信息
        const loading = ref<boolean>(false);
        const getUser = async () => {
            loading.value = true;
            await store.dispatch('user/fetchCurrent');
            if(!isLogin.value && router.currentRoute.value.path !== '/user/login') {
                router.replace({
                    path: '/user/login',
                    query: {
                        redirect: router.currentRoute.value.path,
                        ...router.currentRoute.value.query
                    }
                })
            }            
            loading.value = false;
            isReady.value = true;
        }

        onMounted(() => {
            getUser();
        })


        return {
            isLogin: isLogin as unknown as boolean,
            loading: loading as unknown as boolean,
            getUser,
            isReady: isReady as unknown as boolean
        }


    }
})
</script>