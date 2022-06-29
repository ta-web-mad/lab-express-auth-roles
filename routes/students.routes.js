const router = require('express').Router()
const User = require("../models/User.model")
const { isLoggedIn } = require("../middleware/session-guard")
const { rolesChecker } = require('../utils/roles-checker')
const { checkRole } = require('../middleware/roles-checker')
const {isOwnerOrPM} = require('.././middleware/is-owner')


router.get('/students', isLoggedIn, (req, res) => {
    User
        .find()
        .then(user => res.render('students/list', { user }))
        .catch(err => console.log(err))
})

router.get('/students/:student_id', isLoggedIn, (req, res) => {
    const roles = rolesChecker(req.session.currentUser)
    const { student_id } = req.params
    User
        .findById(student_id)
        .then(student => res.render('students/details', { student, roles }))
        .catch(err => console.log(err))
})

router.get('/students/:student_id/edit', isLoggedIn, isOwnerOrPM, (req, res) => {
    const { student_id } = req.params
    User
        .findById(student_id)
        .then(student => res.render('students/edit', student))
        .catch(err => console.log(err))
})

router.post('/students/:student_id/edit', isLoggedIn, isOwnerOrPM, (req, res) => {
    const { student_id } = req.params
    const { username, email, profileImg, description } = req.body

    User
        .findByIdAndUpdate(student_id, { username, email, profileImg, description })
        .then(student => res.redirect('/students'))
        .catch(err => res.redirect('/students/:student_id/edit'))
})

router.post('/students/:student_id/delete', isLoggedIn, checkRole("PM"), (req, res) => {
    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

router.post('/students/:student_id/edit-role-TA', isLoggedIn, checkRole("PM"), (req, res) => {
    const { student_id } = req.params
    User
        .findByIdAndUpdate(student_id, { role: "TA" })
        .then(student => res.redirect('/students'))
        .catch(err => console.log(err))
})

router.post('/students/:student_id/edit-role-DEV', isLoggedIn, checkRole("PM"), (req, res) => {
    const { student_id } = req.params
    User
        .findByIdAndUpdate(student_id, { role: "DEV" })
        .then(student => res.redirect('/students'))
        .catch(err => console.log(err))
})

































/*
router.get("/edit/:student_id", (req, res) => {
    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => res.render("students/edit"))
        .catch(err => console.log(err))
})

router.post("/edit", (req, res) => {
    const { username, email, profileImg, description } = req.body
    const {student_id} = req.query

    User
        .findByIdAndUpdate(student_id, { username, email, profileImg, description })
        .then(student => res.redirect(`/students`))
        .catch(err => console.log(err))
})*/




























module.exports = router