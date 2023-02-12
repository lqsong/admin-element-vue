<script lang="ts" setup>
import { computed, toRefs } from "vue";
import ALink from "@/components/ALink/index.vue";
import { IBreadcrumb } from "@/@types/vue-router";

import { useI18n } from "@/composables/useI18n";
import locales from "../locales";

interface Props {
	list?: IBreadcrumb[];
}

const props = withDefaults(defineProps<Props>(), {
	list: () => {
		return [];
	},
});

const { list } = toRefs(props);

const t = useI18n(locales);

const listIndexLen = computed<number>(() => list.value.length - 1);
</script>

<template>
	<el-breadcrumb>
		<el-breadcrumb-item v-for="(item, index) in list" :key="item.path">
			<span v-if="index === listIndexLen || item.path === ''">{{ t(item.title) }}</span>
			<ALink v-else :to="item.path">{{ t(item.title) }}</ALink>
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>
