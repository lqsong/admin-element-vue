<script lang="ts">
export default {
	name: "NotFound",
};
</script>
<script setup lang="ts">
import Result from "@/components/Result/index.vue";
</script>

<template>
	<Result status="500" title="500" subtitle="Sorry, the server is reporting an error.">
		<template #extra>
			<router-link to="/">
				<el-button type="primary"> Back Home </el-button>
			</router-link>
		</template>
	</Result>
</template>
