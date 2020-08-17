const mongoose = require('mongoose')  //引用mongoose

const schema =new mongoose.Schema({   //创建模型结构
    name: { type: String },
    items:[{
        image:{type:String},
        url:{type:String},
    }]
})

module.exports = mongoose.model("Ad", schema)  //创建模型并导出