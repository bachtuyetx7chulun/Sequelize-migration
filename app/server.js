const { Room, Message } = require('./database/models/index')
const express = require('express')
const app = express()

app.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll({
      include: [
          {
              model: Message,
              as: 'message'
          }
      ]
    })
    return res.json({
      rooms,
      code: 200,
    })
  } catch (error) {
    next(error)
  }
})

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  const code = err.status || 500
  const message = err.message || 'Internal server error'
  return res.status(code).json({
    error: {
      message,
      code,
    },
  })
})

app.listen(5000, () => {
  console.log(`Server is running on port 5000`)
  console.log(`http://localhost:5000`)
})
