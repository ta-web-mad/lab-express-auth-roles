const express = require("express")
const router = express.Router()
const passport = require("passport")
const { checkLoggedIn, checkBoss } = require("../middleware")
const { isBoss, hashPassword } = require("../utils")
const User = require("../models/user.model")

router.get("/my-platform/add-employee", checkBoss, (req, res) =>
  res.render("employees-mgmt/create-employee")
)

router.get("/my-platform/add-employee", checkBoss, (req, res) =>
  res.render("employees-mgmt/create-employee")
)
router.post("/my-platform/add-employee", (req, res, next) => {
  const { password } = req.body
  const newHashedPassword = hashPassword(password)
  const { username, name, profileImg, description, facebookId, role } = req.body

  User.create({
    username,
    name,
    password: newHashedPassword,
    profileImg,
    description,
    facebookId,
    role,
  })
    .then(res.redirect("/my-platform"))
    .catch((err) => next(err))
})
module.exports = router
