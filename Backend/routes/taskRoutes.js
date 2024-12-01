const express = require('express')
const Task = require('../models/Task')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')

// Crear tarea
router.post('/create', verifyToken, async (req, res) => {
  const { title, status, description, eventDate } = req.body

  const task = new Task({ title, status, description, eventDate, userId: req.user.id })

  try {
    await task.save()
    res.status(201).json({ error: false, task })
  } catch (error) {
    res.status(400).json({ error: true, msg: error.message })
  }
})

// Obtener tareas del usuario
router.get('/', verifyToken, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id })

  res.json({ error: false, data: tasks })
})

// Actualizar tarea
router.put('/edit/:id', verifyToken, async (req, res) => {
  if (req.params.id.length !== 24) {
    return res.status(400).json({ error: true, msg: 'Error searching for task' })
  }

  const tasks = await Task.find({ _id: req.params.id })

  if (tasks.length === 0) {
    return res.status(400).json({ error: true, msg: 'Error searching for task' })
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.json(task)
  } catch (error) {
    res.status(400).send({ error: true, msg: error.message })
  }
})

// Eliminar tarea
router.delete('/delete/:id', verifyToken, async (req, res) => {
  if (req.params.id.length !== 24) {
    return res.status(400).json({ error: true, msg: 'Error deleting this task' })
  }

  const tasks = await Task.find({ _id: req.params.id })

  if (tasks.length === 0) {
    return res.status(400).json({ error: true, msg: 'Error deleting this task' })
  }

  try {
    await Task.findByIdAndDelete(req.params.id)
    return res.json({ error: false, msg: 'Deleted task' })
  } catch (error) {
    return res.status(400).json({ error: true, msg: error.message })
  }
})

module.exports = router
