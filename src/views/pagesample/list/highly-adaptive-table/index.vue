<template>

    <screen-table
        class="layout-main-conent"
        row-key="id"
        :data="list"
        :loading="loading"
        :pagination="{
            ...pagination,
            onChange: (page) => {
                getList(page);
            }
        }"
    >

        <template #header>
            <el-row>
                    <el-col :span="8">
                        <el-button type="primary" @click="() => setCreateFormVisible(true)">新增</el-button>
                    </el-col>
                    <el-col :span="16" class="text-align-right">                        
                        <el-input v-model="searchVal" style="width:200px;margin-left: 16px;" placeholder="请输入搜索内容">
                            <template #suffix>
                                <i class="el-input__icon"><icon-svg type="search" class="cursor-pointer"></icon-svg></i>
                            </template>
                        </el-input>
                        <el-button style="margin-left: 8px"  @click="() => searchDrawerVisible = true">高级搜索</el-button>
                    </el-col>
            </el-row>
        </template>


        <el-table-column
            type="index"
            label="序号"
            :index="(index) => {
                return (pagination.current - 1) * pagination.pageSize + index + 1;
            }"
            width="80">
        </el-table-column>

        <el-table-column
            label="名称"
            prop="name">
            <template #default="{row}">
                <a :href="row.href" target="_blank">{{row.name}}</a>                              
            </template>
        </el-table-column>

        <el-table-column
            label="备注"
            prop="desc">
        </el-table-column>

        <el-table-column
            label="位置"
            prop="type">
            <template #default="{row}">
                <el-tag v-if="row.type === 'header'" type="success">头部</el-tag>
                <el-tag v-else type="warning">底部</el-tag>                            
            </template>
        </el-table-column>

        <el-table-column
            label="操作"
            prop="action"
            width="150">
            <template #default="{row}">
                <el-button type="text" @click="() => detailUpdateData(row.id)" :loading="detailUpdateLoading.includes(row.id)" size="small">编辑</el-button>
                <el-button type="text"  @click="() => deleteTableData(row.id)" :loading="deleteLoading.includes(row.id)" size="small">删除</el-button>                         
            </template>
        </el-table-column>


    </screen-table>


    <create-form 
        :visible="createFormVisible" 
        :onCancel="() => setCreateFormVisible(false)" 
        :onSubmitLoading="createSubmitLoading" 
        :onSubmit="createSubmit"
    />

    <update-form
        v-if="updateFormVisible===true"
        :visible="updateFormVisible"
        :values="updateData"
        :onCancel="() => updataFormCancel()"
        :onSubmitLoading="updateSubmitLoading"
        :onSubmit="updateSubmit"
    />

    <search-drawer
        :visible="searchDrawerVisible" 
        :onClose="() => searchDrawerClose()"
        :onSubmit="searchDrawerSubmit"
    />


   
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, ComputedRef, Ref } from "vue";
import { useStore } from "vuex";
import { ElMessageBox, ElMessage } from "element-plus";
import IconSvg from "@/components/IconSvg";
import ScreenTable from '@/components/ScreenTable/index.vue';
import CreateForm from './components/CreateForm.vue';
import UpdateForm from './components/UpdateForm.vue';
import SearchDrawer from './components/SearchDrawer.vue';
import { StateType as ListStateType } from "./store";
import { PaginationConfig, TableListItem } from './data.d';

interface ListHighlyAdaptiveTablePageSetupData {
    list: ComputedRef<TableListItem[]>;
    pagination: ComputedRef<PaginationConfig>;
    loading: Ref<boolean>;
    getList:  (current: number) => Promise<void>;
    createFormVisible: Ref<boolean>;
    setCreateFormVisible:  (val: boolean) => void;
    createSubmitLoading: Ref<boolean>;
    createSubmit: (values: Omit<TableListItem, 'id'>, resetFields: () => void) => Promise<void>;
    detailUpdateLoading: Ref<number[]>;
    detailUpdateData: (id: number) => Promise<void>;
    updateData: ComputedRef<Partial<TableListItem>>;
    updateFormVisible: Ref<boolean>;
    updataFormCancel:  () => void;
    updateSubmitLoading: Ref<boolean>;
    updateSubmit:  (values: TableListItem, resetFields: () => void) => Promise<void>;
    deleteLoading: Ref<number[]>;
    deleteTableData:  (id: number) => void;
    tabVal: Ref<string>;
    searchVal: Ref<string>;
    searchDrawerVisible: Ref<boolean>;
    searchDrawerClose: () => void;
    searchDrawerSubmit: (values: Omit<TableListItem, 'id'>) => Promise<void>;
}

export default defineComponent({
    name: 'ListHighlyAdaptiveTablePage',
    components: {
        IconSvg,
        ScreenTable,
        CreateForm,
        UpdateForm,
        SearchDrawer
    },
    setup(): ListHighlyAdaptiveTablePageSetupData {

        const store = useStore<{ ListHighlyAdaptiveTable: ListStateType}>();


        // 列表数据
        const list = computed<TableListItem[]>(() => store.state.ListHighlyAdaptiveTable.tableData.list);

        // 列表分页
        const pagination = computed<PaginationConfig>(() => store.state.ListHighlyAdaptiveTable.tableData.pagination);

        // 获取数据
        const loading = ref<boolean>(true);
        const getList = async (current: number): Promise<void> => {
            loading.value = true;
            await store.dispatch('ListHighlyAdaptiveTable/queryTableData', {
                per: pagination.value.pageSize,
                page: current,
            });
            loading.value = false;
        }


        // 新增弹框 - visible
        const createFormVisible = ref<boolean>(false);
        const setCreateFormVisible = (val: boolean) => {
            createFormVisible.value = val;
        };
        // 新增弹框 - 提交 loading
        const createSubmitLoading = ref<boolean>(false);
        // 新增弹框 - 提交
        const createSubmit = async (values: Omit<TableListItem, 'id'>, resetFields: () => void) => {
            createSubmitLoading.value = true;
            const res: boolean = await store.dispatch('ListHighlyAdaptiveTable/createTableData',values);
            if(res === true) {
                resetFields();
                setCreateFormVisible(false);
                ElMessage.success('新增成功！');
                getList(1);
            }
            createSubmitLoading.value = false;
        }


        // 编辑弹框 - visible
        const updateFormVisible = ref<boolean>(false);
        const setUpdateFormVisible = (val: boolean) => {
            updateFormVisible.value = val;
        }
        const updataFormCancel = () => {
            setUpdateFormVisible(false);
            store.commit('ListHighlyAdaptiveTable/setUpdateData',{});
        }
        // 编辑弹框 - 提交 loading
        const updateSubmitLoading = ref<boolean>(false);
        // 编辑弹框 - 提交
        const updateSubmit = async (values: TableListItem, resetFields: () => void) => {
            updateSubmitLoading.value = true;
            const res: boolean = await store.dispatch('ListHighlyAdaptiveTable/updateTableData',values);
            if(res === true) {
                updataFormCancel();                
                ElMessage.success('编辑成功！');
                getList(pagination.value.current);
            }
            updateSubmitLoading.value = false;
        }

        // 编辑弹框 data
        const updateData = computed<Partial<TableListItem>>(() => store.state.ListHighlyAdaptiveTable.updateData);
        const detailUpdateLoading = ref<number[]>([]);
        const detailUpdateData = async (id: number) => {
            detailUpdateLoading.value = [id];
            const res: boolean = await store.dispatch('ListHighlyAdaptiveTable/queryUpdateData',id);
            if(res===true) {
                setUpdateFormVisible(true);
            }
            detailUpdateLoading.value = [];
        }


        // 删除 loading
        const deleteLoading = ref<number[]>([]);
        // 删除
        const deleteTableData = (id: number) => {

            ElMessageBox.confirm('确定删除吗？', '删除',{
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                deleteLoading.value = [id];
                const res: boolean = await store.dispatch('ListHighlyAdaptiveTable/deleteTableData',id);
                if (res === true) {
                    ElMessage.success('删除成功！');
                    getList(pagination.value.current);
                }
                deleteLoading.value = [];
            }).catch((error: any) =>{
                console.log(error)
            });

        }

        const tabVal = ref<string>('all');
        const searchVal = ref<string>('');

        // 搜索
        const searchDrawerVisible = ref<boolean>(false);
        const searchDrawerClose = () => {
            searchDrawerVisible.value = false;
        }
        const searchDrawerSubmit = async (values: Omit<TableListItem, 'id'>) => {
            console.log('search', values);
            ElMessage.success('进行了搜索！');
            searchDrawerClose();
        }


        onMounted(()=> {
           getList(1);
        })

        return {
            list,
            pagination,
            loading,
            getList,
            createFormVisible,
            setCreateFormVisible,
            createSubmitLoading,
            createSubmit,
            detailUpdateLoading,
            detailUpdateData,
            updateData,
            updateFormVisible,
            updataFormCancel,
            updateSubmitLoading,
            updateSubmit,
            deleteLoading,
            deleteTableData,
            tabVal,
            searchVal,
            searchDrawerVisible,
            searchDrawerClose,
            searchDrawerSubmit
        }

    }
})
</script>