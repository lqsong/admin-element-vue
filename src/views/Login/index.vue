<template>
  <div class="login">
      <div class="form">
        <h1 class="title">
          Sign in to Admin
        </h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
          <el-form-item label="" prop="username">
            <el-input v-model.number="ruleForm.username" autocomplete="off" placeholder="请输入账号">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>            
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="submit" type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>

      </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
      return {
        loading: false,
        ruleForm: {
          username: 'admin',
          password: '123456'
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        const _this = this;
        _this.$refs[formName].validate((valid) => {
          if (valid) {
              _this.loading = true;
              const paramData = {
                  username: _this.ruleForm.username,
                  password: _this.ruleForm.password
              };
              _this.$store.dispatch('user/login', paramData)
                .then(() => {
                  // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                  _this.loading = false;
                  _this.$router.push({ path:'/'});
                })
                .catch(() => {
                  _this.loading = false;
                });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  width: 100%;
  height: 100vh;
  min-height: 500px;
  overflow: auto;
  background-image: url("../../assets/images/bg.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  align-items: center;
  .form{
      flex: none;
      width: 320px;
      padding: 60px;
      margin: 0 auto;
      border-radius: 4px;
      background-color: rgba($color: #FFFFFF, $alpha: 0.2);
      .title{
        font-weight: 300;
        margin-top: 0;
        margin-bottom: 60px;
        text-align: center;
        color: #FFFFFF;
      }
      .submit{
        margin-top: 30px;
        width: 100%;
      }
  }
}
</style>
