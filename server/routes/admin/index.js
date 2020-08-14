module.exports = app => {
    const express = require('express')
    const router  = express.Router()
    const Categroy = require('../../models/Category')
    // 创建分类
    router.post('/categories', async (req, res) => {
        const model = await Categroy.create(req.body)
        res.send(model)
    })
    // 修改数据
    router.put('/categories/:id', async (req, res) => {
        const model = await Categroy.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 查看分类
    router.get('/categories', async (req, res) => {
        const items = await Categroy.find().populate("parent").limit(10)
        res.send(items)
    })
    router.get('/categories/:id', async (req, res) => {
        const model = await Categroy.findById(req.params.id)
        res.send(model)
    })
    // 删除数据
    router.delete('/categories/:id', async (req, res) =>{
        await Categroy.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })
    app.use('/admin/api/',router)
}