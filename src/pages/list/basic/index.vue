<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import IconSvg from "@/components/IconSvg/index.vue";
import { ITableData } from "./data";
import { queryList } from "./service";
import { IResponseData } from "@/@types/utils.request";

const searchVal = ref<string>("");

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
</script>
<template>
	<el-card shadow="never">
		<template #header>
			<el-row>
				<el-col :span="8">
					<el-button type="primary">新增</el-button>
				</el-col>
				<el-col :span="16">
					<el-input v-model="searchVal" style="float: right; width: 200px" placeholder="请输入搜索内容">
						<template #suffix>
							<i class="el-input__icon"><IconSvg name="search" class="cursor-pointer"></IconSvg></i>
						</template>
					</el-input>
				</el-col>
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
