<script lang="ts">
export default {
	name: "FormBase",
};
</script>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { IFormData } from "./data";
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<IFormData>({
	name: "",
	date: "",
	select: "",
	radio1: "",
	radio2: "",
	checkbox: [],
	remark: "",
});

const rules = reactive<FormRules>({
	name: [
		{ required: true, message: "请输入标题", trigger: "blur" },
		{ min: 3, max: 5, message: "标题长度3到5个字", trigger: "blur" },
	],
	date: [
		{
			required: true,
			message: "起止日期不能为空",
			trigger: "change",
			type: "array",
		},
	],
	select: [
		{
			required: true,
			message: "请选择",
		},
	],
	radio1: [],
	radio2: [
		{
			required: true,
			message: "请选择",
		},
	],
	checkbox: [],
	remark: [],
});

const submitForm = async () => {
	try {
		const valid: boolean | undefined = await ruleFormRef.value?.validate();
		if (valid === true) {
			ElMessage.success("提交成功");
		}
	} catch (error: any) {
		console.log(error);
		ElMessage.warning("验证不通过，请检查输入");
	}
};
const resetForm = async () => {
	ruleFormRef.value?.resetFields();
};
</script>

<template>
	<el-card shadow="never">
		<el-form
			ref="ruleFormRef"
			:model="ruleForm"
			:rules="rules"
			label-position="top"
			label-width="120px"
			require-asterisk-position="right"
			style="max-width: 900px"
		>
			<el-form-item label="标题" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入标题" />
			</el-form-item>
			<el-form-item label="起止日期" prop="date">
				<el-date-picker
					type="daterange"
					v-model="ruleForm.date"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					class="form-basic-width100"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="下拉选择" prop="select">
				<el-select v-model="ruleForm.select" placeholder="请选择" clearable style="width: 100%">
					<el-option label="select1" value="1"></el-option>
					<el-option label="select2" value="2"></el-option>
					<el-option label="select3" value="3"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="单选按钮1" prop="radio1">
				<el-radio-group v-model="ruleForm.radio1">
					<el-radio label="1">item 1</el-radio>
					<el-radio label="2">item 2</el-radio>
					<el-radio label="3">item 3</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="单选按钮2" prop="radio2">
				<el-radio-group v-model="ruleForm.radio2">
					<el-radio-button label="1">item 1</el-radio-button>
					<el-radio-button label="2">item 2</el-radio-button>
					<el-radio-button label="3">item 3</el-radio-button>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="复选框" prop="checkbox">
				<el-checkbox-group v-model="ruleForm.checkbox">
					<el-checkbox label="1">item 1</el-checkbox>
					<el-checkbox label="2">item 2</el-checkbox>
					<el-checkbox label="3">item 3</el-checkbox>
					<el-checkbox label="4" disabled>item 4</el-checkbox>
				</el-checkbox-group>
			</el-form-item>

			<el-form-item label="备注" prop="remark">
				<el-input
					type="textarea"
					:autosize="{ minRows: 2, maxRows: 4 }"
					placeholder="请输入内容"
					v-model="ruleForm.remark"
				>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm()"> 提交 </el-button>
				<el-button @click="resetForm()">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<style scoped lang="scss"></style>
