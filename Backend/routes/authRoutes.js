const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ username, password: hashedPassword })

  try {
    await user.save()
    res.status(201).json({ error: false, msg: 'Registered user' })
  } catch (error) {
    res.status(400).json({ error: true, msg: 'There is already a user with this email' })
  }
})

// Login de usuario
router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username })

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json('Incorrect credentials')
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1h' })
  res.json({ token })
})

module.exports = router
