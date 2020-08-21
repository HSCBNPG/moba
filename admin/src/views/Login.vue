<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <!-- prevent:阻止默认跳转事件，native：监听表单的原生事件 -->
      <el-form @submit.native.prevent='login'>
        <el-form-item label="用户名">
          <el-input v-model='model.username' type="text"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model='model.password' type="text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return {
      model:{
        username:'',
        password:'',
      }
    }
  },
  methods:{
    async login(){
      const res = await this.$http.post("/login", this.model)
      console.log(res.data)
      localStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        type:"success",
        message:"登陆成功"
      })
    }
  }
};
</script>
<style>
.login-card {
  width: 30rem;
  margin: 10rem auto;
}
</style>