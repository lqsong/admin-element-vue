<script lang="ts">
export default {
	name: "FormStep",
};
</script>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";

const setpActive = ref(0);

// 表单1
const ruleFormRef1 = ref<FormInstance>();
const ruleForm1 = reactive({
	username: "",
	password: "",
	qrpassword: "",
	email: "",
});

const rules1 = reactive<FormRules>({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }],
	qrpassword: [
		{
			validator: (rule: any, value: any, callback: any) => {
				if (value === "") {
					callback(new Error("请输入确认密码"));
				} else if (value !== ruleForm1.password) {
					callback(new Error("两次密码不一致"));
				} else {
					callback();
				}
			},
			trigger: "blur",
		},
	],
	email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
});
const submitForm1 = async () => {
	try {
		const valid: boolean | undefined = await ruleFormRef1.value?.validate();
		if (valid === true) {
			// ElMessage.success("提交成功");
			setpActive.value = 1;
		}
	} catch (error: any) {
		console.log(error);
		ElMessage.warning("验证不通过，请检查输入");
	}
};

// 表单1
const ruleFormRef2 = ref<FormInstance>();
const ruleForm2 = reactive({
	companyName: "",
	address: "",
	tel: "",
	code: "",
});

const rules2 = reactive<FormRules>({
	companyName: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
});
const submitForm2 = async () => {
	try {
		const valid: boolean | undefined = await ruleFormRef2.value?.validate();
		if (valid === true) {
			// ElMessage.success("提交成功");
			setpActive.value = 3;
		}
	} catch (error: any) {
		console.log(error);
		ElMessage.warning("验证不通过，请检查输入");
	}
};
</script>

<template>
	<el-card shadow="never">
		<el-steps :space="400" :active="setpActive">
			<el-step title="填写账号信息" />
			<el-step title="完善公司信息" />
			<el-step title="完成" />
		</el-steps>
		<div style="max-width: 900px; padding-top: 20px">
			<el-form
				v-show="setpActive === 0"
				ref="ruleFormRef1"
				:model="ruleForm1"
				:rules="rules1"
				label-position="top"
				label-width="120px"
				require-asterisk-position="right"
			>
				<el-form-item label="用户名" prop="username">
					<el-input v-model="ruleForm1.username" placeholder="请输入用户名" />
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="ruleForm1.password" placeholder="请输入密码" type="password" />
				</el-form-item>
				<el-form-item label="确认密码" prop="qrpassword">
					<el-input v-model="ruleForm1.qrpassword" placeholder="请输入密码" type="password" />
				</el-form-item>
				<el-form-item label="电子邮箱" prop="email">
					<el-input v-model="ruleForm1.email" placeholder="请输入电子邮箱" />
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm1()"> 下一步 </el-button>
				</el-form-item>
			</el-form>

			<el-form
				v-show="setpActive === 1"
				ref="ruleFormRef2"
				:model="ruleForm2"
				:rules="rules2"
				label-position="top"
				label-width="120px"
				require-asterisk-position="right"
			>
				<el-form-item label="公司名称" prop="companyName">
					<el-input v-model="ruleForm2.companyName" placeholder="请输入公司名称" />
				</el-form-item>
				<el-form-item label="公司地址">
					<el-input v-model="ruleForm2.address" placeholder="请输入公司地址" />
				</el-form-item>
				<el-form-item label="公司电话">
					<el-input v-model="ruleForm2.tel" placeholder="请输入公司电话" />
				</el-form-item>
				<el-form-item label="邮政编码">
					<el-input v-model="ruleForm2.code" placeholder="请输入邮政编码" />
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="setpActive = 0"> 上一步 </el-button>
					<el-button type="primary" @click="submitForm2()"> 提交 </el-button>
				</el-form-item>
			</el-form>

			<el-result
				v-show="setpActive === 3"
				icon="success"
				title="注册完成"
				sub-title="审核结果，预计12～24个小时发至邮箱"
			>
				<template #extra>
					<el-button type="primary" @click="setpActive = 0">再次注册</el-button>
					<el-button>跳转登录</el-button>
				</template>
			</el-result>
		</div>
	</el-card>
</template>

<style scoped lang="scss"></style>
