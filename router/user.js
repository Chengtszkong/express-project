const express = require('express')
const router = express.Router()
const { validationResult} = require('express-validator')
const userController = require('../controller/userController')
const validator = require('../middleware/validator/userValidator')
const { verifyToken } = require('../util/jwt')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router
.post('/registers', validator.register, userController.register)
.post('/logins', validator.login, userController.login)
.get('/lists', verifyToken, userController.list)
.put('/', verifyToken, validator.update, userController.update)
.post('/avatar', verifyToken, upload.single('avatar'), userController.avatar)
.delete('/delete', userController.delete)

module.exports = router