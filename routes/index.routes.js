const router = require("express").Router()

const { isLoggedIn,checkRoles } = require('../middleware/route-guard')

router.get("/", (req, res, next) => {
  res.render("index")
})

router.get('/admin', isLoggedIn, checkRoles('PM'), (req, res, next) => {
  res.render('admin-panel')
})

module.exports = router
