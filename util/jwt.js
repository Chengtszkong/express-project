const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const { uuid } = require('../config/config.default')
const signJwt = promisify(jwt.sign)
const verifyJwt = promisify(jwt.verify)

module.exports.createToken = async (user) => {
  return await signJwt(user, uuid, { expiresIn: 60 * 60 * 24 })
}

module.exports.verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1] || null
  if (!token) {
    return res.status(402).json({ error: 'token为空' })
  }
  try {
    const user = await verifyJwt(token, uuid)
    req.user = user
    next()
  } catch (error) {
    return res.status(402).json({ error: 'token无效' })
  }
}