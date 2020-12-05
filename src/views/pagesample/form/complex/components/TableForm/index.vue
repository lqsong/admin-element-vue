<template>
     <el-table
        row-key="key"
        header-row-class-name="custom-table-header"
        v-loading="TableLoading"
        :data="TableData"        
    >
        <el-table-column
            label="姓名"
            prop="name">
            <template #default="{row}">
                <el-input v-if="row.edit" v-model="row.name" placeholder="姓名" />
                <span v-else >{{row.name}}</span>                                
            </template>
        </el-table-column>
        <el-table-column
            label="工号"
            prop="workId">
            <template #default="{row}">
                <el-input v-if="row.edit" v-model="row.workId" placeholder="工号" />
                <span v-else >{{row.workId}}</span>                                
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            prop="action"
            width="200">
            <template #default="{row}">
                <template v-if="row.edit">
                    <span v-if="row.isNew">
                        <el-button type="text" @click="saveRow(row)">添加</el-button>
                        <el-popconfirm title="是否要删除此行？" @confirm="remove(row.key)">
                            <template #reference>
                                <el-button type="text">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </span>
                    <span v-else>
                        <el-button type="text" @click="saveRow(row)">保存</el-button>
                        <el-button type="text" @click="cancel(row.key)">取消</el-button>
                    </span>
                </template>
                <span v-else>
                    <el-button type="text" @click="toggle(row.key)">编辑</el-button>
                    <el-popconfirm title="是否要删除此行？" @confirm="remove(row.key)">
                        <template #reference>
                            <el-button type="text">删除</el-button>
                        </template>
                    </el-popconfirm>
                </span>                             
            </template>
        </el-table-column>
        
    
    </el-table>


    <el-button style="width: 100%;margin-top: 16px; border-style: dashed;" @click="newTableData" >
        <i class="el-icon-plus"></i>
        新增内容
    </el-button>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, toRefs, watch } from "vue";
import { ElMessage } from "element-plus";
import { TableFormDataType } from "./data.d";

interface TableFormSetupData {
    TableData: TableFormDataType;
    TableLoading: boolean;
    newTableData:  () => void;
    saveRow: (record: TableFormDataType) => void;
    remove: (key: string) => void;
    cancel: (key: string) => void;
    toggle: (key: string) => void;
}

export default defineComponent({
    name: 'TableForm',
    props: {
        modelValue: {
            type: Array as PropType<TableFormDataType[]>,
            required: true
        }
    },
    setup(props, { emit }): TableFormSetupData {

        const { modelValue } = toRefs(props);

        const TableData = ref<TableFormDataType[]>(props.modelValue);
        const TableLoading = ref<boolean>(false);

        // 新增内容
        const newIndex = ref<number>(0);
        const newTableData = () => {

            const newData = TableData.value.map(item => ({ ...item }));

            newData.push({
                key: `NEW_TEMP_ID_${newIndex.value}`,
                workId: '',
                name: '',
                edit: true,
                isNew: true,
            });

            newIndex.value ++;
            TableData.value = newData;
        }

        // 添加、保存
        const saveRow = (record: TableFormDataType) => {
            TableLoading.value = true;
            const { key, name, workId } = record
            if (!name || !workId) {
                TableLoading.value = false;
                ElMessage.error('请填写完整成员信息。')
                return
            }

            const target: any = TableData.value.find(item => item.key === key);
            if (target) {
                target.edit = false;
                target.isNew = false;
                target._originalData = undefined;
            }
            TableLoading.value = false;

            const newData = TableData.value.map(item => ({ ...item }));

            emit('update:modelValue', newData);
        }

        // 删除
        const remove = (key: string) => {
            const newData = TableData.value.filter(item => item.key !== key);
            TableData.value = newData;
            emit('update:modelValue', newData);
        }

        // 取消编辑
        const cancel = (key: string) => {
            const target: any = TableData.value.find(item => item.key === key);
            if(target) {
                Object.keys(target).forEach(key => { target[key] = target._originalData[key] });
                target._originalData = undefined;
            }
        }

        // 编辑显示
        const toggle = (key: string) => {
            const target: any = TableData.value.find(item => item.key === key);
            target._originalData = { ...target };
            target.edit = !target.edit;
        }

        watch(modelValue,()=> {
            const newData = modelValue.value.map(item => ({ ...item }));
            TableData.value = newData;
        })


        return {
            TableData: TableData as unknown as TableFormDataType,
            TableLoading: TableLoading as unknown as boolean,
            newTableData,
            saveRow,
            remove,
            cancel,
            toggle
        }


    }
})
</script>