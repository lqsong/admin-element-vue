<script lang="ts" setup>
import { ref, toRefs, watch, nextTick } from "vue";
import { RouteRecordRaw } from "vue-router";

import { getSelectLeftMenuPath } from "@/utils/router";

import SiderMenuItem from "./SiderMenuItem.vue";

interface Props {
	menuData: RouteRecordRaw[];
	routeItem: RouteRecordRaw;
	userRoles?: string[];
	mode?: "horizontal" | "vertical";
	collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	userRoles: () => {
		return [];
	},
	mode: "vertical",
	collapsed: false,
});

const { menuData, routeItem, userRoles, mode, collapsed } = toRefs(props);

// 左侧选择的菜单
const defaultActive = ref<string>(getSelectLeftMenuPath(routeItem.value));

watch([routeItem], async () => {
	await nextTick();

	defaultActive.value = getSelectLeftMenuPath(routeItem.value);
});
</script>

<template>
	<el-menu
		class="member-layout-menu"
		:mode="mode"
		:collapse="collapsed"
		:collapse-transition="false"
		:default-active="defaultActive"
	>
		<SiderMenuItem v-for="item in menuData" :key="item.path" :route-item="item" :user-roles="userRoles" />
	</el-menu>
</template>
