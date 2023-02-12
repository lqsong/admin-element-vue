<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { IResponseData } from "@/@types/utils.request";

import IconSvg from "@/components/IconSvg/index.vue";
import TypeSelect from "./components/TypeSelect/index.vue";
import { ITableData, ITableListItem } from "./data";
import { queryList } from "./service";

const table = reactive<ITableData>({
	loading: false,
	list: [],
	pagination: {
		total: 0,
		current: 1,
		pageSize: 10,
	},
});

const getList = async (current: number): Promise<void> => {
	table.loading = true;
	try {
		const response: IResponseData<any> = await queryList({
			per: table.pagination.pageSize,
			page: current,
		});
		const { data } = response;
		table.list = data.list || [];
		table.pagination = {
			...table.pagination,
			total: data.total || 0,
			current,
		};
	} catch (error: any) {
		console.log(error);
	}
	table.loading = false;
};
onMounted(() => {
	getList(1);
});

// 搜索
const searchOpen = ref<boolean>(false);
const setSearchOpen = (): void => {
	searchOpen.value = !searchOpen.value;
};
// 搜索- 表单
const searchFormRef = ref<FormInstance>();
const searchModelRef = reactive<Omit<ITableListItem, "id">>({
	name: "",
	desc: "",
	href: "",
	type: "",
});
// 搜索- 表单 - 重置
const searchResetFields = () => {
	searchFormRef.value?.resetFields();
	searchModelRef.name = "";
	searchModelRef.desc = "";
	searchModelRef.href = "";
	searchModelRef.type = "";
};
// 搜索- 表单 -搜索
const searchFormSubmit = async () => {
	try {
		console.log("search", searchModelRef);
		ElMessage.success("进行了搜索!");
	} catch (error: any) {
		ElMessage.warning(error);
	}
};
</script>
<template>
	<el-card shadow="never" style="margin-bottom: 15px" :body-style="{ 'padding-bottom': '0' }">
		<el-form :model="searchModelRef" ref="searchFormRef" label-width="80px">
			<el-row :gutter="16" type="flex" justify="end" class="flex-wrap-wrap">
				<el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
					<el-form-item label="名称：">
						<el-input placeholder="请输入" v-model="searchModelRef.name" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
					<el-form-item label="链接：">
						<el-input placeholder="请输入" v-model="searchModelRef.href" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
					<el-form-item label="位置：">
						<TypeSelect placeholder="请选择" v-model="searchModelRef.type" style="width: 100%" />
					</el-form-item>
				</el-col>
				<el-col v-if="searchOpen" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
					<el-form-item label="备注：">
						<el-input placeholder="请输入" v-model="searchModelRef.desc" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
					<div style="padding-bottom: 24px; text-align: right">
						<el-button type="primary" @click="searchFormSubmit">查询</el-button>
						<el-button @click="searchResetFields">重置</el-button>
						<el-button type="primary" link style="margin-left: 8px" @click="setSearchOpen">
							<template v-if="searchOpen"> 收起 <IconSvg name="arrow-up"></IconSvg> </template>
							<template v-else> 展开 <IconSvg name="arrow-down"></IconSvg> </template>
						</el-button>
					</div>
				</el-col>
			</el-row>
		</el-form>
	</el-card>

	<el-card shadow="never">
		<template #header>
			<el-row>
				<el-col :span="8">
					<el-button type="primary">新增</el-button>
				</el-col>
				<el-col :span="16"> </el-col>
			</el-row>
		</template>

		<div style="width: 99.9%">
			<el-table row-key="id" :data="table.list" v-loading="table.loading">
				<el-table-column
					type="index"
					label="序号"
					:index="
						(index) => {
							return (table.pagination.current - 1) * table.pagination.pageSize + index + 1;
						}
					"
					width="80"
				>
				</el-table-column>

				<el-table-column label="名称" prop="name">
					<template #default="{ row }">
						<a :href="row.href" target="_blank">{{ row.name }}</a>
					</template>
				</el-table-column>

				<el-table-column label="备注" prop="desc"> </el-table-column>

				<el-table-column label="位置" prop="type">
					<template #default="{ row }">
						<el-tag v-if="row.type === 'header'" type="success">头部</el-tag>
						<el-tag v-else type="warning">底部</el-tag>
					</template>
				</el-table-column>

				<el-table-column label="操作" prop="action" width="160">
					<template #default>
						<el-button type="primary" link>编辑</el-button>
						<el-button type="primary" link>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="padding-t10">
			<el-pagination
				background
				layout="prev, pager, next"
				v-model:current-page="table.pagination.current"
				:page-size="table.pagination.pageSize"
				:total="table.pagination.total"
				@current-change="
					(p) => {
						getList(p || 1);
					}
				"
			>
			</el-pagination>
		</div>
	</el-card>
</template>
