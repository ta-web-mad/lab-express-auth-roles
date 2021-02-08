const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Course = require('../models/course.model')

const {checkLoggedIn, checkRole} = require('../middleware/index')

router.get('/', checkLoggedIn, checkRole(['TA']), (req, res, next) => {
    Course
        .find()
        .then(courses => res.render('course/index', {courses}))
        .catch(err => next(new Error(err)))

    })

router.get('/create', checkLoggedIn, checkRole(['TA']), (req, res, next) => res.render('course/create'))
router.post('/create', (req, res, next) =>{
    const {title, stratDate,endDate, description} = req.body

    Course
        .create({title, stratDate,endDate, description})
        .then(res.redirect('/course'))
        .catch(err => next(new Error(err)))
})
    

module.exports = router