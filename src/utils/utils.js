const jwt = require("jsonwebtoken")

const generateToken = data => {
  const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET)
  return token
}

module.exports = {
  generateToken,
}
