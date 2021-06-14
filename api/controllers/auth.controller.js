const { PlayerModel } = require('../models/players.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
  PlayerModel
    .findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password,
          (err, result) => {
            if (err) {
              res.status(401).json({ error: 'Wrong email or password' })
            }
            const userData = { username: user.username, email: user.email, id: user._id }
            const token = jwt.sign(
              userData,
              process.env.SECRET,
              { expiresIn: '1h' }
            )
            res.status(200).json({ token: token, ...userData })
          })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'Error' })
    })
}

exports.signUp = (req, res) => {
  const hashedPwd = bcrypt.hashSync(req.body.password, 10)

  PlayerModel
    .create({
      username: req.body.username,
      password: hashedPwd,
      email: req.body.email
    })
    .then(user => {
      const userData = { name: user.username, id: user._id, email: user.email }
      const token = jwt.sign(
        userData,
        process.env.SECRET,
        { expiresIn: '1h' }
      )

      res.status(201).json({ token: token, ...userData })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: 'Error' })
    })
}
