const express = require('express')
const router = express.Router()
const {getAppointments, createAppointment, getAppointment, updateAppointment, deleteAppointment} = require('../controllers/appointment')
const { protect } = require('../middleware/auth')

router.get('/', protect, getAppointments)

router.get('/:id', protect, getAppointment)

router.post('/', protect, createAppointment)

router.put('/:id', protect, updateAppointment)

router.delete('/:id', protect, deleteAppointment)


module.exports = router