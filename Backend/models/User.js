const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, trim: true, lowercase: true, required: true, unique: true },
  password: { type: String, required: true }
})

module.exports = mongoose.model('User', UserSchema)
