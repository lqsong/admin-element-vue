<script setup lang="ts">
import Spin from "@/components/Spin/index.vue";
</script>
<template>
	<div class="ft-page-loading">
		<Spin size="lg" />
	</div>
</template>
<style lang="scss" scoped>
.ft-page-loading {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100px;
}
</style>
