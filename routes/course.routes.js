const express = require('express');
const router = express.Router();

const Course = require("../models/User.model")

router.get('/crear-curso', (req, res) => {

    res.render('courses/create-course')
})

router.get('/', (req, res) => {
    Course
        .find()
        .then(course => {
            res.render('courses/courses-list', { course })
        })
        .catch(err => console.log(err))
})

router.get('/crear-curso', (req, res, next) => {

    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    Course
        .create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(newCourse => {
            res.render(`courses/create-course`)
        })
        .catch(err => console.log(err))
})

module.exports = router