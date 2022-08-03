import express from 'express'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils.js'
import expressAsyncHandler from 'express-async-handler'

const userRouter = express.Router()

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    console.log(user)
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id,
          token: generateToken(user)
        })
        return
      }
    }
    res.status(401).send({ message: 'Invalid email or password'})
  })
)

export default userRouter