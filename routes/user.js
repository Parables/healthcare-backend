const express = require('express')
const { updateGoal } = require('../controllers/goals')
const router = express.Router()
const { registerUser, loginUser, getUser, getAllUsers, updateUser, deleteUser } = require('../controllers/user')
const { protect } = require('../middleware/auth')

router.post('/', registerUser)

router.get('/:id', protect, getUser)
router.get('/', getAllUsers)
router.put('/:id', protect, updateUser)
router.put('/:id',protect, deleteUser)


router.post('/login', loginUser)

module.exports = router