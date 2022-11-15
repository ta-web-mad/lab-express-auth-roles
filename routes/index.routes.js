const { checkRoles } = require("../middleware/route-guard")
const User = require('./../models/User.model')
const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.render("index")
})


module.exports = router
