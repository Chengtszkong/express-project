// 用户注册
const fs = require('fs')
const { promisify } = require('util')
const { User } = require('../model/index')
const { createToken } = require('../util/jwt')
const rename = promisify(fs.rename)

exports.register = async (req, res) => {
    const userModel = new User(req.body)
    const dbBack = await userModel.save()
    const user = dbBack.toJSON()
    delete user.password
    res.status(200).json(user)
}

exports.login = async (req, res) => {
    // 客户端数据验证
    // 连接数据库查询
    let dbBack = await User.findOne(req.body)
    if (!dbBack) {
        return res.status(402).json({ error: '邮箱或密码错误' })
    }
    dbBack = dbBack.toJSON()
    dbBack['token'] = await createToken(dbBack)

    res.status(200).json(dbBack)
}

// 用户修改
exports.update = async (req, res) => {
    const updateData = await User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    res.status(202).json(updateData)
}

// 用户头像上传
exports.avatar = async (req, res) => {
    console.log(req.file)
    let fileArr = req.file.originalname.split('.')
    let fileType = fileArr[fileArr.length - 1]
    try {
        await rename('./uploads/' + req.file.filename, './uploads/' + req.file.filename + '.' + fileType)
        res.status(201).json({ filepath: req.file.filename + '.' + fileType })
    } catch (error) {
        res.status(500).json({ err: error })
    }
}

exports.list = async (req, res) => {
    console.log(req.user)
    res.send('/user-list')
}

exports.delete = async (req, res) => {
    
}