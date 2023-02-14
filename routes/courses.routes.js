const router = require("express").Router()
const User = require('./../models/User.model')
const Course = require('./../models/Course.model')

router.get('/', (req, res, next) => {



})

router.get('/create', (req, res, next) => {
    User
        .find()
        .then(user => {
            const userDev = []
            const userTa = []
            const userStudent = []
            user.forEach(elm => {
                if (elm.role === "DEV") userDev.push(elm)
                else if (elm.role === "TA") userTa.push(elm)
                else if (elm.role === "STUDENT") userStudent.push(elm)
            })
            res.render('courses/new-course', { userDev, userTa, userStudent })
        })
        .catch(err => next(err))
})

router.post('/create', (req, res, next) => {
    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    Course
        .create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(() => res.redirect('/courses/all-courses'))
        .catch(err => next(err))
})

router.get('/all-courses', (req, res, next) => {
    Course
        .find()
        .populate('leadTeacher', 'ta', ['students'])
        .then(course => res.render('courses/all-courses', { course }))
        .catch(err => next(err))
})


router.get('/:id', (req, res, next) => {
    const { id } = req.params
    Course
        .findById(id)
        .populate([
            {
                path: "leadTeacher",
                select: "-_id username"
            },
            {
                path: "ta",
                select: "-_id username"
            },
            {
                path: "students",
                select: "-_id username"
            }
        ])
        .then(course => res.render('courses/courses-details', course))
        .catch(err => next(err))
})

module.exports = router