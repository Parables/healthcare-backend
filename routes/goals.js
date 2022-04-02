const express = require('express')
const router = express.Router()
const {getGoals, createGoal, getGoal, updateGoal, deleteGoal} = require('../controllers/goals')
const { protect } = require('../middleware/auth')

router.get('/', protect, getGoals)

router.get('/:id', protect, getGoal)

router.post('/', protect, createGoal)

router.put('/:id', protect, updateGoal)

router.delete('/:id', protect, deleteGoal)


module.exports = router