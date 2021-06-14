const { QuestionModel } = require('../models/questions.model')

exports.getNextQuestion = (req, res) => {
  console.log(req.body)
  const resolvedQuestions = res.locals.user.resolvedQuestions

  QuestionModel.find({ _id: { $nin: resolvedQuestions } })
    .then(questions => {
      console.log(questions.length)
      const question = questions[Math.floor(Math.random() * questions.length)]

      const formattedQuestion = {
        questionId: question._id,
        type: question.type,
        question: question.question,
        options: [question.correct_answer, ...question.incorrect_answers]
      }

      res.status(200).json(formattedQuestion)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err: 'Error' })
    })
}

exports.checkAnswer = (req, res) => {
  QuestionModel
    .findById(req.body.questionId)
    .then(question => {
      if (question.correct_answer === req.body.answer) {
        const result = { success: true, actualScore: req.body.actualScore + 1 }
        res.status(200).json(result)
      } else {
        const player = res.locals.user
        if (req.body.actualScore > player.level) {
          player.level = req.body.actualScore
          player
            .save()
            .then(player => {
              res.status(200).json({ success: false, actualScore: req.body.actualScore, newRecord: true })
            })
            .catch(err => {
              console.log(err)
              res.status(500).json({ err: 'Error' })
            })
        } else {
          res.status(200).json({ success: false, actualScore: req.body.actualScore, newRecord: false })
        }
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err: 'Error' })
    })
}

/*

{
  questionId: ID,
  answer: String,
  actualScore: Int
}


*/