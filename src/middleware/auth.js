const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"]
    const token = bearerHeader.replace("Bearer ", "")

    const response = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = { username: response.username }
    next()
  } catch (e) {
    res.status(401).send()
  }
}

module.exports = auth
