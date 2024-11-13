// 用户信息数据验证
const { body, validationResult} = require('express-validator')
const validate = require('./errorBack')
const { User } = require('../../model/index')


module.exports.register = validate([
    body('username')
        .notEmpty().withMessage('用户名不能为空').bail()
        .isLength({ min: 3 }).withMessage('用户名长度不能小于3').bail(),
    body('email')
        .notEmpty().withMessage('邮箱不能为空').bail()
        .isEmail().withMessage('邮箱格式不正确').bail()
        .custom(async val => {
            const validate = await User.findOne({ email: val })
            if (validate) return Promise.reject('邮箱已被注册')
        }).bail(),
    body('password')
        .notEmpty().withMessage('密码不能为空').bail()
        .isLength({ min: 5 }).withMessage('密码长度不能小于5').bail(),
])

module.exports.login = validate([
    body('email')
        .notEmpty().withMessage('邮箱不能为空').bail()
        .isEmail().withMessage('邮箱格式不正确').bail()
        .custom(async val => {
            const validate = await User.findOne({ email: val })
            if (!validate) return Promise.reject('邮箱未注册')
        }).bail(),
    body('password')
        .notEmpty().withMessage('密码不能为空').bail()
])

module.exports.update = validate([
    body('email')
        .custom(async val => {
            const validate = await User.findOne({ email: val })
            if (validate) return Promise.reject('邮箱已经被注册')
        }).bail(),
    body('username')
        .custom(async val => {
            const validate = await User.findOne({ username: val })
            if (validate) return Promise.reject('用户已经被注册')
        }).bail(),
    body('phone')
        .custom(async val => {
            const validate = await User.findOne({ phone: val })
            if (validate) return Promise.reject('手机已经被注册')
        }).bail(),
])