<script lang="ts" setup>
import { toRefs } from "vue";
import { RouteRecordRaw } from "vue-router";

import SiderMenu from "./SiderMenu.vue";

interface Props {
	menuData: RouteRecordRaw[];
	routeItem: RouteRecordRaw;
	userRoles?: string[];
	collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	userRoles: () => {
		return [];
	},
	collapsed: false,
});
const { menuData, routeItem, userRoles, collapsed } = toRefs(props);
</script>

<template>
	<div class="member-layout-left" :class="{ collapsed: collapsed }">
		<div class="member-layout-left-box fixed">
			<div class="member-layout-left-logo">
				<router-link to="/" class="logo-url">
					<img class="img" alt="" src="../../../assets/images/logo.png" />
					<span v-if="!collapsed" class="text">Admin Element Vue</span>
				</router-link>
			</div>

			<div class="member-layout-left-menu">
				<SiderMenu :menu-data="menuData" :route-item="routeItem" :user-roles="userRoles" :collapsed="collapsed" />
			</div>
		</div>
	</div>
</template>
