const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const isLoggedIn = require("../middlewares/login-roles");
const saltRounds = 10;
const hbs = require('hbs');

hbs.registerHelper('eq', (a, b) => {
    return a === b;
});


hbs.registerHelper('ifCond', (v1, v2, options) => {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});


// Signup
router.get("/registro", (req, res, next) => res.render("auth/signup"));
router.post("/registro", (req, res, next) => {
    const { userPwd } = req.body;

    bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(userPwd, salt))
        .then((hashedPassword) =>
            User.create({...req.body, password: hashedPassword })
        )
        .then((createdUser) => res.redirect("/"))
        .catch((error) => next(error));
});



// Login
router.get("/iniciar-sesion", (req, res, next) => res.render("auth/login"));
router.post("/iniciar-sesion", (req, res, next) => {
    const { email, userPwd } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                res.render("auth/login", {
                    errorMessage: "Email no registrado en la Base de Datos",
                });
                return;
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render("auth/login", {
                    errorMessage: "La contraseña es incorrecta",
                });
                return;
            } else {
                req.session.currentUser = user;
                res.redirect("/students");
            }
        })
        .catch((error) => next(error));
});

router.get("/students", isLoggedIn, async(req, res, next) => {
    const users = await User.find();
    res.render("students/list", { users });
});

router.get("/student/:studentId", isLoggedIn, async(req, res, next) => {
    const student = await User.findById(req.params.studentId);
    console.log(student); // Añade esta línea para verificar el objeto student

    res.render("students/details", { student, currentUser: req.session.currentUser });
});





router.get("/student/:studentId/edit", isLoggedIn, async(req, res, next) => {
    const student = await User.findById(req.params.studentId);
    res.render("students/edit", { student });
});


// Logout
router.post("/cerrar-sesion", (req, res, next) => {
    req.session.destroy(() => res.redirect("/iniciar-sesion"));
});



router.post("/student/:studentId/delete", isLoggedIn, async(req, res, next) => {
    if (req.session.currentUser.roles === "PM") {
        await User.findByIdAndDelete(req.params.studentId);
        res.redirect("/students");
    } else {
        res.redirect("/students");
    }
});










module.exports = router;