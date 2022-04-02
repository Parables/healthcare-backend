const express = require('express')
const router = express.Router()
const {getLibrarys, createLibrary, getLibrary, updateLibrary, deleteLibrary} = require('../controllers/library')
const { protect } = require('../middleware/auth')

router.get('/', protect, getLibrarys)

router.get('/:id', protect, getLibrary)

router.post('/', protect, createLibrary)

router.put('/:id', protect, updateLibrary)

router.delete('/:id', protect, deleteLibrary)


module.exports = router