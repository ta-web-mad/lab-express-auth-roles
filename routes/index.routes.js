const router = require("express").Router()
const { isLoggedIn, isAuthorized } = require("../middlewares/route-guard")
const User = require('../models/User.model')
const checkRole = require("../utils/checkRole")


router.get("/", (req, res, next) => {
  res.render("index", { role: checkRole(req.session.currentUser) })
})
router.get("/my-profile", isLoggedIn, async (req, res, next) => {
  const { _id: id } = req.session.currentUser
  try {
    const student = await User.findById(id)
    res.render("students/student-details", {
      student, role: checkRole(req.session.currentUser)
    })
  }
  catch (err) {
    next(err)
  }
})
module.exports = router
