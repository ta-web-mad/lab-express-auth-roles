const express = require("express")
const router = express.Router()
const passport = require("passport")

// User login
router.get("/login", (req, res) =>
  res.render("auth/login", { errorMsg: req.flash("error") })
)

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/my-platform",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
  })
)

module.exports = router
