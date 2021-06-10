const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  category: {
    type: String
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['boolean', 'multiple', 'open']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard']
  },
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  correct_answer: {
    type: String,
    required: [true, 'Correct answer is required']
  },
  incorrect_answers: {
    type: Array
  }
})

exports.QuestionModel = mongoose.model('question', questionSchema)
