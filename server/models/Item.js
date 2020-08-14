const mongoose = require('mongoose')  //引用mongoose

const schema =new mongoose.Schema({   //创建模型结构
    name: { type: String },
    icon: { type: String },
})

module.exports = mongoose.model("Item", schema)  //创建模型并导出