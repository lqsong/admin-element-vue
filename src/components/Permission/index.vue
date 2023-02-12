<script setup lang="ts">
import { computed } from "vue";
import Result from "@/components/Result/index.vue";
import { useUserStore } from "@/store/user";
import { hasPermissionRoles } from "@/utils/router";

interface PermissionProps {
	roles?: string | string[];
}
const props = withDefaults(defineProps<PermissionProps>(), {});

const userStore = useUserStore();

// 是否有权限
const isPermission = computed(() => hasPermissionRoles(userStore.roles, props.roles));
</script>
<template>
	<slot v-if="isPermission"></slot>
	<slot v-else name="nodata">
		<Result status="403" title="403" subtitle="Sorry, you are not authorized to access this page.">
			<template #extra>
				<router-link to="/">
					<el-button type="primary"> Back Home </el-button>
				</router-link>
			</template>
		</Result>
	</slot>
</template>
