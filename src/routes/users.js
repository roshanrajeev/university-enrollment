const express = require("express")
const router = new express.Router()
const pool = require("../db/mariadb")
const auth = require("../middleware/auth")
const { generateToken } = require("../utils/utils")
const uniDetails = require("../models/uniDetails")

router.post("/api/login", async (req, res) => {
  const username = req.body.user_id
  const password = req.body.password

  // Validate request
  if (!username || !password) {
    return res.status(401).send()
  }

  let conn
  try {
    conn = await pool.getConnection()

    // Get user data
    const users = await conn.query("select user_id, password from user_id")
    const user = users.find(user => user.user_id === username)

    // Validate credentials
    if (!user || user.password !== password) {
      return res.status(401).send()
    }

    // Generate token
    const token = generateToken({ username })
    res.send({ token })
  } catch (e) {
    res.status(500).send(e)
  } finally {
    return conn.end()
  }
})

router.get("/api/universities", auth, async (req, res) => {
  // Pagination
  const options = {}

  const limit = parseInt(req.query.limit)
  const offset = parseInt(req.query.offset)

  if (limit) {
    options.limit = limit
  }
  if (offset) {
    options.offset = offset
  }

  try {
    // Send university details with custom options
    const universities = await uniDetails.findAll(options)
    res.send(universities)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.post("/api/universities", auth, async (req, res) => {
  const data = req.body

  try {
    const university = uniDetails.build(data)
    await university.save()

    res.send()
  } catch (e) {
    res.status(400).send(e)
  }
})

router.patch("/api/universities/:id", auth, async (req, res) => {
  // Check for invalid updates
  const validUpdates = [
    "uni_name",
    "reg_date",
    "exp_date",
    "imgurl",
    "no_of_students",
    "email",
    "weburl",
    "contact_no",
  ]
  const updates = req.body
  const hasInValidUpdate = Object.keys(updates).some(update => !validUpdates.includes(update))
  if (hasInValidUpdate) {
    res.status(400).send()
  }

  // Update data if no invalid props
  const id = req.params.id
  try {
    // Find university
    const university = await uniDetails.findByPk(id)

    // Check if university exist
    if (!university) {
      return res.status(404).send()
    }

    // Update Values
    for (const key in updates) {
      university[key] = updates[key]
    }
    await university.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

router.delete("/api/universities/:id", auth, async (req, res) => {
  try {
    const university = await uniDetails.findByPk(req.params.id)
    if (!university) {
      return res.status(404).send()
    }
    await university.destroy()
    res.send()
  } catch (e) {
    res.send(500).send(e)
  }
})

module.exports = router
