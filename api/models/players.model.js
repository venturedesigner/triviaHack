const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User name is required'],
    unique: [true, 'User name is unique'],
    minLength: [4, 'User name must have 4 characters at least']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email is unique'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Wrong email format.']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  level: {
    type: Number,
    default: 1
  },
  resolvedQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question'
  }]
})

exports.PlayerModel = mongoose.model('player', playerSchema)
