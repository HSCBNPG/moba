const mongoose = require('mongoose')  //引用mongoose

const schema =new mongoose.Schema({   //创建模型结构
    title: { type: String },
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    body:{type:String}
})

module.exports = mongoose.model("Article", schema)  //创建模型并导出