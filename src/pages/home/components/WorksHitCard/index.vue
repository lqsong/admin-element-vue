<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { IResponseData } from "@/@types/utils.request";
import { ITableData } from "./data";
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
</script>
<template>
	<el-card shadow="never">
		<template #header> 作品浏览量排行 </template>
		<el-table
			size="small"
			header-row-class-name="ft-el-table-header"
			stripe
			row-key="id"
			:data="table.list"
			v-loading="table.loading"
		>
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
			<el-table-column show-overflow-tooltip prop="title" label="标题"> </el-table-column>
			<el-table-column show-overflow-tooltip prop="hit" width="100" label="次数"> </el-table-column>
		</el-table>

		<div class="text-align-right padding-t10">
			<el-pagination
				small
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
