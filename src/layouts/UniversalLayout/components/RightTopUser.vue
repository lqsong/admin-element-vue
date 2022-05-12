<template>
    <el-dropdown  @command="onMenuClick">
        <a class="universallayout-top-usermenu" @click="e => e.preventDefault()">
            {{currentUser.name}}
            <icon-svg type="arrow-down"></icon-svg>
        </a>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="userinfo">
                    {{t('universal-layout.topmenu.userinfo')}}
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                   {{t('universal-layout.topmenu.logout')}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { StateType as UserStateType, CurrentUser } from "@/store/user";
import IconSvg from "@/components/IconSvg";

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
</script>
