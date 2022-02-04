const bcrypt = require('bcryptjs')
const { tokenBuilder } = require('./auth-helpers')
const router = require('express').Router()
const User = require('../users/user-model')
const Class = require('../class/class-model')
const { BCRYPT_ROUNDS } = require('../../../config')

const {
  restricted,
  checkLoginBody,
  checkRegBody,
  checkUsername
} = require('./auth-middleware')

router.post('/register', checkRegBody, checkUsername, async (req, res, next) => {
  let user = req.body
  const hash = await bcrypt.hashSync(user.password, BCRYPT_ROUNDS)
  user.password = hash
  User.insertUser(user)
    .then(saved => {
      res.status(201).json({
        message: `Welcome, ${saved.username}`
      })
    })
    .catch(next)
  })

router.post('/login', checkLoginBody, (req, res, next) => {
  let { username, password } = req.body

  User.findByUsername(username)
    .then((user) => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = tokenBuilder(user)
        res.status(200).json({
          message: `Welcome back, ${user.username}!`,
          token,
        })
      } else {
        next({
          status: 401,
          message: 'Invalid credentials.'
        })
      }
    })
    .catch(next)
  })

router.get('/classes', restricted, (req, res, next) => {
  user_id = req.decodedJwt.user_id
  Class.getClassesByUser(user_id)
    .then(class => {
      res.status(200).json(class)
    })
    .catch(next)
})

module.exports = router
