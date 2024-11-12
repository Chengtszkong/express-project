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
        .custom(async email => {
            const emailValidate = await User.findOne({ email })
            if (emailValidate) return Promise.reject('邮箱已被注册')
        }).bail(),
    body('password')
        .notEmpty().withMessage('密码不能为空').bail()
        .isLength({ min: 5 }).withMessage('密码长度不能小于5').bail(),
])

module.exports.login = validate([
    body('email')
        .notEmpty().withMessage('邮箱不能为空').bail()
        .isEmail().withMessage('邮箱格式不正确').bail()
        .custom(async email => {
            const emailValidate = await User.findOne({ email })
            if (!emailValidate) return Promise.reject('邮箱未注册')
        }).bail(),
    body('password')
        .notEmpty().withMessage('密码不能为空').bail()
])