const router = require("express").Router()
const User = require("../models/User.model")
const Course = require("../models/Course.model")

const { isLoggedOut } = require('./../middleware/route-guard')
const { isLoggedIn } = require('./../middleware/route-guard')


// Course link in navbar route 
router.get('/course', (req, res) => {
    res.render('course/create-course')
})


// Course creation 
router.get('/create', (req, res) => {
    res.render('course/create-course')
})

router.post('/create', (req, res) => {

    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    Course
        .create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(newCourse => {
            res.redirect(`/course/details/${newCourse._id}`)
        })
        .catch(err => console.log(err))
})








// Course listing 
router.get('/course/listing', (req, res) => {

    Course
        .find()
        .select('title')
        .then(courses => {
            res.render('course/courses-list', { courses })
        })
        .catch(err => console.log(err))
})




router.get('/details/:id', (req, res) => {

    const { id } = req.params

    Course
        .findById(id)                                    // nombre del campo que contiene el/los ObjectIDs
        .then(course => {
            res.render('course/details', course)
        })
        .catch(err => console.log(err))
})






module.exports = router