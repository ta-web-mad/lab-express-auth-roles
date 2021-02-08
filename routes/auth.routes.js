const express = require("express")
const router = express.Router()
const passport = require("passport")

// add routes here

// User login
router.get("/login", (req, res) =>
  res.render("auth/login", { errorMsg: req.flash("error") })
)

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
  })
)

router.get("/profile", (req, res) => res.render("profile"))
module.exports = router
