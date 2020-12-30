import jwt from "jsonwebtoken"

const generateToken = (id) => {
  
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  })
  return {
    expires_in: process.env.JWT_EXPIRESIN,
    access_token: token,
  }
}

export default generateToken
