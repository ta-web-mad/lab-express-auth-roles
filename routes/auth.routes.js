const express = require('express');
const router = express.Router();
const passport = require("passport");

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10

// Boss signup
router.get("/register-boss", (req, res) => res.render("auth/boss-signup"))

router.post("/register-boss", (req, res, next) => {

    const { username, role, password } = req.body

    if (!username || !role || !password) {
        res.render("auth/boss-signup", { errorMsg: "Fields required" })
        return
    }

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                console.log('The user is', user)
                res.render("auth/boss-signup", { errorMsg: "User already exists" })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, role, password: hashPass })
                .then(() => res.redirect("/"))
                .catch(() => res.render("auth/boss-signup", { errorMsg: "Server error" }))
        })
        .catch(error => next(new Error(error)))
})


//User login
router.get('/login', (req, res) => res.render('auth/login', {errorMsg: req.flash('error')}))

router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
})
)

//Register
router.get("/register", (req, res) => res.render("auth/register"))

router.post("/register", (req, res, next) => {

    const { username, role, password } = req.body

    if (!username || !role || !password) {
        res.render("auth/register", { errorMsg: "Fields required" })
        return
    }

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                console.log('The user is', user)
                res.render("auth/register", { errorMsg: "User already exists" })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, role, password: hashPass })
                .then(() => res.redirect("/"))
                .catch(() => res.render("auth/register", { errorMsg: "Server error" }))
        })
        .catch(error => next(new Error(error)))
})


//User logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login')
})

module.exports = router;
