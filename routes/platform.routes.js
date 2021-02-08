const express = require("express")
const router = express.Router()
const { checkLoggedIn, checkProfilePermissions } = require("../middleware")
const { isBoss } = require("../utils")

router.get("/", checkLoggedIn, (req, res) =>
  res.render("my-platform", { isBoss: isBoss(req.user) })
)

router.get("/my-profile", checkLoggedIn, (req, res) =>
  res.render("profile-operations/profile", {
    user: req.user,
    isOwnProfile: true,
  })
)

module.exports = router
