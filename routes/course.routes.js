const router = require("express").Router()
const { isLoggedIn, checkRole } = require("../middlewares/route-guard")
const { checkIsPM } = require("../utils/checkIsPM")
const { checkIfOwn } = require("../utils/checkIfOwn")

const User = require("./../models/User.model")
const Course = require("./../models/Course.model")


router.get('/', (req, res, next) => {
    Course
        .find()
        .then(courses => res.render('course/courses-avaliable', { courses }))
        .catch(err => next(err))
})

router.get('/create', isLoggedIn, checkRole('TA'), (req, res, next) => {


    const promises = [User.find({ role: 'DEV' }), User.find({ role: 'TA' }), User.find({ role: 'STUDENT' })]

    Promise
        .all(promises)
        .then(([leadTeacher, ta, student]) => {
            res.render('course/create-form', { leadTeacher, ta, student })
        })
})

router.post('/create', isLoggedIn, checkRole('TA'), (req, res, next) => {
    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    Course
        .create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(() => res.redirect('/course'))
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params
    Course
        .findById(id)
        .populate([{
            path: 'leadTeacher',
            select: '-_id username'
        },
        {
            path: 'ta',
            select: '-_id username'
        }])
        .then(course => res.render('course/details', course))
})














module.exports = router

