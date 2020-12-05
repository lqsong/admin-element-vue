<template>
    <el-drawer
      size="360px"
      :title="title"
      :model-value="visible"
      @close="onClose"
    >

        <div class="content">
            <el-form :model="modelRef" ref="formRef">
                <el-form-item label="位置">
                    <TypeSelect v-model="modelRef.type" style="width:100%" />
                </el-form-item>
                
                <el-form-item label="名称" >
                    <el-input v-model="modelRef.name" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="网址" >
                    <el-input v-model="modelRef.href" placeholder="请输入网址" />
                </el-form-item>

                <el-form-item label="备注" >
                    <el-input v-model="modelRef.desc" placeholder="请输入备注" />
                </el-form-item>
            </el-form>
        </div>


        <div :style="{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
        }">
            <div class="text-align-right">
                <el-button style="margin-right: 8px" @click="onClose">
                    取消
                </el-button>
                <el-button type="primary" @click="onSearch">
                    搜索
                </el-button>
            </div>
        </div>

      
    </el-drawer>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import { ElForm } from "element-plus";
import TypeSelect from './TypeSelect.vue';
import { TableListItem } from "../data.d";


export default defineComponent({
    name: 'SearchDrawer',
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            default: '高级搜索'
        },
        onClose: {
            type: Function,
            required: true
        },
        onSubmit: {
            type: Function as PropType<(values: Omit<TableListItem, 'id'>) => void>,
            required: true
        }
    },
    components: {
        TypeSelect
    },
    setup(props) {

        // 表单值
        const modelRef = reactive<Omit<TableListItem, 'id'>>({
            name: '',
            desc: '',
            href: '',
            type: ''
        });
        
        
         // form
        const formRef = ref<typeof ElForm>();        

        const onSearch = async () => {
             try {               
                props.onSubmit(modelRef);
            } catch (error) {
                // console.log('error', error);
            }
        }

        return {
            modelRef,
            formRef,
            onSearch
        }


    }

})
</script>
<style lang="scss" scoped>
.content {
    padding: 20px;
    position:absolute;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 55px;
    overflow: auto;
}
</style>