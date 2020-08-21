module.exports = app => {
    const express = require('express')
    const inflection = require('inflection')
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')


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

    // 通用crud中间件
    const resource = require('../../middleware/resource.js')
    // 登录校验中间件
    const auth = require('../../middleware/auth.js')
    app.use('/admin/api/rest/:resource',auth(),resource() , router)



    // 图片上传
    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'), async(req,res) => {
        const file = req.file
        file.url = "http://localhost:3000/uploads/" + file.filename
        res.send(file)
    })

    // 用户登录
    app.post('/admin/api/login',async(req,res)=>{
        const {username, password} = req.body
        // 1.根据用户名找用户
        //                              前缀“-”：强制排除， 前缀“+”：强制选择
        const user =await AdminUser.findOne({username}).select("+password")
        assert(user, 422, "用户名不存在")
        // 2.校验密码
        // 使用bcrypt模块校验密码，compareSync用于校验明文和密文，参数1：明文，2：密文
        const isValid = require('bcrypt').compareSync(password,user.password)
        assert(isValid, 422, "用户名或密码错误")
        // 3.返回token
        // 生成token：参数1：要加密放在token的数据
        //           参数2：密钥
        const token = jwt.sign({_id: user._id }, app.get('secret'))
        res.send({token})
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        console.log(err)
        res.status(err.statusCode).send({
            message: err.message
        })
    })
}