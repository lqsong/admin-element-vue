<script lang="ts" setup>
import { toRefs } from "vue";
import { RouteRecordRaw } from "vue-router";

import { isArray } from "@/utils/is";
import { hasChildRoute, hasPermissionRoles } from "@/utils/router";

import ALink from "@/components/ALink/index.vue";
import Icon from "@/components/IconSvg/index.vue";

import { useI18n } from "@/composables/useI18n";
import locales from "../locales";

interface Props {
	routeItem: RouteRecordRaw;
	userRoles?: string[];
}

const props = withDefaults(defineProps<Props>(), {
	userRoles: () => {
		return [];
	},
});

const { routeItem, userRoles } = toRefs(props);

const t = useI18n(locales);
</script>
<template>
	<template v-if="!routeItem.meta?.hidden && hasPermissionRoles(userRoles, routeItem.meta?.roles)">
		<template v-if="routeItem.children && isArray(routeItem.children) && hasChildRoute(routeItem.children)">
			<el-sub-menu :index="routeItem.path" popper-class="member-layout-menu-popper">
				<template #title>
					<Icon v-if="routeItem.meta?.icon" :name="routeItem.meta?.icon" class="icon" />
					<span>{{ t(routeItem.meta?.title || "") }}</span>
				</template>
				<SiderMenuItem
					v-for="item2 in routeItem.children"
					:key="item2.path"
					:route-item="item2"
					:user-roles="userRoles"
				/>
			</el-sub-menu>
		</template>
		<template v-else>
			<ALink :to="routeItem.path">
				<el-menu-item :index="routeItem.path">
					<Icon v-if="routeItem.meta?.icon" :name="routeItem.meta?.icon" class="icon" />
					<template #title>{{ t(routeItem.meta?.title || "") }}</template>
				</el-menu-item>
			</ALink>
		</template>
	</template>
</template>
