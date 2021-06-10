const { authRouter } = require('./auth.router')
const { questionRouter } = require('./question.router')
const { userRouter } = require('./user.router')

const router = require('express').Router()

router.use('/auth', authRouter)
router.use('/question', questionRouter)
router.use('/user', userRouter)

exports.router = router
