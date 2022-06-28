const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.render("index")
})

router.use('/', require('./auth.routes'))
router.use('/', require('./private.zones.routes'))

module.exports = router
