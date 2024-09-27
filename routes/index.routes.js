const router = require("express").Router()

const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')

router.get("/", (req, res, next) => {
  res.render("index")
})

module.exports = router
