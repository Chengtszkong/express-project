// 用户注册
const { User } = require('../model/index')

exports.register = async (req, res) => {
    const userModel = new User(req.body)
    const dbBack = await userModel.save()
    res.status(200).json(dbBack.toJSON())
}

exports.login = async (req, res) => {
    // 客户端数据验证
    // 连接数据库查询
    const dbBack = await User.findOne(req.body)

    res.status(200).json(dbBack)
}

exports.list = async (req, res) => {
    res.send('/user-list')
}

exports.delete = async (req, res) => {
    
}