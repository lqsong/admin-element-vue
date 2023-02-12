<script lang="ts">
export default {
	name: "ScreenTableSearch",
};
</script>
<template>
	<div class="screen-table-search-box"><slot></slot></div>
	<div v-if="$slots.footer" class="screen-table-search-footer"><slot name="footer"></slot></div>
</template>
<style lang="scss">
/* popper class */
.screen-table-search-box {
	flex: 1;
	overflow: auto;
}
.screen-table-search-footer {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	height: 69px;
	padding: 0 16px;
	border-top: 1px solid #e8e8e8;
}
</style>
