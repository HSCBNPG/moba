const mongoose = require('mongoose')  //引用mongoose

const schema =new mongoose.Schema({   //创建模型结构
    name: { type: String },
    parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
})

module.exports = mongoose.model("Category", schema)  //创建模型并导出