const router = require('express').Router()
const User = require('../models/User.model')
const Course = require('../models/Course.model')
const { formatDate } = require('../utils/date-utils')
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard')




router.get('/students', isLoggedIn, (req, res) => {
    User
        .find({ role: 'STUDENT' })
        .then(students => res.render('user/students-list', { students }))
})

router.get('/students/:id', isLoggedIn, (req, res) => {
    const { id } = req.params
    const userRoles = {
        isPM: req.session.currentUser.role === 'PM',
        isOwner: req.session.currentUser._id === id
    }

    User
        .findById(id)
        .then((student) => res.render('user/student-details', { student, userRoles }))
        .catch(err => next(err))
})


router.post('/students/:id', isLoggedIn, checkRoles('PM'), (req, res) => {
    const { id } = req.params
    const { role } = req.body

    User
        .findByIdAndUpdate(id, { role })
        .then((student) => res.redirect('/students'))
})


router.get('/students/:id/delete', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

router.get('/students/:id/edit', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {
    const { id } = req.params
    const userRoles = {
        isPM: req.session.currentUser.role === 'PM',
        isOwner: req.session.currentUser._id === id
    }

    User
        .findById(id)
        .then((student) => {
            if (userRoles.isPM || userRoles.isOwner) {
                res.render('user/student-edit', { student, userRoles })
            } else {
                res.redirect('/students')
            }
        })

        .catch(err => next(err))
})


router.post('/students/:id/edit', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {
    const { id } = req.params
    const { email, username, profileImg, description } = req.body



    const userRoles = {
        isPM: req.session.currentUser.role === 'PM',
        isOwner: req.session.currentUser._id === id
    }

    if (userRoles.isPM || userRoles.isOwner) {

        User
            .findByIdAndUpdate(id, { email, username, profileImg, description })
            .then(() => res.redirect('/students'))
            .catch(err => next(err))
    } else {
        res.redirect('/students')
    }
})


router.get('/new-course', isLoggedIn, checkRoles('TA'), (req, res) => {


    const dev = User.find({ role: 'DEV' })
    const ta = User.find({ role: 'TA' })
    const student = User.find({ role: 'STUDENT' })

    Promise.all([dev, ta, student])
        .then(devTeacher => {
            const [dev, ta, student] = devTeacher
            res.render('user/course-new', { dev, ta, student })
        })
})


router.post('/new-course', isLoggedIn, checkRoles('TA'), (req, res) => {

    const { title, startDate, endDate, leadTeacher, ta, courseImg, description, students } = req.body
    Course
        .create({ title, startDate, endDate, leadTeacher, ta, courseImg, description, students })
        .then(() => res.redirect('/courses'))
})


router.get('/courses', isLoggedIn, (req, res) => {
    Course
        .find()
        .then(courses => {
            res.render('user/courses-list', { courses })
        })
})

router.get('/courses/:id', isLoggedIn, checkRoles('TA'), (req, res) => {

    const { id } = req.params

    Course
        .findById(id)
        .populate(['leadTeacher', 'ta', 'students'])
        .then(course => {
            course.formattedStartDate = formatDate(course.startDate)
            course.formattedEndDate = formatDate(course.endDate)
            res.render('user/course-details', course)
        })


})

router.get('/courses/:id/edit', isLoggedIn, checkRoles('TA'), (req, res) => {

    const { id } = req.params


    Promise.all([Course.findById(id), User.find({ role: 'DEV' }), User.find({ role: 'TA' }), User.find({ role: 'STUDENT' })])
        .then(promises => {
            const [course, devs, tas, students] = promises
            course.formattedStartDate = formatDate(course.startDate)
            course.formattedEndDate = formatDate(course.endDate)
            res.render('user/course-edit', { course, devs, tas, students })
        })
})

router.post('/courses/:id/edit', isLoggedIn, checkRoles('TA'), (req, res) => {
    const { id } = req.params
    const { title, startDate, endDate, leadTeacher, ta, courseImg, description, students } = req.body
    Course

        .findByIdAndUpdate(id, { title, startDate, endDate, leadTeacher, ta, courseImg, description, students })
        .then(() => res.redirect('/courses'))
})

router.post('/courses/:id/delete', isLoggedIn, checkRoles('TA'), (req, res) => {
    const { id } = req.params
    Course
        .findByIdAndDelete(id)
        .then(() => res.redirect('/courses'))
})












module.exports = router