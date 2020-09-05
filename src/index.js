const express = require("express")
const path = require("path")
const cors = require("cors")

const userRouter = require("./routes/users")

const port = process.env.PORT

const app = express()

// Setup cors config
app.use(cors())

// Middlewares
app.use(express.json())
app.use(userRouter)

// Production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.resolve(__dirname, "../client/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
  })
}

app.listen(port, () => {
  console.log("Server running on port " + port)
})
