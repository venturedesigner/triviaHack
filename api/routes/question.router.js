const { checkAuth } = require('../../utils')
const { getNextQuestion, checkAnswer } = require('../controllers/question.controller')
const router = require('express').Router()

router.get('/nextquestion', checkAuth, getNextQuestion)
router.post('/checkanswer', checkAuth, checkAnswer)

exports.questionRouter = router
