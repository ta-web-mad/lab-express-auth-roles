const router = require("express").Router()
const Course = require("../models/Course.model")
const User = require("../models/User.model")
const { isLoggedIn, checkValidUser, checkRole } = require('../middleware/route-guard')


router.get('/', isLoggedIn, (req, res) => {

    Course
        .find()
        .then(courses => res.render('courses/courses-list', {
            courses,
            isTA: req.session.currentUser.role === 'TA',
        }))
        .catch(err => console.log('ERROR listing specific courses:', err))
})

router.get('/crear', isLoggedIn, checkRole('TA'), (req, res) => {

    Promise.all([User.find({ role: 'TA' }), User.find({ role: 'STUDENT' })])

        .then(([arrTA, arrSTU]) => res.render('courses/create', { arrTA, arrSTU }))

        .catch(err => console.log('ERROR creating specific course:', err))

})

router.post('/crear', isLoggedIn, checkRole('TA'), (req, res) => {

    const {
        title,
        leadTeacher,
        startDate,
        endDate,
        ta,
        courseImg,
        description,
        status,
        students
    } = req.body

    Course
        .create({
            title,
            leadTeacher,
            startDate,
            endDate,
            ta,
            courseImg,
            description,
            status,
            students
        })
        .then(() => res.redirect('/cursos'))
        .catch(err => console.log('ERROR creating specific course:', err))

})



router.get('/:id', isLoggedIn, (req, res) => {

    const { id } = req.params
    Course
        .findById(id)
        .populate('leadTeacher')
        .populate('ta')
        .then(course => res.render('courses/course-details', {
            course,
            isTA: req.session.currentUser.role === 'TA'
        }))
        .catch(err => console.log('ERROR listing specific course:', err))

})

router.get('/editar/:id', isLoggedIn, checkRole('TA', 'PM'), (req, res) => {

    const { id } = req.params


    Course
        .findById(id)
        .then(course => res.render('user/course-edit', { course }))
        .catch(err => console.log('ERROR listing specific course:', err))

})

router.post('/eliminar/:id', isLoggedIn, checkRole('TA', 'PM'), (req, res) => {

    const { id } = req.params
    Course
        .findByIdAndDelete(id)
        .then(() => res.redirect('/cursos'))
        .catch(err => console.log('ERROR deleting specific course:', err))
})


module.exports = router
