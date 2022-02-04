const Class = require('./class-model')

const checkReqBody = (req, res, next) => {
  if(!req.body.class_name) {
    return next({
      status: 401,
      message: "Name field is required"
    })
  }
  else{
    next()
  }
}

const checkClassExists = (req, res, next) => {
  Class.getClassById(req.params.class_id)
  .then(response => {
    if(response)
    next()
    else{
      next({
        status: 401,
        message: `Class at class_id ${req.params.class_id} does not exist`
      })
    }
  })
  .catch(error => {
    next(error)
  })
}

module.exports = {
  checkReqBody,
  checkClassExists
}
