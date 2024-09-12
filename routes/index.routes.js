const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard.js')
const { find } = require("../models/User.model")



router.get("/", (req, res, next) => {
  res.render("index")
})
router.get("/staff", isLoggedIn, (req, res) => {
  User
    .find({ role: ['PM', 'TA', 'DEV'] })
    .then(user => res.render('./staff', { user }))
    .catch(err => next(err))



})



module.exports = router
