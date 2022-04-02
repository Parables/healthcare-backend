const asyncHandler = require('express-async-handler')
const Appointment = require('../models/appointment')
const User = require('../models/user')

// @desc    Get Appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = asyncHandler ( async (req, res) => {
    const appointments = await Appointment.find({ user: req.user.id})
    res.json(appointments)
})

// @desc    Get a Appointment
// @route   GET /api/appointments/:id
// @access  Private
const getAppointment = asyncHandler ( async (req, res) => {
    const appointment = await Appointment.findById(req.params.id)
    res.json(appointment)
})

// @desc    Create a Appointment
// @route   GET /api/appointments/
// @access  Private
const createAppointment = asyncHandler ( async (req, res) => {    
    console.log(req.body)
    if (!req.body){
        res.status(400)
        throw new Error('Please add a field')
    }

    const appointment = await Appointment.create({
        user: req.user.id,
        ...req.body
    })

    res.json(appointment)
})

// @desc    Update a Appointment
// @route   GET /api/appointments/:id
// @access  Private
const updateAppointment = asyncHandler ( async (req, res) => {
    const appointment = await Appointment.findOne(req.params.id)

    if (!appointment) {
        res.status(400)
        throw new Error('Appointment not found')
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if (appointment.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateAppointment = await Appointment.findByIdAndUpdate(req.params.id,  req.body, {
        new: true
    })
    res.json(updateAppointment)
})

// @desc    Delete a Appointment
// @route   GET /api/appointments/:id
// @access  Private
const deleteAppointment = asyncHandler ( async (req, res) => {
    const user = await User.findById(req.user.id)
    // console.log(req.params.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if (appointment.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    await Appointment.findByIdAndRemove(req.params.id)
    res.json({id: req.params.id})
})


module.exports = {getAppointments, createAppointment, getAppointment, updateAppointment, deleteAppointment}