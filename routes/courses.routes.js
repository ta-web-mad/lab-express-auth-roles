const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRole } = require('../middelware/auth')

const req = require("express/lib/request")
const Course = require("../models/Course.model")

router.get('/courses', (req, res) => {
    const isTA = req.session.currentUser.roles === 'TA'

    Course
        .find()
        .then(course => {
            res.render('courses/courses', { course, isTA })
        })
})

router.get('/courses-edit', checkRole('TA'), (req, res) => {
    res.render('courses/create-courses')
})

router.post('/courses-edit', (req, res) => {
    const { title, leadTeacher, ta, status, students } = req.body
    Course
        .create({ title, leadTeacher, ta, status, students })
        .then(course => {
            res.render('courses/courses', course)
        })
})

router.get("/course/:id/delete", checkRole('TA'), (req, res) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect("/courses")
        })

})


module.exports = router