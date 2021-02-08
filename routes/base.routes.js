const express = require("express")
const router = express.Router()
const { checkLoggedIn } = require("../middleware")
const { isBoss } = require("../utils")

// Endpoints
router.get("/", (req, res) => res.render("index"))
router.get("/my-platform", checkLoggedIn, (req, res) =>
  res.render("my-platform", { isBoss: isBoss(req.user) })
)

module.exports = router
