const router = require("express").Router()
const Course = require('../models/Course.model')
const User = require("../models/User.model")

const { isLoggedIn, checkRole } = require('./../middleware/route-guard')

router.get('/', isLoggedIn, (req, res) => {

    Course
        .find()
        .then(course => res.render('courses/courses', { course, isTA: req.session.currentUser.role === 'TA' }))
        .catch(err => console.log(err))

})

router.get('/crear', isLoggedIn, checkRole('TA'), (req, res) => {

    Promise.all([User.find({ role: 'TA' }), User.find({ role: 'STUDENT' })])
        .then(([ta, student]) => res.render('courses/course-create', { ta, student }))
        .catch(err => console.log(err))

})

router.post('/crear', isLoggedIn, checkRole('TA'), (req, res) => {

    const { title, startDate, endDate, ta, courseImg, description, students } = req.body

    Course
        .create({ title, startDate, endDate, ta, courseImg, description, students })
        .then(() => res.redirect('/courses'))
        .catch(err => console.log(err))

})

router.get('/:id/detalles', isLoggedIn, (req, res) => {

    const { id } = req.params

    Course
        .findById(id)
        .populate('ta')
        .populate('students')
        .then(course => res.render('courses/course-details', course))
        .catch(err => console.log(err))
})

router.get('/:id/editar', isLoggedIn, checkRole('TA'), (req, res) => {

    const { id } = req.params

    Promise.all([Course.findById(id), User.find({ role: 'TA' }), User.find({ role: 'STUDENT' })])
        .then(([course, ta, student]) => res.render('courses/course-edit', { course, ta, student }))
        .catch(err => console.log(err))

})

router.post('/:id/editar', isLoggedIn, checkRole('TA'), (req, res) => {

    const { id } = req.params
    const { title, ta, courseImg, description, students } = req.body

    Course
        .findByIdAndUpdate(id, { title, ta, courseImg, description, students })
        .then(() => res.redirect(`/courses/${id}/detalles`))
        .catch(err => console.log(err))

})

router.post('/:id/eliminar', isLoggedIn, checkRole('TA'), (req, res) => {

    const { id } = req.params

    Course
        .findByIdAndDelete(id)
        .then(() => res.redirect('/courses'))
        .catch(err => console.log(err))

})


module.exports = router