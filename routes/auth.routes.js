const express = require('express')
const router = express.Router()

const User = require('../models/user.model')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const passport = require("passport")

router.get('/signup', (req, res) => res.render('./auth/signup'))

router.post("/signup", (req, res, next) => {

    const { username, password } = req.body

    if (username === "" || password === "") {
        res.render("auth/signup", { errorMsg: "Rellena los campos" })
        return
    }

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                console.log('El usuario es', user)
                res.render("auth/signup", { errorMsg: "El usuario ya existe" })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, password: hashPass })
                .then(() => res.redirect("/"))
                .catch(() => res.render("auth/signup", { errorMsg: "Error de servidor" }))
        })
        .catch(error => next(new Error(error)))
})

router.get("/login", (req, res) => res.render("auth/login", { errorMsg: req.flash("error") }))

router.post("/login", passport.authenticate("local", {
    successRedirect: "/private",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}))


// User logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});


module.exports = router
