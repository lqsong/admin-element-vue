<script setup lang="ts">
import Result from "@/components/Result/index.vue";
</script>

<template>
	<Result status="error" title="操作失败" subtitle="请核对并修改信息后，再重新提交。">
		<template #extra>
			<el-button type="primary"> 返回修改 </el-button>
			<el-button> 返回首页 </el-button>
		</template>
	</Result>
</template>
