// 用户注册
const { User } = require('../model/index')
const { createToken } = require('../util/jwt')

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

exports.list = async (req, res) => {
    console.log(req.user)
    res.send('/user-list')
}

exports.delete = async (req, res) => {
    
}