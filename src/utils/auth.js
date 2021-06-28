import config from '../config'
import {User} from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({id: user.id}, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.email && !req.body.password) {
    return res.status(400).send({message: 'email and password are required'})
  }

  try {
    const user = await User.create(req.body)
    console.log({user})
    const token = newToken(user)

    return res.status(201).send({token})
  } catch (err) {
    console.error(err)
    return res.status(400).end()
  }
}

// export const signin = async (req, res) => {}

// export const protect = async (req, res) => {}
