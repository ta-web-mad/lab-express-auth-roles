const router = require("express").Router()


router.get("/", (req, res, next) => {
  const user = req.session.currentUser
  const isLoggedIn = {
    isLogin: req.session.currentUser ? true : false
  }
  console.log(isLoggedIn)
  res.render("index", { user, isLoggedIn })
})

module.exports = router
