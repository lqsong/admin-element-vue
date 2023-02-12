<script lang="ts" setup>
import { toRefs } from "vue";
import { RouteRecordRaw } from "vue-router";

import Permission from "@/components/Permission/index.vue";

import { useGlobalStore } from "@/store/global";
import { useMlRightTopTabNavStore } from "../store/rightTopTabNav";

interface Props {
	routeItem: RouteRecordRaw;
}

const props = withDefaults(defineProps<Props>(), {});

const { routeItem } = toRefs(props);

const globalStore = useGlobalStore();
const mlRightTopTabNavStore = useMlRightTopTabNavStore();
</script>

<template>
	<div class="member-layout-right-main">
		<Permission :roles="routeItem?.meta?.roles">
			<router-view v-slot="{ Component, route }">
				<KeepAlive :include="mlRightTopTabNavStore.keepAliveInclude" v-if="globalStore.isTabsNav">
					<component :is="Component" :key="route.path" v-if="!mlRightTopTabNavStore.isRouterRefresh" />
				</KeepAlive>
				<component v-else :is="Component" :key="route.path" />
			</router-view>
		</Permission>
	</div>
</template>
