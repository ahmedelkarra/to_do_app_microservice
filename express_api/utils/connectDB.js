const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/to_do_app_microservices')
        console.log('Connected to DB')
    } catch (error) {
        console.log(`Faild to connect to DB ${error}`)
    }
}

module.exports = connectDB