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

// Obtener tareas del usuario por id
router.get('/:id', verifyToken, async (req, res) => {
  if (req.params.id.length !== 24) {
    return res.status(404).json({ error: true, msg: 'Not found task' })
  }

  const task = await Task.find({ _id: req.params.id })

  if (task.length === 0) {
    return res.status(404).json({ error: true, msg: 'Not found task' })
  }

  res.json({ error: false, data: task })
})

// Actualizar tarea
router.put('/edit/:id', verifyToken, async (req, res) => {
  if (req.params.id.length !== 24) {
    return res.status(400).json({ error: true, msg: 'Task will not find to edit' })
  }

  const tasks = await Task.find({ _id: req.params.id })

  if (tasks.length === 0) {
    return res.status(400).json({ error: true, msg: 'Task will not find to edit' })
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.json({ error: false, data: task })
  } catch (error) {
    res.status(400).send({ error: true, msg: error.message })
  }
})

// Actualizar estado de la task
router.put('/status/:id', verifyToken, async (req, res) => {
  /* /*  if (req.params.id.length !== 24) {
    return res.status(400).json({ error: true, msg: 'Task will not find to edit' })
  } */

  const tasks = await Task.find({ _id: req.params.id })

  if (tasks.length === 0) {
    return res.status(400).json({ error: true, msg: 'Task will not find to edit' })
  }

  const filter = { _id: req.params.id }
  const updateDocument = {
    $set: {
      status: req.body.status
    }
  }

  try {
    await Task.updateOne(filter, updateDocument)
    const tasks = await Task.find({ _id: req.params.id })
    res.json({ error: false, data: tasks })
  } catch (error) {
    res.status(400).json({ error: true, msg: error.message })
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
