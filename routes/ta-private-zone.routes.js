const router = require("express").Router()
const { isLoggedIn, checkRole } = require('./../middlewares/route-guard')

const User = require('./../models/User.model')
const Course = require('./../models/Course.model')


// ----------> NEW COURSE <----------

router.get('/new-course', isLoggedIn, checkRole('TA'), (req, res) => {

    User
        .find()
        .then(user => {
            res.render('TA-limited/course-creation', { user })
        })
        .catch(err => console.log(err))
})

router.post('/new-course', isLoggedIn, checkRole('TA'), (req, res) => {

    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, students } = req.body

    Course
        .create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, students })
        .then(user => {
            res.render('TA-limited/course-creation', { user })
        })
        .catch(err => console.log(err))
})


// ----------> EDIT COURSE <----------

router.get('/course/:id/edit', isLoggedIn, checkRole('TA'), (req, res) => {

    const { id } = req.params

    Course
        .findById(id)
        .then(selectedCourse => {
            res.render('TA-limited/course-edit', selectedCourse)
        })
        .catch(err => console.log(err))
})




module.exports = router