const router = require('express').Router()
const Class = require('./class-model')
const { restricted } = require('../auth/auth-middleware')

const {
  checkReqBody,
  checkClassExists,
} = require('./class-middleware')

router.get('/', (req, res, next) => {
  Class.getClasses()
  .then(classes => {
    res.status(200).json(classes)
  })
  .catch(next)
})

router.get('/:class_id', (req, res, next) => {
  Class.getClassById(req.params.class_id)
  .then(class => {
    res.status(200).json(class)
  })
  .catch(next)
})

router.post('/', restricted, checkReqBody, (req, res, next) => {
  Class.addClass(req.body, req.decodedJwt.user_id)
  .then(class => {
    res.status(200).json(class)
  })
  .catch(next)
})

router.put('/:class_id', restricted, checkReqBody, (req, res, next) => {
  Class.updateClass(req.params.class_id, req.body)
  .then(class => {
    res.status(200).json(class)
  })
  .catch(next)
})

router.delete('/:class_id', restricted, checkClassExists, (req, res, next) => {
  Class.deleteClass(req.params.class_id)
  .then(numDeleted => {
    res.status(200).json(`Deleted ${numDeleted} class at class_id ${req.params.class_id}`)
  })
  .catch(next)
})

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage:'There is an error inside the class router',
    message: err.message
  })
})

module.exports=router
