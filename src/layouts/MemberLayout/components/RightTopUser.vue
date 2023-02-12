<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { removeToken } from "@/utils/localToken";
import IconSvg from "@/components/IconSvg/index.vue";

import { useUserStore } from "@/store/user";

import { useI18n } from "@/composables/useI18n";
import locales from "../locales";

interface Props {
	customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
	customClass: "",
});

const t = useI18n(locales);

const router = useRouter();
const userStore = useUserStore();

// 点击菜单
const onMenuClick = async (command: string) => {
	if (command === "logout") {
		userStore.reset();
		removeToken();
		router.replace({
			path: "/user/login",
			query: {
				redirect: router.currentRoute.value.path,
				...router.currentRoute.value.query,
			},
		});
	} else if (command === "userinfo") {
		ElMessage.info("点击个人信息");
	}
};
</script>
<template>
	<el-dropdown @command="onMenuClick">
		<span class="usermenu" :class="props.customClass" :title="userStore.name">
			<span class="text">{{ userStore.name }}</span>
			<IconSvg class="arrow-down" name="arrow-down" />
		</span>

		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item command="userinfo">
					{{ t("member-layout.topmenu.userinfo") }}
				</el-dropdown-item>

				<el-dropdown-item command="logout">
					{{ t("member-layout.topmenu.logout") }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
<style lang="scss" scoped>
.usermenu {
	cursor: pointer;
	.text {
		display: inline-block;
		max-width: 55px;
		margin-right: 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.arrow-down {
		font-size: 12px;
	}
}
</style>
