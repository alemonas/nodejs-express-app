import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'

import userRouter from './resources/user/user.router'
import listRouter from './resources/list/list.router'

export const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send({
    message: 'hello',
  })
})

app.use('/api/user', userRouter)
app.use('api/list', listRouter)

export const start = () => {
  try {
    mongoose.connect('mongodb://localhost:27017/MyApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (err) {
    console.error(err)
  }
}
