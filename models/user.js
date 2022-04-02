const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username :{
        type: String,
        minLength: 2,
        required: [true, 'Plese add a name']
    },
    location :{
        type: String,
        minLength: 2,
    },
    avartar :{
        type: String,
        minLength: 2,
    },
    DOB:{
        type: String,
        required: [true, 'Plese add a date of birth']
    },
    name: {
        type: String,
        minLength: 3,
        required: [true, 'Plese add a name']
    },
    number: {
        type: String,
        minLength: 3,
        required: [true, 'Plese add a name']
    },  
    type: {
        type: String,
        minLength: 3,
        required: [true, 'Plese add a account']
    },
    email: {
        type: String,
        minLength: 3,
        unique:true,
        required: [true, 'Plese add an email']
    },
    password: {
        type: String,
        required: [true, 'Plese add a password']
    },
    softDelete: {
        type: Boolean,
        required: [true, 'Plese add a password']
    },
    status: {
        type: Boolean,
    }

},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)