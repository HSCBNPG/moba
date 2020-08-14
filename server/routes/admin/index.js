module.exports = app => {
    const express = require('express')
    const inflection = require('inflection')
    const router  = express.Router({
        mergeParams: true
    })
    // const Categroy = require('../../models/Category')
    // 创建分类
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 修改数据
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 查看分类
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 删除数据
    router.delete('/:id', async (req, res) =>{
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })
    app.use('/admin/api/rest/:resource', async (req,res,next) =>{
        req.Model = require(`../../models/${inflection.classify(req.params.resource)}`)
        next()
    }, router)
}