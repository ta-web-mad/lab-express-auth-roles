const router = require("express").Router()
const { isLoggedIn, isLoggedOut, checkRole, checkUser } = require('../middlewares/route-guard')

// Model
const User = require("../models/User.model")

router.get("/", (req, res, next) => {
  res.render("index")
})

// List Staff
router.get("/staff", isLoggedIn, (req, res, next) => {
  User
    .find({
      $or: [
        { role: 'TA' },
        { role: 'DEV' },
        { role: 'PM' }
      ]
    })
    .then(users => {
      res.render("staff", { users })
    })
    .catch(err => next(err))
})

module.exports = router
