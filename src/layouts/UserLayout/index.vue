<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { formatRoutes } from "@/utils/router";
import { useTitle } from "@/composables/useTitle";
import layoutRotes from "./routes";

import { useI18n } from "@/composables/useI18n";
const t = useI18n();

const route = useRoute();

// 框架所有菜单路由 与 patch key格式的所有菜单路由
const routerPathKeyRouter = ref(formatRoutes(layoutRotes));

// 当前路由 item
const routeItem = computed(() => routerPathKeyRouter.value.pathKeyRouter[route.path]);

// 设置title
useTitle(routeItem, t);
</script>
<template>
	<div class="user-layout">
		<router-view />
	</div>
</template>
<style scoped lang="scss">
.user-layout {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-image: url("../../assets/images/bg.svg");
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: 50%;
	background-size: cover;
}
</style>
