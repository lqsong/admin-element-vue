<template>
    <div class="indexlayout-main-conent">
      <el-card shadow="never" class="cus-card">
        <el-row>
            <el-col :xs="0" :sm="2"  :md="4" :lg="6" :xl="6" class="border-solid-transparent"></el-col>
            <el-col :xs="24" :sm="20"  :md="16" :lg="12" :xl="12">
                <el-form :model="modelRef" :rules="rulesRef" ref="formRef" label-width="100px">
                    <el-form-item  label="标题" prop="title">
                        <el-input v-model="modelRef.title" placeholder="请输入"  />
                    </el-form-item>
                    <el-form-item label="起止日期" prop="date">
                        <el-date-picker 
                          type="daterange" 
                          v-model="modelRef.date" 
                          range-separator="至"  
                          start-placeholder="开始日期" 
                          end-placeholder="结束日期"
                          class="form-basic-width100">                            
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item  label="下拉选择" prop="select">
                        <el-select v-model="modelRef.select" placeholder="请选择" clearable style="width:100%">
                            <el-option label="select1" value="1"></el-option>
                            <el-option label="select2" value="2"></el-option>
                            <el-option label="select3" value="3"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item  label="单选按钮1" prop="radio1">
                        <el-radio-group v-model="modelRef.radio1">
                            <el-radio label="1">item 1</el-radio>
                            <el-radio label="2">item 2</el-radio>
                            <el-radio label="3">item 3</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item  label="单选按钮2" prop="radio2">
                        <el-radio-group v-model="modelRef.radio2">
                            <el-radio-button label="1">item 1</el-radio-button>
                            <el-radio-button label="2">item 2</el-radio-button>
                            <el-radio-button label="3">item 3</el-radio-button> 
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item  label="复选框" prop="checkbox">                        
                        <el-checkbox-group v-model="modelRef.checkbox">
                            <el-checkbox label="1">item 1</el-checkbox>
                            <el-checkbox label="2">item 2</el-checkbox>
                            <el-checkbox label="3">item 3</el-checkbox>
                            <el-checkbox label="4" disabled>item 4</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item  label="备注" prop="remark"> 
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="modelRef.remark">
                        </el-input>
                    </el-form-item>



                    
                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit" :loading="submitLoading">
                        提交
                        </el-button>  
                        <el-button @click="resetFields">
                        重置
                        </el-button>                           
                    </el-form-item>


                </el-form>

            </el-col>
        </el-row>

      </el-card>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElForm, ElMessage } from "element-plus";
import { FormDataType } from "./data.d";
import { StateType as FormStateType } from "./store";


interface FormBasicPageSetupData {
    modelRef: FormDataType;
    rulesRef: any;
    formRef: typeof ElForm;
    resetFields: () => void;
    submitLoading: boolean;
    handleSubmit: () => Promise<void>;
}

export default defineComponent({
    name: 'FormBasicPage',
    setup(): FormBasicPageSetupData {

        const store = useStore<{FormBasic: FormStateType}>();

        // 表单值
        const modelRef = reactive<FormDataType>({
            title: '',
            date: [],
            select: '',
            radio1: '',
            radio2: '',
            checkbox: [],
            remark: ''
        });
        // 表单验证
        const rulesRef = reactive({
            title: [
                {
                    required: true,
                    message: '必填',
                },
            ],
            date: [
                {
                    required: true,
                    message: '必填',
                    trigger: 'change', 
                    type: 'array' 
                },
            ],  
            select: [
                {
                    required: true,
                    message: '请选择',
                },
            ],  
            radio1: [],  
            radio2: [
                {
                    required: true,
                    message: '请选择',
                },
            ],
            checkbox:[],
            remark: []       
        });
        // form
        const formRef = ref<typeof ElForm>();
        // 重置
        const resetFields = () => {
            formRef.value?.resetFields();
        }
        // 提交loading
        const submitLoading = ref<boolean>(false);
        // 提交
        const handleSubmit = async () => {
            submitLoading.value = true;
            try {
                const valid: boolean | undefined =  await formRef.value?.validate();
                if(valid === true) {
                    const res: boolean = await store.dispatch('FormBasic/create',modelRef);                
                    if (res === true) {
                        ElMessage.success('提交成功');
                        resetFields();                 
                    }
                }
                
            } catch (error) {
                // console.log('error', error);
            }
            submitLoading.value = false;
        };

        return {
            modelRef,
            rulesRef,
            formRef: formRef as unknown as typeof ElForm,
            resetFields,
            submitLoading: submitLoading as unknown as boolean,
            handleSubmit,
        }



    }
})
</script>
<style lang="scss">
.form-basic-width100.el-input__inner {
    width: 100%;
}
</style>