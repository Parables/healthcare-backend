const asyncHandler = require('express-async-handler')
const Library = require('../models/library')
const User = require('../models/user')

// @desc    Get Librarys
// @route   GET /api/librarys
// @access  Private
const getLibrarys = asyncHandler ( async (req, res) => {
    const librarys = await Library.find({ user: req.user.id})
    res.json(librarys)
})

// @desc    Get a Library
// @route   GET /api/librarys/:id
// @access  Private
const getLibrary = asyncHandler ( async (req, res) => {
    const library = await Library.findById(req.params.id)
    res.json(library)
})

// @desc    Create a Library
// @route   GET /api/librarys/
// @access  Private
const createLibrary = asyncHandler ( async (req, res) => {    
    console.log(req.body)
    if (!req.body){
        res.status(400)
        throw new Error('Please add a field')
    }

    const library = await Library.create({
        user: req.user.id,
        ...req.body
    })

    res.json(library)
})

// @desc    Update a Library
// @route   GET /api/librarys/:id
// @access  Private
const updateLibrary = asyncHandler ( async (req, res) => {
    const library = await Library.findOne(req.params.id)

    if (!library) {
        res.status(400)
        throw new Error('Library not found')
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if (library.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateLibrary = await Library.findByIdAndUpdate(req.params.id,  req.body, {
        new: true
    })
    res.json(updateLibrary)
})

// @desc    Delete a Library
// @route   GET /api/librarys/:id
// @access  Private
const deleteLibrary = asyncHandler ( async (req, res) => {
    const user = await User.findById(req.user.id)
    // console.log(req.params.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if (library.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    await Library.findByIdAndRemove(req.params.id)
    res.json({id: req.params.id})
})


module.exports = {getLibrarys, createLibrary, getLibrary, updateLibrary, deleteLibrary}