<script setup lang="ts">
interface SpinProps {
	size?: "lg" | "default";
}
const props = withDefaults(defineProps<SpinProps>(), {
	size: "default",
});
</script>
<template>
	<div class="ft-spin" :class="{ lg: props.size === 'lg' }">
		<div class="ft-spin-dot">
			<i class="ft-spin-dot-item"></i>
			<i class="ft-spin-dot-item"></i>
			<i class="ft-spin-dot-item"></i>
			<i class="ft-spin-dot-item"></i>
		</div>
	</div>
</template>
<style lang="scss" scoped>
@keyframes ft-spin-move {
	to {
		opacity: 1;
	}
}

@keyframes ft-rotate {
	to {
		transform: rotate(360deg);
	}
}
.ft-spin {
	position: static;
	box-sizing: border-box;
	display: inline-block;
	padding: 0;
	margin: 0;
	font-size: 14px;
	font-feature-settings: "tnum";
	font-variant: tabular-nums;
	line-height: 1.5715;
	text-align: center;
	vertical-align: middle;
	opacity: 1;
	transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
	.ft-spin-dot {
		position: relative;
		display: inline-block;
		width: 1em;
		height: 1em;
		font-size: 20px;
		transform: rotate(0);
		animation: ft-rotate 1.2s infinite linear;
		.ft-spin-dot-item {
			position: absolute;
			display: block;
			width: 9px;
			height: 9px;
			background-color: var(--ft-color-primary);
			border-radius: 100%;
			opacity: 0.3;
			transform: scale(0.75);
			transform-origin: 50% 50%;
			animation: ft-spin-move 1s infinite linear alternate;
			&:nth-child(1) {
				top: 0;
				left: 0;
			}
			&:nth-child(2) {
				top: 0;
				right: 0;
				animation-delay: 0.4s;
			}
			&:nth-child(3) {
				right: 0;
				bottom: 0;
				animation-delay: 0.8s;
			}
			&:nth-child(4) {
				bottom: 0;
				left: 0;
				animation-delay: 1.2s;
			}
		}
	}
	&.lg {
		.ft-spin-dot {
			font-size: 32px;
			i {
				width: 14px;
				height: 14px;
			}
		}
	}
}
</style>
