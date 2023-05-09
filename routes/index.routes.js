const router = require("express").Router()

const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')

router.get("/", (req, res, next) => {

  console.log(req.session.currentUser)

  if (req.session.currentUser) {
    const id = req.session.currentUser._id
    res.render("index", {
      id,
      isPM: req.session.currentUser.role === 'PM',
      isDEV: req.session.currentUser.role === 'DEV',
      isSTUDENT: req.session.currentUser.role === 'STUDENT'
    })
  } else {
    res.render("index")
  }

}),

  // router.get("/student-profile", isLoggedIn, (req, res, next) => {
  //   res.render("user/student-profile", { user: req.session.currentUser })

  // })
  module.exports = router
