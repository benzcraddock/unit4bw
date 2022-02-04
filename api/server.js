const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const userRouter = require('./routers/users/user-router')
const authRouter = require('./routers/auth/auth-router')
const classRouter = require('./routers/class/class-router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/users', userRouter)
server.use('/api/auth', authRouter)
server.use('/api/class', classRouter)

// server.get('/api/users', async (req, res) => {
//   res.json(await getAllUsers())
// })

// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })

// Error handling
server.use((err, req, res, next) => { 
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = server
