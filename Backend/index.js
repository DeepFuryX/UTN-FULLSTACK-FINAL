const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const dbConnect = require('./utils/mongodb')

const app = express()
app.use(bodyParser.json())

dbConnect()

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

app.use('*', (req, res) => {
  res.send('<h1>API TASK</h1>')
})

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
})
