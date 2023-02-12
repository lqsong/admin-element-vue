<script lang="ts">
export default {
	name: "NotFound",
};
</script>
<script setup lang="ts">
import Result from "@/components/Result/index.vue";
</script>

<template>
	<Result status="403" title="403" subtitle="Sorry, you don't have access to this page.">
		<template #extra>
			<router-link to="/">
				<el-button type="primary"> Back Home </el-button>
			</router-link>
		</template>
	</Result>
</template>
