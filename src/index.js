const express = require("express")
const path = require("path")

const userRouter = require("./routes/users")

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(userRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname, "../client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
  })
}

app.listen(port, () => {
  console.log("Server running on port " + port)
})
