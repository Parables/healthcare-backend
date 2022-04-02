const mongoose = require('mongoose')

const librarySchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    data: {
        type: String,
        required: [true, 'Please add data to field']
    },
    topic: {
        type:String,
        required: [true, 'Please add topic to field']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Library', librarySchema)