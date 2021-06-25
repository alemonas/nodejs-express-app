import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

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

export const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (err) {
    console.error(err)
  }
}
