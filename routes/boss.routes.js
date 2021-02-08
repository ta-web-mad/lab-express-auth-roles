const express = require("express")
const router = express.Router()
const passport = require("passport")
const { checkLoggedIn, checkBoss } = require("../middleware")

router.get("/my-platform/add-employee", checkBoss, (req, res) =>
  res.render("employees-mgmt/create-employee")
)
module.exports = router
