const mongoose = require('mongoose')
const { mongoPath } = require('../config/config.default')

async function main() {
    await mongoose.connect(mongoPath)
}

main()
.then((res) => {
    console.log('Connected to MongoDB')
})
.catch(err => {
    console.error('Error connecting to MongoDB')
    console.error(err)
})

module.exports = {
    User: mongoose.model('User', require('./userModel'))
}