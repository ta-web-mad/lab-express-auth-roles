const router = require("express").Router()

const { isLoggedIn, checkRole, isTA } = require('./../middleware/route-guard')

const Course = require('../models/Course.model')
const User = require('../models/User.model')


router.get('/list', isLoggedIn, (req, res, next) => {

    const isTA = req.session.currentUser.role === 'TA'

    Course
        .find()
        .populate('leadTeacher')
        .populate('ta')
        .populate('students')

        .then(courses => {
            res.render('courses/courses-list', { courses, isTA })
        })
        .catch(err => console.log(err))
})

router.get('/new-course', isLoggedIn, checkRole('TA'), (req, res, next) => {
    User
        .find()
        .then(users => res.render('courses/new-course', { users })
        )
        .catch(err => console.log(err))
})

router.post('/new-course', isLoggedIn, checkRole('TA'), (req, res, next) => {
    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    Course
        .create(req.body)
        .then(() => res.redirect('/courses/list'))
        .catch(err => console.log(err))


})


router.get('/:id/edit', isLoggedIn, checkRole('TA'), (req, res, next) => {

    const { id } = req.params

    let info = {}

    Course
        .findById(id)
        .populate('leadTeacher')
        .populate('ta')
        .populate('students')
        .then(courseToEdit => {
            info.course = courseToEdit
            return User.find()
        })
        .then(users => {
            info.users = users

            res.render('courses/edit-course', info)
        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', isLoggedIn, checkRole('TA'), (req, res, next) => {

    const { id } = req.params

    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    Course
        .findByIdAndUpdate(id, req.body)
        .populate('leadTeacher')
        .populate('ta')
        .populate('students')
        .then(() => res.redirect('/courses/list'))
        .catch(err => console.log(err))


})

router.post('/:id/delete', isLoggedIn, checkRole('TA'), isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Course
        .findByIdAndDelete(id)
        .then(() => res.redirect('/courses/list'))
        .catch(err => console.log(err))



});

router.post('/:id/join', isLoggedIn, isLoggedIn, (req, res, next) => {

    const { id, students } = req.params

    // req.session.currentUser

    Course
        .findByIdAndUpdate(id, students = req.session.currentUser)
        .catch(err => console.log(err))



});








module.exports = router