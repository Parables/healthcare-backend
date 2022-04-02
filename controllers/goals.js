const asyncHandler = require('express-async-handler')
const Goal = require('../models/goals')
const User = require('../models/user')

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler ( async (req, res) => {
    const goals = await Goal.find({ user: req.user.id})
    res.json(goals)
})

// @desc    Get a Goal
// @route   GET /api/goals/:id
// @access  Private
const getGoal = asyncHandler ( async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    res.json(goal)
})

// @desc    Create a Goal
// @route   GET /api/goals/
// @access  Private
const createGoal = asyncHandler ( async (req, res) => {    
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a field')
    }

    const goal = await Goal.create({
        user: req.user.id,
        text: req.body.text
    })

    res.json(goal)
})

// @desc    Update a Goal
// @route   GET /api/goals/:id
// @access  Private
const updateGoal = asyncHandler ( async (req, res) => {
    const goal = await Goal.findById(req.params.id,  req.body)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if (goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id,  req.body, {
        new: true
    })
    res.json(updateGoal)
})

// @desc    Delete a Goal
// @route   GET /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler ( async (req, res) => {
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if (goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    await Goal.findByIdAndRemove(req.params.id)
    res.json({id: req.params.id})
})


module.exports = {getGoals, createGoal, getGoal, updateGoal, deleteGoal}