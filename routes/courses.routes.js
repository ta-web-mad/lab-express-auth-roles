const { isLoggedIn, checkRole } = require("../middleware/route-guard")

const router = require("express").Router()

const User = require("../models/User.model")
const Course = require("../models/Course.model")

const { isPM, isTA, isCurrentStudent } = require("../utils")

// Courses list
router.get("/", isLoggedIn, (req, res, next) => {

    Course
        .find()
        .then(courses => {
            res.render('courses/courses-list-page', {
                courses,
                teacherAssistant: isTA(req.session.currentUser),
                user: req.session.currentUser
            })
        })
        .catch(err => console.log(err))

})

// Create Courses
router.get("/create", isLoggedIn, checkRole('TA'), (req, res, next) => {


    User
        .find()
        .then(users => {
            User
                .find({ role: 'TA' })
                .then(ta => res.render('courses/create-course-page', { ta, users }))
        })

        .catch(err => console.log(err))
})

router.post("/create", isLoggedIn, checkRole('TA'), (req, res, next) => {
    const { title, leadTeacher, startDate, endDate, description, ta } = req.body

    Course
        .create({ title, leadTeacher, startDate, endDate, description, ta })
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))

})

// Delete Courses
router.post("/:id/delete", isLoggedIn, checkRole('TA'), (req, res, next) => {
    const { id } = req.params

    Course
        .findByIdAndDelete(id)
        .then(() => res.redirect('/courses'))
        .catch(err => console.log(err))
})

module.exports = router