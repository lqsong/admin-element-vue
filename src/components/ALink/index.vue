<script lang="ts" setup>
import { toRefs } from "vue";
import { isExternal } from "@/utils/is";

interface Props {
	to: string;
	replace?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	replace: false,
});

const { to, replace } = toRefs(props);
</script>

<template>
	<a v-if="isExternal(to)" :href="to" target="_blank" rel="noreferrer">
		<slot></slot>
	</a>
	<router-link v-else :to="to" :replace="replace">
		<slot></slot>
	</router-link>
</template>
