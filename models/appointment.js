const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    doctor:{
        type: String, //mongoose.Schema.Types.ObjectId,
        required: true
    },
    purpose: {
        type: String,
        required: [true, 'Please add purpose to field']
    },
    date: {
        type: String,
        required: [true, 'Please add date to field']
    },
    location: {
        type:String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Appointment', appointmentSchema)