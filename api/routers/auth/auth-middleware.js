const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../../config/index')
const User = require('../users/user-model')

const restricted = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return next({ status: 401, message: 'token required' })
  }
  jwt.verify(token, JWT_SECRET, (err, decoded)=> {
    if (err) {
      return next({ status: 401, message: `token invalid` })
    }
    req.decodedJwt = decoded
    next()
  })
}

const checkLoginBody = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return next({ status: 401, message: "username and password are required" })
  }
  else{
      next()
  }
}

const checkRegBody = (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return next({ status: 401, message: "username, password and email are required" })
  }
  else{
      next()
  }
}

function checkUsername (req, res, next){
  User.findByUsername(req.body.username)
    .then(user=>{
        if(user){
            next({ status: 401, message: "username taken" })
        }
        else{
            next()
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = {
  restricted,
  checkLoginBody,
  checkRegBody,
  checkUsername
}