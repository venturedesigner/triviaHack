const { signUp, login } = require('../controllers/auth.controller')

const router = require('express').Router()

router.post('/signup', signUp)
router.post('/login', login)

exports.authRouter = router
