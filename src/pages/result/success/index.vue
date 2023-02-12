<script setup lang="ts">
import Result from "@/components/Result/index.vue";
</script>

<template>
	<Result status="success" title="操作成功" subtitle="成功结果页用于反馈一系列操作任务的处理结果">
		<template #extra>
			<el-button type="primary"> 返回列表 </el-button>
			<el-button> 查看详情 </el-button>
		</template>
	</Result>
</template>
