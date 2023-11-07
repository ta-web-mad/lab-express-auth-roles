const router = require("express").Router()

router.get("/", (req, res, next) => {
  const user = req.session.currentUser
  res.render("index", { user })
})

module.exports = router
