<script lang="ts" setup>
import { computed } from "vue";

interface Props {
	modelValue: string;
	placeholder?: string;
	clearable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: "please choose",
	clearable: true,
});

const emit = defineEmits<{
	(e: "update:modelValue", value: string): void;
}>();

// 数据值

const value = computed<string>({
	get: () => props.modelValue,

	set: (val) => {
		emit("update:modelValue", val);
	},
});
</script>
<template>
	<el-select v-model="value" :placeholder="placeholder" :clearable="clearable">
		<!-- <el-option label="请选择" value="" disabled></el-option> -->
		<el-option label="头部" value="header"></el-option>
		<el-option label="底部" value="footer"></el-option>
	</el-select>
</template>
