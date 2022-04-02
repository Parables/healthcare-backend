const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        // console.log(process.env.MONGO_URL)
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB is connected')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB