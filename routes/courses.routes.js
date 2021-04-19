const express = require('express')
const router = express.Router()

const { isLoggedIn, checkRoles } = require('./../middlewares')
const { isValidIdFormat, isTa } = require('./../utils')


const mongoose = require('mongoose')

const Course = require('./../models/course.model')

const User = require('./../models/user.model')

// TA can create a course (GET)
router.get('/create', isLoggedIn, checkRoles('TA'), (req, res) => {
    User
        .find()
        .then(allUsers => res.render('pages/courses/new', allUsers))
        .catch(err => console.log('Error!', err))
})

// TA can create a course (POST)
router.post('/create', isLoggedIn, checkRoles('TA'), (req, res) => {

    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    if (title.length === 0 || leadTeacher.length === 0 || startDate.length === 0 || endDate.length === 0 || ta.length === 0 || courseImg.length === 0 || description.length === 0 || status.length === 0 || students.length === 0) {
    res.render('pages/courses/new', { errorMessage: 'Please fill all the fields' })
    return
    }

    Course
        .create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .populate('User') 
        .then(() => res.redirect(`/`))
        .catch(err => console.log('Error!', err))
})

// Courses list
router.get('/', isLoggedIn, (req, res) => {

    Course
        .find()
        .then(allCourses => res.render('pages/courses/courses-list', { allCourses, user: req.session.currentUser, isTa: isTa(req.session.currentUser) }))
        .catch(err => console.log('Error!', err))
})

// Courses details
router.get('/:id', isLoggedIn, (req, res) => {

    if (isValidIdFormat(req.params.id)) {

        Course
            .findById(req.params.id)
            .then(course => res.render('pages/courses/course-detail', {course}))
            .catch(err => console.log('Error!', err))

    } else {
        res.redirect('/courses')
    }
})

// Delete course (POST)
router.post('/delete/:id', isLoggedIn, checkRoles('TA'), (req, res) => {
    Course
        .findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/courses'))
        .catch(err => console.log('There was an error:', err))
})

// Edit course (GET)
router.get('/edit/:id', isLoggedIn, checkRoles('TA'), (req, res) => {

    User
        .findById(req.params.id)
        .then(course => res.render('pages/courses/edit-course', course))
        .catch(err => console.log('Error!', err))
})

// Edit course (POST)
router.post('/edit/:id', isLoggedIn, checkRoles('TA'), (req, res) => {

    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    if (title.length === 0 || leadTeacher.length === 0 || startDate.length === 0 || endDate.length === 0 || ta.length === 0 || courseImg.length === 0 || description.length === 0 || status.length === 0 || students.length === 0) {
    res.render('pages/courses/edit-course', { errorMessage: 'Please fill all the fields' })
    return
    }

    User
        .findByIdAndUpdate(req.params.id, { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(() => res.redirect(`/courses/`))
        .catch(err => console.log('Error!', err))
})


module.exports = router