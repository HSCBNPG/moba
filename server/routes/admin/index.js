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

    // 图片上传
    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'), async(req,res) => {
        const file = req.file
        file.url = "http://localhost:3000/uploads/" + file.filename
        res.send(file)
    })

    app.post('/admin/api/login',async(req,res)=>{
        const {username, password} = req.body
        // 1.根据用户名找用户
        const AdminUser = require('../../models/AdminUser')
        //                              前缀“-”：强制排除， 前缀“+”：强制选择
        const user =await AdminUser.findOne({username}).select("+password")
        if(!user){
            return res.status(422).send({
                message:'用户不存在'
            })
        }
        // 2.校验密码
        // 使用bcrypt模块校验密码，compareSync用于校验明文和密文，参数1：明文，2：密文
        const isValid = require('bcrypt').compareSync(password,user.password)
        if(!isValid){
            return res.status(422).send({
                message: '密码或密码错误'
            })
        }
        // 3.返回token
    })
}