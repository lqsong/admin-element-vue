<script lang="ts">
export default {
	name: "NotFound",
};
</script>
<script setup lang="ts">
import Result from "@/components/Result/index.vue";
</script>

<template>
	<Result status="404" title="404" subtitle="Sorry, the page you visited does not exist.">
		<template #extra>
			<router-link to="/">
				<el-button type="primary"> Back Home </el-button>
			</router-link>
		</template>
	</Result>
</template>
