<template>
    <el-dropdown  @command="onMenuClick">
        <a class="indexlayout-top-usermenu ant-dropdown-link" @click="e => e.preventDefault()">
            {{currentUser.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
        </a>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="userinfo">
                    {{t('index-layout.topmenu.userinfo')}}
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                   {{t('index-layout.topmenu.logout')}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { StateType as UserStateType, CurrentUser } from "@/store/user";
interface RightTopUserSetupData {
    t: (key: string | number) => string;
    currentUser: ComputedRef<CurrentUser>;
    onMenuClick: (event: any) => Promise<void>;
}
export default defineComponent({
    name: 'RightTopUser',
    setup(): RightTopUserSetupData {
        const store = useStore<{user: UserStateType}>();
        const router = useRouter();
        const { t } = useI18n();


        // 获取当前登录用户信息
        const currentUser = computed<CurrentUser>(()=> store.state.user.currentUser);

        // 点击菜单
        const onMenuClick = async (command: string) => {

            if (command === 'logout') {
                const res: boolean = await store.dispatch('user/logout');
                if(res === true) {
                    router.replace({
                        path: '/user/login',
                        query: {
                            redirect: router.currentRoute.value.path,
                            ...router.currentRoute.value.query
                        }
                    })
                }
            }

        }



        return {
            t,
            currentUser,
            onMenuClick
        }
    }
})
</script>