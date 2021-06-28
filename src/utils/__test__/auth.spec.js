import {newToken, signup, verifyToken, signin} from '../auth'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../../config'
import { User } from '../../resources/user/user.model'

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

  describe('signup', () => {
    test('requires email and password', async () => {
      expect.assertions(2)

      const req = {body: {}}
      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        send(result) {
          expect(typeof result.message).toBe('string')
        }
      }

      await signup(req, res)
    })

    test('creates user and send new token from user', async () => {
      expect.assertions(2)

      const email = 'hello@hello.com'

      const req = {body: {email, password: 'test1234'}}
      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        async send(result) {
          let user = await verifyToken(result.token)
          user = await User.findById(user.id)
            .lean()
            .exec()
          expect(user.email).toBe(email)
        }
      }

      await signup(req, res)
    })
  })

  describe('signin', () => {
    test('requires email and password', async () => {
      expect.assertions(2)
      
      const req = {body: {}}
      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        send(result) {
          expect(typeof result.message).toBe('string')
        }
      }

      await signin(req, res)
    })

    test('user must be real', async () => {
      expect.assertions(2)

      const req = {body: {email: 'hello@hello.com', password: 'test1234'}}
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        send(result) {
          expect(typeof result.message).toBe('string')
        }
      }

      await signin(req, res)
    })

    test('password must match', async () => {
      expect.assertions(2)
      
      await User.create({
        email: 'test@test.com',
        passoword: 'yoyoyo'
      })

      const req = {body: {email: 'test@test.com', password: 'wrong'}}
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        send(result) {
          expect(typeof result.message).toBe('string')
        }
      }

      await signin(req, res)
    })

    test('create new token', async () => {
      expect.assertions(2)

      const fields = {
        email: 'test@test.com',
        password: 'yoyoyo'
      }

      const savedUser = await User.create(fields)

      const req = {body: fields}
      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        async send(result) {
          let user = await verifyToken(result.token)
          user = await User.findById(user.id)
            .lean()
            .exec()

          expect(user._id.toString()).toBe(savedUser._id.toString())
        }
      }

      await signin(req, res)
    })
  })
})
