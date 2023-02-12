<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";

import ScreenTable from "@/components/ScreenTable/index.vue";
import ScreenTableSearch from "@/components/ScreenTable/search.vue";
import { IPopoverTableColumnItem } from "@/components/ScreenTable/data.d";

import TypeSelect from "./components/TypeSelect/index.vue";

import { ITableData, ITableListItem } from "./data";
import { IResponseData } from "@/@types/utils.request";
import { queryList } from "./service";

// 高级搜索 - 表单
const searchForm = reactive<Omit<ITableListItem, "id">>({
	name: "",
	desc: "",
	href: "",
	type: "",
});

// 表格 - ref
const screenTableRef = ref<InstanceType<typeof ScreenTable> | null>(null);

// 表格 - 列
const tablePopoverColumn = ref<IPopoverTableColumnItem[]>([
	{
		label: "名称",
		key: "name",
		checked: true,
		disabled: true,
		prop: "name",
		fixed: true,
		minWidth: "135",
	},
	{
		label: "备注",
		key: "desc",
		checked: true,
		prop: "desc",
		minWidth: "150",
	},
	{
		label: "位置",
		key: "type",
		checked: true,
		prop: "type",
		minWidth: "150",
	},
]);

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

// 表格列 - 配置 - 保存按钮
const clickPopoverColumnSubmit = () => {
	ElMessage.success("点击了保存表格列");
};

/* ====================== 搜索 - 高级搜索 S ============== */
// 高级搜索 - 提交
const onSearch = () => {
	getList(1);
	screenTableRef.value?.setSearchDrawerVisible(false);
};
// 高级搜索 - 重置
const onReset = () => {
	searchForm.name = "";
	searchForm.href = "";
	searchForm.type = "";
	searchForm.type = "";
	onSearch();
};
</script>
<template>
	<ScreenTable
		ref="screenTableRef"
		row-key="id"
		:data="tableData.list"
		:loading="tableData.loading"
		:pagination="tableData.pagination"
		:search-show="true"
		:setting-btn-show="true"
		:popover-column="tablePopoverColumn"
		@click-popover-column-submit="clickPopoverColumnSubmit"
	>
		<template #header>
			<el-row>
				<el-col :span="8">
					<el-button type="primary">新增</el-button>
				</el-col>
			</el-row>
		</template>

		<template #search>
			<ScreenTableSearch>
				<el-form class="padding-lr16" :model="searchForm" label-suffix=":" label-position="top">
					<el-form-item label="名称">
						<el-input placeholder="请输入" v-model="searchForm.name" />
					</el-form-item>
					<el-form-item label="链接">
						<el-input placeholder="请输入" v-model="searchForm.href" />
					</el-form-item>
					<el-form-item label="位置">
						<TypeSelect placeholder="请选择" v-model="searchForm.type" style="width: 100%" />
					</el-form-item>
					<el-form-item label="备注">
						<el-input placeholder="请输入" v-model="searchForm.desc" />
					</el-form-item>
				</el-form>
				<template #footer>
					<el-button @click="onReset"> 重置 </el-button>
					<el-button type="primary" @click="onSearch"> 搜索 </el-button>
				</template>
			</ScreenTableSearch>
		</template>

		<el-table-column fixed label="序号" type="index" :index="tableIndexMethod" width="80"> </el-table-column>

		<template v-for="(item, index) in tablePopoverColumn" :key="index">
			<template v-if="item.checked">
				<el-table-column
					v-if="item.prop === 'type'"
					show-overflow-tooltip
					:fixed="item.fixed"
					:label="item.label"
					:prop="item.prop"
					:width="item.width"
					:min-width="item.minWidth"
				>
					<template #default="{ row }">
						<el-tag v-if="row.type === 'header'" type="success">头部</el-tag>
						<el-tag v-else type="warning">底部</el-tag>
					</template>
				</el-table-column>
				<el-table-column
					v-else
					show-overflow-tooltip
					:fixed="item.fixed"
					:label="item.label"
					:prop="item.prop"
					:width="item.width"
					:min-width="item.minWidth"
				/>
			</template>
		</template>

		<el-table-column label="操作" prop="action" width="150" fixed="right">
			<template #default>
				<el-button type="primary" link>编辑</el-button>
				<el-button type="primary" link>删除</el-button>
			</template>
		</el-table-column>
	</ScreenTable>
</template>
