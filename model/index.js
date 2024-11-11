const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/express-video')
}

main().then((res) => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.error('Error connecting to MongoDB')
    console.error(err)
})

module.exports = {
    User: mongoose.model('User', require('./userModel'))
}