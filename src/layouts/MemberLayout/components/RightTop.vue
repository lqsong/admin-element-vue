<script lang="ts" setup>
import { toRefs } from "vue";
import { RouteRecordRaw } from "vue-router";
import IconSvg from "@/components/IconSvg/index.vue";
import SelectLang from "@/components/SelectLang/index.vue";
import BreadCrumbs from "./BreadCrumbs.vue";
import RightTopUser from "./RightTopUser.vue";
import RightTopTabNav from "./RightTopTabNav.vue";
import Settings from "./Settings.vue";
import SiderMenu from "./SiderMenu.vue";

import { useGlobalStore } from "@/store/global";
import { IBreadcrumb, IPathKeyRouter } from "@/@types/vue-router";

interface Props {
	menuData: RouteRecordRaw[];
	routeItem: RouteRecordRaw;
	pathKeyRouter: IPathKeyRouter;
	userRoles?: string[];
	breadCrumbs?: IBreadcrumb[];
}

const props = withDefaults(defineProps<Props>(), {
	breadCrumbs: () => {
		return [];
	},
});

const { menuData, routeItem, pathKeyRouter, userRoles, breadCrumbs } = toRefs(props);

const globalStore = useGlobalStore();

// 展开收起左侧
const toggleCollapsed = () => {
	globalStore.collapsed = !globalStore.collapsed;
};
</script>

<template>
	<div
		class="member-layout-right-top"
		:class="{
			collapsed: globalStore.collapsed,
			'is-tabs-nav-no': !globalStore.isTabsNav,
			'menu-layout-horizontal': globalStore.menuLayout === 'horizontal',
		}"
	>
		<div class="member-layout-right-top-box fixed">
			<div class="member-layout-right-header" :class="{ menu: globalStore.menuLayout === 'horizontal' }">
				<div v-if="globalStore.menuLayout === 'vertical'" class="member-layout-right-header-main">
					<div class="member-layout-right-header-collapse">
						<span class="icon" @click="toggleCollapsed">
							<IconSvg v-if="globalStore.collapsed" name="unfold" />
							<IconSvg v-else name="fold" />
						</span>
					</div>
					<div class="member-layout-right-header-main-box">
						<BreadCrumbs :list="breadCrumbs" />
					</div>
				</div>
				<div v-else class="member-layout-right-header-main">
					<div class="member-layout-right-header-logo">
						<router-link to="/" class="logo-url">
							<img class="img" alt="" src="../../../assets/images/logo.png" />
							<span class="text">Admin Element Vue</span>
						</router-link>
					</div>
					<div class="member-layout-right-header-main-box">
						<div class="menu-box">
							<SiderMenu :menu-data="menuData" :route-item="routeItem" :user-roles="userRoles" mode="horizontal" />
						</div>
					</div>
				</div>
				<div class="member-layout-right-header-right">
					<RightTopUser custom-class="member-layout-right-header-right-item" />
					<SelectLang custom-class="member-layout-right-header-right-item" />
					<Settings custom-class="member-layout-right-header-right-item" />
				</div>
			</div>

			<RightTopTabNav v-if="globalStore.isTabsNav" :route-item="routeItem" :path-key-router="pathKeyRouter" />
		</div>
	</div>
</template>
