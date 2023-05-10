const express = require('express')
const { isLoggedIn, checkRoles, isOwnerOrPM } = require('../middlewares/route-guard')
const router = express.Router()
const User = require("../models/User.model")
// student list
router.get("/students", isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
    }
    User
        .find()
        .then(user => res.render("student/list", { user, userRole }))
        .catch(err => console.log(err))
})

// students profiles
router.get("/students/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(user => res.render("student/studentprofiles", { user }))
        .catch(err => console.log(err))
})


//edit profile on list 
router.get("/editar/:id", isLoggedIn, checkRoles('PM'), isOwnerOrPM, (req, res, next) => {
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
    }
    const { id } = req.params

    User
        .findById(id)
        .then(student => res.render("student/editprofiles", { student, userRole }))
        .catch(err => console.log(err))
})

// edit profile on list
router.post("/editar/:id", isLoggedIn, checkRoles('PM'), isOwnerOrPM, (req, res, next) => {

    const { username, email, profileImg, description, role } = req.body
    const { id } = req.params      // necesitamos el ID para el método .findByIdAndUpdate()

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description, role })
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
})

//delete profile on list
router.post('/eliminar/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
})
// my profile page
router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render("student/profile", { user: req.session.currentUser })
})
// STUDENT TO DEV
router.get('/dev/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params
    User
        .findByIdAndUpdate(id, { role: "DEV" })
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
})
router.get('/ta/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params
    User
        .findByIdAndUpdate(id, { role: "TA" })
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
})
module.exports = router