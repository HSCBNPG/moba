const mongoose = require('mongoose')  //引用mongoose

const schema = new mongoose.Schema({   //创建模型结构
    username: { type: String },
    password: { 
        type: String,
        select: false,  //被忽略查询
        set(val){  //使用加密模块加密
            return require('bcrypt').hashSync(val, 10)
        } 
    },

})

module.exports = mongoose.model("AdminUser", schema)  //创建模型并导出