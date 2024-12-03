const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const dbConnect = require('./utils/mongodb')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(bodyParser.json())

dbConnect()

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

app.use('*', (req, res) => {
  res.status(404).json({ error: true, msg: 'Route does not exist' })
})

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
})
