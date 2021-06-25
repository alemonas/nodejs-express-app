import {User} from './user.model'

export const me = (req, res) => {
  res.status(200).json({data: req.user})
}

export const createMe = async (req, res) => {
  try {
    const user = await User.create({...req.body})
    console.log({user})
    res.status(201).send({data: user})
  } catch (err) {
    console.log(err)
    res.status(400).end()
  }
}

export const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    })
      .lean()
      .exec()

    res.status(200).json({data: user})
  } catch (err) {
    console.erro(err)
    res.status(400).end()
  }
}
