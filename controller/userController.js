// 用户注册
const { User } = require('../model/index')

exports.register = async (req, res) => {
    console.log(req.body)
    return
    const userModel = new User(req.body)
    const dbBack = await userModel.save()
    res.status(200).json(dbBack)
}

exports.list = async (req, res) => {
}

exports.delete = async (req, res) => {
    
}