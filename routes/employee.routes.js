const express = require("express")
const router = express.Router()
const passport = require("passport")
const {
  checkLoggedIn,
  checkBoss,
  checkProfilePermissions,
} = require("../middleware")
const { isBoss, hashPassword } = require("../utils")
const User = require("../models/user.model")

// Edit profile from BOSS, TA or DEV role

router.get(
  "/my-profile/edit",
  checkLoggedIn,
  checkProfilePermissions,
  (req, res) =>
    res.render("profile-operations/edit-profile", { user: req.user })
)

router.post("/my-profile/edit", (req, res, next) => {
  const { password } = req.body
  const newHashedPassword = hashPassword(password)
  const { username, name, profileImg, description, facebookId, role } = req.body
  User.findByIdAndUpdate(
    req.user._id,
    {
      username,
      name,
      password: newHashedPassword,
      profileImg,
      description,
      facebookId,
      role,
    },
    { omitUndefined: true }
  )
    .then(res.render("my-platform"))
    .catch((err) => next(err))
})

// See other user profile from BOSS, TA or DEV role

router.get("/search", checkLoggedIn, (req, res) =>
  res.render("profile-operations/search-profile")
)

router.post("/search", checkLoggedIn, (req, res, next) => {
  const isOwnProfile = req.user.username === req.body.username
  User.findOne({ username: req.body.username }).then((user) =>
    res
      .render("profile-operations/profile", { user, isOwnProfile })
      .catch((err) => next(err))
  )
})
module.exports = router
