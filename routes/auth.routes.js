const express = require('express')
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const { route } = require('./base.routes')
const bcryptSalt = 10

// encriptación de la contraseña del Boss
// router.post('/', (req, res) => {
//     const password = req.body.password
//     const salt = bcrypt.genSaltSync(bcryptSalt)
//     const hashPass = bcrypt.hashSync(password, salt)
//     res.send(hashPass)
// })

router.get("/login", (req, res) => res.render("auth/login", { errorMsg: req.flash("error") }))

router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}))

router.get("/signup", (req, res) => res.render("auth/signup"))

router.post("/signup", (req, res, next) => {

    const { username, name, password, profileImg, description, facebookId } = req.body

    if (username === "" || password === "" || name === "") {
        res.render("auth/signup", { errorMsg: "Fill the required fields" })
        return
    }

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                res.render("auth/signup", { errorMsg: "Username already exists" })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, name, password: hashPass, profileImg, description, facebookId })
                .then(() => res.redirect("/home"))
                .catch(() => res.render("auth/signup", { errorMsg: "Server error" }))
        })
        .catch(error => next(new Error(error)))
})

router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
})

module.exports = router