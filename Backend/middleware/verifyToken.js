const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.headers['authorization']

  if (!token) return res.status(403).send('Token requerido')

  jwt.verify(token.split(' ')[1], process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Token no válido')
    req.user = decoded
    next()
  })
}
