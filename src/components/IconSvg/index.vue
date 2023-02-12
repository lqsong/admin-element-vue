<script setup lang="ts">
interface SvgProps {
	name: string;
	iconStyle?: { [key: string]: any };
}
const props = withDefaults(defineProps<SvgProps>(), {
	iconStyle: () => ({}),
});
</script>
<template>
	<svg class="svg-icon" :style="props.iconStyle" aria-hidden="true">
		<use :xlink:href="`#icon-${props.name}`" />
	</svg>
</template>
<style lang="scss" scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	overflow: hidden;
	vertical-align: -0.15em;
	fill: currentcolor;
}
</style>
