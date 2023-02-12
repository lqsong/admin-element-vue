<template>
	<div class="result">
		<div class="result-icon">
			<slot name="icon">
				<unauthorized v-if="props.status === '403'" />
				<noFound v-else-if="props.status === '404'" />
				<serverError v-else-if="props.status === '500'" />
				<span v-else-if="props.status === 'success'" class="icon-sys icon-success"><success /></span>
				<span v-else-if="props.status === 'warning'" class="icon-sys icon-warning"><warning /></span>
				<span v-else-if="props.status === 'error'" class="icon-sys icon-error"><error /></span>
				<span v-else class="icon-sys icon-info"><info /></span>
			</slot>
		</div>
		<div class="result-title">{{ props.title }}</div>
		<div class="result-subtitle">{{ props.subtitle }}</div>
		<div class="result-content" v-if="$slots.default"><slot></slot></div>
		<div class="result-extra"><slot name="extra"></slot></div>
	</div>
</template>
<script setup lang="ts">
import info from "./svg/info.vue";
import success from "./svg/success.vue";
import warning from "./svg/warning.vue";
import error from "./svg/error.vue";
import unauthorized from "./svg/unauthorized.vue";
import serverError from "./svg/serverError.vue";
import noFound from "./svg/noFound.vue";

interface Props {
	status?: "info" | "success" | "warning" | "error" | "403" | "404" | "500";
	title?: string;
	subtitle?: string;
}
const props = withDefaults(defineProps<Props>(), {
	status: "info",
	title: "",
	subtitle: "",
});
</script>
<style lang="scss" scoped>
.result {
	box-sizing: border-box;
	padding: 48px 32px;
	margin: 0;
	.icon-sys {
		font-size: 72px;
	}
	.icon-info {
		color: #1890ff;
	}
	.icon-success {
		color: #52c41a;
	}
	.icon-warning {
		color: #faad14;
	}
	.icon-error {
		color: #f5222d;
	}
	.result-icon {
		margin-bottom: 24px;
		text-align: center;
	}
	.result-image {
		width: 250px;
		height: 295px;
		margin: auto;
	}
	.result-title {
		font-size: 24px;
		line-height: 1.8;
		color: rgb(0 0 0 / 85%);
		text-align: center;
	}
	.result-subtitle {
		font-size: 14px;
		line-height: 1.6;
		color: rgb(0 0 0 / 45%);
		text-align: center;
	}
	.result-extra {
		margin-top: 32px;
		text-align: center;
	}
	.result-content {
		padding: 24px 40px;
		margin-top: 24px;
		background-color: #fafafa;
	}
}
</style>
