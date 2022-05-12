<script lang="ts" setup>
import { withDefaults, defineProps, computed, ref, toRefs, watch, nextTick } from "vue"
import { useStore } from 'vuex'
import { RoutesDataItem, getPermissionMenuData, getSelectLeftMenuPath } from '@/utils/routes'
import { StateType as UserStateType } from "@/store/user"
import SiderMenuItem from './SiderMenuItem.vue'

interface Props {
  menuData: RoutesDataItem[];
  routeItem: RoutesDataItem;
  mode?: 'horizontal' | 'vertical';
  collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    mode: 'vertical',
    collapsed: false
})
const { menuData, routeItem, mode, collapsed } = toRefs(props)

const store = useStore<{ user: UserStateType; }>();

// 有权限的菜单
const permissionMenuData = computed<RoutesDataItem[]>(()=> getPermissionMenuData(store.state.user.currentUser.roles, menuData.value))

// 左侧选择的菜单
const defaultActive = ref<string>(getSelectLeftMenuPath(routeItem.value));
watch([routeItem], async () => {
  await nextTick();
  defaultActive.value = getSelectLeftMenuPath(routeItem.value);
})

</script>
<template>
    <el-menu
      class="universallayout-menu"
      :mode="mode"
      :collapse="collapsed"
      :collapse-transition="false"
      :default-active="defaultActive"
    >
      <sider-menu-item
        v-for="item in permissionMenuData"
        :key="item.path"
        :route-item="item"
        >
      </sider-menu-item>

    </el-menu>
</template>
