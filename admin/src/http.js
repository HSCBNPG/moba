import axios from 'axios'
import Vue from 'vue'


const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

// 相应拦截器，与后端配合统一响应码
http.interceptors.response.use(res => {
    return res;
}, err => {
    Vue.prototype.$message({
        message: err.response.data.message
    })
    return Promise.reject(err)
})

export default http