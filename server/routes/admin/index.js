module.exports = app => {
    const express = require('express')
    const router  = express.Router()
    const Categroy = require('../../models/Category')
    // 创建分类
    router.post('/categories', async (req, res) => {
        const model = await Categroy.create(req.body)
        res.send(model)
    })
    // 查看分类
    router.get('/categories', async (req, res) => {
        const items = await Categroy.find().limit(10)
        res.send(items)
    })
    app.use('/admin/api',router)
}