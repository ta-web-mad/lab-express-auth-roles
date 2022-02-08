const { logueado, checkRole } = require("../middleware/route-ward")
const User = require("../models/User.model")
const Course = require("../models/Course.model")

const router = require("express").Router()

router.get('/course', logueado, checkRole('TA'), (req, res, next) => {
    const data = {}
    User
        .find()
        .then((users) => {
            data.users = users
            return User.find({ role: 'TA' })
        })
        .then(ta => {
            data.ta = ta
            console.log(data)
            res.render('course/create', { data })
        })
        .catch(error => next(error))



})

router.post('/course', logueado, checkRole('TA'), (req, res, next) => {
    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    console.log(title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students)
    Course
        .create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(res.redirect('https://cutt.ly/AOV18LS'))
})



module.exports = router

