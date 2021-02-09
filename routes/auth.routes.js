const {response} = require('express');
const express = require('express');
const router = express.Router();
const passport = require("passport")

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10

// add routes here
//New employee
router.get("/editor-page/new", (req, res) => res.render("private/new"))
router.post("/editor-page/new", (req, res, next) => {

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
                res.render("private/new", { errorMsg: "El usuario ya existe" })
                return
            }

            // Validación pwd

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, password: hashPass })
                .then(() => res.redirect("/editor-page"))
                .catch(() => res.render("private/new", { errorMsg: "Error de servidor" }))
        })
        .catch(error => next(new Error(error)))
})

// User login
router.get("/iniciar-sesion", (req, res) => res.render("auth/login", { errorMsg: req.flash("error") }))
router.post("/iniciar-sesion", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/iniciar-sesion",
    failureFlash: true,
    passReqToCallback: true
}))

// User logout
router.get("/cerrar-sesion", (req, res) => {
    req.logout();
    res.redirect("/iniciar-sesion");
});

module.exports = router;
