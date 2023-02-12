<script setup lang="ts">
import { onMounted, reactive } from "vue";
import ScreenTable from "@/components/ScreenTable/index.vue";
import { ITableData } from "./data";
import { IResponseData } from "@/@types/utils.request";
import { queryList } from "./service";
/* ====================== 表格 - 获取数据 S ============== */
// 表格 - 列表 - 初始化数据
const tableData = reactive<ITableData>({
	loading: false,
	list: [],
	pagination: {
		total: 0,
		current: 1,
		pageSize: 20,
		sizeChange: () => {},
		onChange: () => {},
	},
});

// 表格 - index
const tableIndexMethod = (index: number) => {
	return index + (tableData.pagination.current - 1) * tableData.pagination.pageSize + 1;
};

const getList = async (current: number): Promise<void> => {
	tableData.loading = true;
	try {
		const response: IResponseData<any> = await queryList({
			per: tableData.pagination.pageSize,
			page: current,
		});
		const { data } = response;
		tableData.list = data.list || [];
		tableData.pagination = {
			total: data.total || 0,
			current,
			pageSize: tableData.pagination.pageSize,
			sizeChange: (size) => {
				tableData.pagination.pageSize = size;
				tableData.pagination.onChange(1);
			},
			onChange: (current) => {
				getList(current);
			},
		};
	} catch (error: any) {
		console.log(error);
	}
	tableData.loading = false;
};
onMounted(() => {
	getList(1);
});
</script>
<template>
	<ScreenTable row-key="id" :data="tableData.list" :loading="tableData.loading" :pagination="tableData.pagination">
		<template #header>
			<el-row>
				<el-col :span="8">
					<el-button type="primary">新增</el-button>
				</el-col>
			</el-row>
		</template>

		<el-table-column fixed label="序号" type="index" :index="tableIndexMethod" width="80"> </el-table-column>
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
		<el-table-column label="操作" prop="action" width="150" fixed="right">
			<template #default>
				<el-button type="primary" link>编辑</el-button>
				<el-button type="primary" link>删除</el-button>
			</template>
		</el-table-column>
	</ScreenTable>
</template>
