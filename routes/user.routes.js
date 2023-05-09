const express = require("express")
const router = express.Router()

const { isLoggedIn, checkRoles } = require("../middlewares/route-guard")
const User = require("../models/User.model")

//profiles page
router.get("/usuarios", isLoggedIn, (req, res, next) => {

    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
        isTA: req.session.currentUser?.role === 'TA',
        isDEV: req.session.currentUser?.role === 'DEV'
    }

    User
        .find()
        .then((usuarios) => {
            res.render("user/users", { usuarios, userRole })
        })
        .catch(err => console.log(err))
})

//view profile
router.get("/usuarios/:id", isLoggedIn, (req, res, next) => {
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
        isTA: req.session.currentUser?.role === 'TA',
        isDEV: req.session.currentUser?.role === 'DEV'
    }

    const Roles = { student: "STUDENT", dev: "DEV", ta: "TA" }
    const { id } = req.params
    User
        .findById(id)
        .then((usuario) => {
            res.render("user/user-profile", { usuario, userRole, Roles });
        })
        .catch(err => console.log(err))
});

//edit user
router.get('/editar/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(usuario => res.render("user/update-form", usuario))
        .catch(err => console.log(err))
});

router.post('/editar/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { username, profileImg, description } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, profileImg, description })
        .then(() => res.redirect(`/usuarios`))
        .catch(err => console.log(err))
});

//actulizar roles de estudiantes
router.post('/editar/rol/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id)
        .then(() => res.redirect("/usuarios"))
        .catch(err => console.log(err))
});

//delete user
router.post('/eliminar/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect("/usuarios"))
        .catch(err => console.log(err))
});


module.exports = router