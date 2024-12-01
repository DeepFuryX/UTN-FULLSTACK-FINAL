const mongoose = require('mongoose')

const STATUS_VALUES = ['Todo', 'Running', 'Done']

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    eventDate: { type: Date, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: STATUS_VALUES, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Task', TaskSchema)
