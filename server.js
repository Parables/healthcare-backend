const dotenv = require('dotenv').config()
const express = require('express')
const {errorHandler} = require('./middleware/error')
const connectDB = require('./config/db')

const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


// app.use('/api/librarys', require('./routes/librarys'))
app.use('/api/users', require('./routes/user'))
app.use('/api/appointments', require('./routes/appointment'))
app.use('/api/librarys', require('./routes/library'))



app.use(errorHandler)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log('Server is listening on port:', port) 
})