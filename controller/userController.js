// 用户注册
const { User } = require('../model/index')
const jwt = require('jsonwebtoken')
const { createToken } = require('../util/jwt')

exports.register = async (req, res) => {
    const userModel = new User(req.body)
    const dbBack = await userModel.save()
    res.status(200).json(dbBack.toJSON())
}

exports.login = async (req, res) => {
    // 客户端数据验证
    // 连接数据库查询
    let dbBack = await User.findOne(req.body)
    if (!dbBack) {
        return res.status(402).json({ error: '邮箱或密码错误' })
    }
    dbBack = dbBack.toJSON()
    // const token = jwt.sign(dbBack, 'f8734626-0861-4514-8fad-e2cd9327c1fc')
    dbBack['token'] = await createToken(dbBack)

    res.status(200).json(dbBack)
}

exports.list = async (req, res) => {
    res.send('/user-list')
}

exports.delete = async (req, res) => {
    
}