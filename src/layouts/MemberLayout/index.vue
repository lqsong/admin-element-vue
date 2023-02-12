<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import LeftSider from "./components/LeftSider.vue";
import RightTop from "./components/RightTop.vue";
import Main from "./components/Main.vue";

import { useGlobalStore } from "@/store/global";
import { useUserStore } from "@/store/user";

import { formatRoutes, getBreadcrumbRoutes } from "@/utils/router";
import { useTitle } from "@/composables/useTitle";
import layoutRotes from "./routes";

import { useI18n } from "@/composables/useI18n";
import locales from "./locales";
const t = useI18n(locales);

const route = useRoute();
const globalStore = useGlobalStore();
const userStore = useUserStore();

// 框架所有菜单路由 与 patch key格式的所有菜单路由
const routerPathKeyRouter = ref(formatRoutes(layoutRotes));

// 当前路由 item
const routeItem = computed(() => routerPathKeyRouter.value.pathKeyRouter[route.path]);

// 面包屑导航
const breadCrumbs = computed(() => getBreadcrumbRoutes(route.path, routerPathKeyRouter.value.pathKeyRouter));

// 设置title
useTitle(routeItem, t);
</script>
<template>
	<div class="member-layout" :class="{ 'light-menu': globalStore.menuStyle === 'light' }">
		<LeftSider
			v-if="globalStore.menuLayout === 'vertical'"
			:menu-data="routerPathKeyRouter.router"
			:route-item="routeItem"
			:user-roles="userStore.roles"
			:collapsed="globalStore.collapsed"
		/>
		<div class="member-layout-right">
			<RightTop
				:menu-data="routerPathKeyRouter.router"
				:route-item="routeItem"
				:path-key-router="routerPathKeyRouter.pathKeyRouter"
				:user-roles="userStore.roles"
				:bread-crumbs="breadCrumbs"
			/>

			<Main :route-item="routeItem" />

			<div v-if="globalStore.isLayoutFooter" class="member-layout-right-footer">
				Copyright © 2020 liqingsong.cc, All Rights Reserved
			</div>
		</div>
	</div>
</template>
<style lang="scss">
@import "./css/index.scss";
</style>
