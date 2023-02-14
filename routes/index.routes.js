const { userIsStaff, userLoggedIn } = require("../middleware/route-guard")

const router = require("express").Router()

router.get("/", (req, res, next) => {

  // const isStaff = userIsStaff(req.session.currentUser)

  res.render("index", {
    user: req.session.currentUser,
    // isStaff
  })
})

module.exports = router
