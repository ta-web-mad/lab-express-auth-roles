const User = require("../models/User.model")

const router = require("express").Router()

const { sameUser, isLoggedIn, checkRoles } = require("../middleware")
const Course = require("../models/Course.model")



router.get('/add', (req, res) => {

    res.render(('courses/add'))
})

router.post('/add', (req, res) => {

    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    Course
    .create({title, startDate, endDate, courseImg, description, status})
    .then(theCourse => res.render('courses/list', theCourse))
    .catch(err => console.log(err))

})



module.exports = router
