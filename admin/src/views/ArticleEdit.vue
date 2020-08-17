<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <!-- 2.把父分类循环成下拉列表，保存id到子分类的parent -->
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded" ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  components:{
    VueEditor
  },
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      categories: [],
    };
  },
  methods: {
    // 富文本编辑器文件上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      const res =await this.$http.post('upload',formData);
      console.log(res.data,res)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "OK !",
        duration: 2000,
        center: true,
      });
    },
    async fetch() {
      const res = await this.$http.get("rest/articles/" + this.id);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");  // 1.先把父分类查出来
      this.categories = res.data;
    },
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
};
</script>

<style>
</style>