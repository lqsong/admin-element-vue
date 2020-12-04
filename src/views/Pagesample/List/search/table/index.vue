<template>
    <div class="indexlayout-main-conent">
        <el-card shadow="never" class="cus-card" style="margin-bottom: 15px" :body-style="{ 'padding-bottom': '0' }">
            <el-form :model="searchModelRef" ref="searchFormRef" label-width="80px">
                <el-row :gutter="16" type="flex" justify="end" class="flex-wrap-wrap">
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item  label="名称：">
                            <el-input placeholder="请输入" v-model="searchModelRef.name" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item  label="链接：">
                            <el-input placeholder="请输入" v-model="searchModelRef.href" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item  label="位置：">
                            <TypeSelect placeholder="请选择" v-model="searchModelRef.type" style="width:100%" />
                        </el-form-item>
                    </el-col>
                    <el-col v-if='searchOpen' :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="备注：">
                            <el-input placeholder="请输入" v-model="searchModelRef.desc" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <div class="text-align-right" style="padding-bottom: 24px" >
                            <el-button type="primary" @click="searchFormSubmit">查询</el-button>
                            <el-button  @click="searchResetFields">重置</el-button>
                            <el-button type="text" style="margin-left: 8px" @click="setSearchOpen">
                                <template v-if="searchOpen">
                                    收起 <i class="el-icon-arrow-up" ></i>
                                </template>
                                <template v-else>
                                    展开 <i class="el-icon-arrow-down"></i>
                                </template>
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>

        </el-card>

        <el-card shadow="never" class="cus-card">
          <template #header>
              <el-row>
                    <el-col :span="8">
                        <el-button type="primary" @click="() => setCreateFormVisible(true)">新增</el-button>
                    </el-col>
                    <el-col :span="16" class="text-align-right">
                        <el-radio-group v-model="tabVal">
                            <el-radio-button label="all">全部</el-radio-button>
                            <el-radio-button label="header">头部</el-radio-button>
                            <el-radio-button label="footer">底部</el-radio-button>
                        </el-radio-group>                        
                    </el-col>
            </el-row>
          </template>


            <el-table
                row-key="id"
                :data="list"
                v-loading="loading"
            >

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
                        <el-button type="text" @click="() => detailUpdateData(row.id)" :loading="detailUpdateLoading.includes(row.id)">编辑</el-button>
                        <el-button type="text"  @click="() => deleteTableData(row.id)" :loading="deleteLoading.includes(row.id)">删除</el-button>                         
                    </template>
                </el-table-column>
               
            </el-table>

            <div class="padding-t10 text-align-right">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    v-model:current-page="pagination.current"
                    :page-size="pagination.pageSize"
                    :total="pagination.total"
                    @current-change="(p) => {
                        getList(p || 1);
                    }">
                </el-pagination>
            </div>


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


        </el-card>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElMessageBox, ElMessage, ElForm } from "element-plus";
import CreateForm from './components/CreateForm.vue';
import UpdateForm from './components/UpdateForm.vue';
import TypeSelect from './components/TypeSelect.vue';
import { StateType as ListStateType } from "./store";
import { PaginationConfig, TableListItem } from './data.d';

interface ListSearchTablePageSetupData {
    list: TableListItem[];
    pagination: PaginationConfig;
    loading: boolean;
    getList:  (current: number) => Promise<void>;
    createFormVisible: boolean;
    setCreateFormVisible:  (val: boolean) => void;
    createSubmitLoading: boolean;
    createSubmit: (values: Omit<TableListItem, 'id'>, resetFields: () => void) => Promise<void>;
    detailUpdateLoading: number[];
    detailUpdateData: (id: number) => Promise<void>;
    updateData: Partial<TableListItem>;
    updateFormVisible: boolean;
    updataFormCancel:  () => void;
    updateSubmitLoading: boolean;
    updateSubmit:  (values: TableListItem, resetFields: () => void) => Promise<void>;
    deleteLoading: number[];
    deleteTableData:  (id: number) => void;
    tabVal: string;
    searchOpen: boolean;
    setSearchOpen: () => void;
    searchModelRef: Omit<TableListItem, 'id'>;
    searchFormRef: typeof ElForm;
    searchResetFields: () => void;
    searchFormSubmit: () => Promise<void>;
}

export default defineComponent({
    name: 'ListSearchTablePage',
    components: {
        CreateForm,
        UpdateForm,
        TypeSelect
    },
    setup(): ListSearchTablePageSetupData {

        const store = useStore<{ ListSearchTable: ListStateType}>();


        // 列表数据
        const list = computed<TableListItem[]>(() => store.state.ListSearchTable.tableData.list);

        // 列表分页
        const pagination = computed<PaginationConfig>(() => store.state.ListSearchTable.tableData.pagination);

        // 获取数据
        const loading = ref<boolean>(true);
        const getList = async (current: number): Promise<void> => {
            loading.value = true;
            await store.dispatch('ListSearchTable/queryTableData', {
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
            const res: boolean = await store.dispatch('ListSearchTable/createTableData',values);
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
            store.commit('ListSearchTable/setUpdateData',{});
        }
        // 编辑弹框 - 提交 loading
        const updateSubmitLoading = ref<boolean>(false);
        // 编辑弹框 - 提交
        const updateSubmit = async (values: TableListItem, resetFields: () => void) => {
            updateSubmitLoading.value = true;
            const res: boolean = await store.dispatch('ListSearchTable/updateTableData',values);
            if(res === true) {
                updataFormCancel();                
                ElMessage.success('编辑成功！');
                getList(pagination.value.current);
            }
            updateSubmitLoading.value = false;
        }

        // 编辑弹框 data
        const updateData = computed<Partial<TableListItem>>(() => store.state.ListSearchTable.updateData);
        const detailUpdateLoading = ref<number[]>([]);
        const detailUpdateData = async (id: number) => {
            detailUpdateLoading.value = [id];
            const res: boolean = await store.dispatch('ListSearchTable/queryUpdateData',id);
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
                const res: boolean = await store.dispatch('ListSearchTable/deleteTableData',id);
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
        
        // 搜索
        const searchOpen = ref<boolean>(false);
        const setSearchOpen = (): void => {
            searchOpen.value = !searchOpen.value;
        }
        // 表单值
        const searchModelRef = reactive<Omit<TableListItem, 'id'>>({
            name: '',
            desc: '',
            href: '',
            type: ''
        });
        // search form
        const searchFormRef = ref<typeof ElForm>();
        // 重置
        const searchResetFields = () => {
            searchFormRef.value?.resetFields();
            searchModelRef.name = '';
            searchModelRef.desc = '';
            searchModelRef.href = '';
            searchModelRef.type = '';
        }
        // 搜索
        const searchFormSubmit = async () => {
            try {
                console.log('search', searchModelRef);
                ElMessage.warning('进行了搜索!');
            } catch (error) {
                ElMessage.warning(error);
            }
        }

        onMounted(()=> {
           getList(1);
        })

        return {
            list: list as unknown as TableListItem[],
            pagination: pagination as unknown as PaginationConfig,
            loading: loading as unknown as boolean,
            getList,
            createFormVisible: createFormVisible as unknown as boolean,
            setCreateFormVisible,
            createSubmitLoading: createSubmitLoading as unknown as boolean,
            createSubmit,
            detailUpdateLoading: detailUpdateLoading as unknown as number[],
            detailUpdateData,
            updateData: updateData as Partial<TableListItem>,
            updateFormVisible: updateFormVisible as unknown as boolean,
            updataFormCancel,
            updateSubmitLoading: updateSubmitLoading as unknown as boolean,
            updateSubmit,
            deleteLoading: deleteLoading as unknown as number[],
            deleteTableData,
            tabVal: tabVal as unknown as string,
            searchOpen: searchOpen as unknown as boolean,
            setSearchOpen,
            searchModelRef,
            searchFormRef: searchFormRef as unknown as typeof ElForm,
            searchResetFields,
            searchFormSubmit
        }

    }
})
</script>