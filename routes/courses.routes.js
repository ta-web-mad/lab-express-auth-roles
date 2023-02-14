const router = require("express").Router()
const { isLoggedIn, checkRole, checkUser } = require("../middlewares/route-guard")
const User = require("../models/User.model")
const Course = require('../models/Course.model')

router.get("/", isLoggedIn, (req, res, next) => {

    Course
        .find()
        .then(course => {
            res.render("courses/courses-list", {
                course,
                isTA: req.session.currentUser?.role === 'TA'
            })
        })
        .catch(err => next(err))
})

router.get('/create', isLoggedIn, (req, res, next) => {

    const promises = [
        User.find({ role: 'DEV' }).select({ username: 1, id: 1 }),
        User.find({ role: 'TA' }).select({ username: 1, id: 1 }),
        User.find({ role: 'STUDENT' }).select({ username: 1, id: 1 })
    ]

    Promise
        .all(promises)
        .then(([dev, ta, student]) => {
            res.render('courses/new-course-form', { dev, ta, student })
        })
        .catch(err => next(err))
})

router.post('/create', isLoggedIn, (req, res, next) => {

    console.log(req.body)

    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    Course
        .create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(course => res.redirect('/courses'))
        .catch(err => next(err))

})

router.get('/:course_id', isLoggedIn, (req, res, next) => {

    const { course_id } = req.params

    Course
        .findById(course_id)
        .populate([
            {
                path: 'leadTeacher',
                select: '_id username'
            },
            {
                path: 'ta',
                select: '_id username'
            },
            {
                path: 'students',
                select: '_id username'
            }
        ])
        .then(course => {
            console.log(course)
            res.render('courses/course-details', {
                course,
                isPM: req.session.currentUser?.role === 'PM',
                isDEV: req.session.currentUser?.role === 'DEV',
                isTA: req.session.currentUser?.role === 'TA'
            })
        })
        .catch(err => next(err))
})

router.get('/edit/:course_id', isLoggedIn, checkRole('TA', 'PM'), (req, res, next) => {

    const { course_id } = req.params

    Course
        .findById(course_id)
        .then(course => {
            res.render('courses/course-edit', course)
        })
        .catch(err => next(err))
})

router.post('/edit/:course_id', isLoggedIn, checkRole('TA', 'PM'), (req, res, next) => {

    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students, course_id } = req.body

    Course
        .findByIdAndUpdate(course_id)
        .then(course => res.redirect('/courses'))
        .catch(err => next(err))
})

router.post('/delete/:course_id', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { course_id } = req.params

    User
        .findByIdAndRemove(course_id)
        .then(() => res.redirect('/courses'))
        .catch(err => next(err))

})


module.exports = router