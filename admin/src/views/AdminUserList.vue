<template>
  <div>
    <h1>管理员列表</h1>
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="220"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="$router.push(`/admin_user/edit/${scope.row._id}`)" type="primary" size="small" >编辑</el-button>
            <el-button @click="remove(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      items: []
    }
  },
  methods:{
    async fetch(){
      const res = await this.$http.get("/rest/admin_user")
      this.items = res.data
    },
    async remove(model){
      this.$confirm(`确定继续删除管理员 "${model.name}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`/rest/admin_user/${model._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  created(){
    this.fetch()
  }
}
</script>

<style>

</style>