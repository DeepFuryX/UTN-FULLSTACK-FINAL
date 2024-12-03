const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.headers['authorization']

  if (!token) return res.status(400).json({ error: true, msg: 'Token Required' })

  jwt.verify(token.split(' ')[1], process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: true, msg: 'Invalid Token' })
    req.user = decoded
    next()
  })
}
