const express = require('express')
const router = express.Router()
const { validationResult} = require('express-validator')
const userController = require('../controller/userController')
const validator = require('../middleware/validator/userValidator')

router
.post('/register', validator.register, userController.register)
.get('/list', userController.list)
.delete('/delete', userController.delete)

module.exports = router