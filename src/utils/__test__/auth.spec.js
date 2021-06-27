import {newToken, verifyToken} from '../auth'
// import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../../config'
// import {User} from '../../resources/user/user.model'

describe('Authentication:', () => {
  describe('newToken:', () => {
    test('creates new jwt from user', () => {
      const id = 123
      const token = newToken({id})
      const user = jwt.verify(token, config.secrets.jwt)

      expect(user.id).toBe(id)
    })
  })

  describe('verifyToken', () => {
    test('validates jwt and returns payloas', async () => {
      const id = 1234
      const token = jwt.sign({id}, config.secrets.jwt)
      const user = await verifyToken(token)
      expect(user.id).toBe(id)
    })
  })
})
