const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const user = require('../models/user')


// @desc    Register User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler( async (req, res) => {
    const {firstName, lastName, email, password, username, DOB, type, number} = req.body
    let name = firstName + " " + lastName
    if (!name || !email || !password || !username ||!DOB || !type || !number){
        res.status(400)
        throw new Error('Please fill in the fields')
    }
    
    const userExist = await User.findOne({email: email})

    if (userExist){
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        username,
        DOB,
        type,
        number,
        softDelete:false,
        password: hashPassword
    })

    if(user){
        const data = { 
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        }
        console.log(data)
        res.status(201).json(data)
    } else {
        res.status(400)
        throw new Error('Invalid user details')
    }    
})

// @desc    Login User
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler( async  (req, res) => {
    const {email, password} = req.body

    if ( !email || !password){
        res.status(400)
        throw new Error('Please fill in the fields')
    }
    
    const user = await User.findOne({email: email})
    const compare  = await bcrypt.compare(password,user.password)

    if (user && compare){      
        const data = {
            _id: user.id,
            name: user.name,
            email:user.email,
            token: generateToken(user.id)
        };  
        console.log(data);
        res.status(200).json(data)
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get User
// @route   GET /api/users/
// @access  Private
const getUser = asyncHandler( async  (req, res) => {
    const user = await User.findById(req.user.id) 
    // TODO: check the softDelete
    res.json(user)
})

// @desc    Get Users
// @route   GET /api/users/:id
// @access  Private
const getAllUsers = asyncHandler( async  (req, res) => {
    const users = await User.find({})

    res.json({data:users})
})

// @desc    PUT Users
// @route   GET /api/users/:id
// @access  Private
const deleteUser = asyncHandler ( async (req, res) => {
     await User.findByIdAndUpdate(req.user.id, {softDelete:true})
    
    res.json({data:user})
})


// @desc    PUT Users
// @route   GET /api/users/:id
// @access  Private
const updateUser = asyncHandler ( async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user.id, {...req.body})
    
    res.json(user)
})



const generateToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {registerUser, loginUser, getUser, getAllUsers, updateUser, deleteUser}