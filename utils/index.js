const jwt = require('jsonwebtoken')
const { PlayerModel } = require('../api/models/players.model')

exports.checkAuth = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
    if (err) {
      res.status(403).json({ error: 'Token not valid' })
    } else {
      PlayerModel
        .findOne({ email: token.email })
        .then(user => {
          if (user) {
            res.locals.user = user
            next()
          } else {
            res.status(400).json({ err: 'Token not valid' })
          }
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ err: 'Issue in DB' })
        })
    }
  })
}
