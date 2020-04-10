<template>
    <div class="main-conent main-conent-minheight form-footer">

      <page-header into="高级表单常见于一次性输入和提交大批量数据的场景。"><strong>高级表单</strong></page-header>


      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-card shadow="never" class="border-none margin-t24">
            <div slot="header">
              <span>模块名称</span>
            </div>
            <el-row :gutter="24">
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width:100%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动时间" prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width:100%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动时间" prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
            </el-row>
        </el-card>


        <el-card shadow="never" class="border-none margin-t24">
            <div slot="header">
              <span>模块名称</span>
            </div>
            <el-row :gutter="24">
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width:100%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动时间" prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width:100%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动时间" prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
            </el-row>
        </el-card>

        <el-card shadow="never" class="border-none margin-t24">
            <div slot="header">
              <span>模块名称</span>
            </div>
            <el-row :gutter="24">
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width:100%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动时间" prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width:100%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8">
                  <el-form-item label="活动时间" prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
            </el-row>
        </el-card>


      </el-form>


      <form-footer-toolbar class="text-right">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </form-footer-toolbar>


    </div>
  
</template>
<script>
import PageHeader from '@/layout/components/PageHeader';
import FormFooterToolbar from '@/layout/components/FormFooterToolbar';
export default {
    components: {
      PageHeader,
      FormFooterToolbar
    },
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: ''         
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
};
</script>
<style lang="scss">

</style>