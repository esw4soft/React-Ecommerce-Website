import jwt from "jsonwebtoken"

export const generateToken = (user) => {
  return jwt.sign(
    {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      _id: user._id,
    }, 
    process.env.JWT_SECRET,
    {
    expiresIn: '30d',
    }
  )
}

// 會員訂單送出簽章
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  if(authorization) {
    const token = authorization.slice(7, authorization.length) //切掉前面家的knight
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decode) => {
        if(err) {
          res.status(401).send({ message: 'Invalid Token' })
        } else {
          req.user = decode
          next()
        }
      }
    )
  } else{
    res.status(401).send({ message: 'No Token' })
  }
}