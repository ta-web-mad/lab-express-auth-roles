const express = require("express")
const router = express.Router()
const passport = require("passport")
const { checkLoggedIn, checkBoss } = require("../middleware")
const { isBoss, hashPassword } = require("../utils")
const User = require("../models/user.model")

// Create employee from BOSS role

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
    .then(
      res.render("my-platform", {
        isBoss: true,
        successMessage: "Employee succesfully created",
      })
    )
    .catch((err) => next(err))
})

// Remove employee from BOSS role
router.get("/my-platform/remove-employee", checkBoss, (req, res) =>
  res.render("employees-mgmt/remove-employee")
)

router.post("/my-platform/remove-employee", (req, res) => {
  User.findOneAndDelete({ username: req.body.username })
    .then(
      res.render("my-platform", {
        isBoss: true,
        successMessage: "Employee succesfully removed",
      })
    )
    .catch((err) => next(err))
})
module.exports = router
