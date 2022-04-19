//role based accesscontrol
const Mongoose = require('mongoose')
const User = require('../models/User.model')
const Courses = require('../models/Course.model')

const router = require('express').Router()

const { isLoggedIn, checkRole } = require('./../middlewares/route-guard')

//students handling

router.get('/students', isLoggedIn, checkRole('STUDENT', 'PM'), (req, res, next) => {
    User
        .find()
        .then(user => {
            res.render('private/students-view', { user })
            console.log(user)
        })
        .catch(err => console.log(err))
})


router.get('/students/:id', isLoggedIn, checkRole('STUDENT', 'TA', 'DEV', 'PM'), (req, res, next) => {

    const isPM = req.session.currentUser.role === 'PM'
    const isCurrentId = req.session.currentUser._id === req.params.id
    User
        .findById(req.params.id)
        .then(user => {
            res.render('private/profile-view', { user, isPM, isCurrentId })
        })
        .catch(err => console.log(err))
})
///Course handling

router.get('/courses', isLoggedIn, checkRole('STUDENT'), (req, res, next) => {

    Courses
        .find()
        .populate('ta')
        .populate('students')
        .then(courses => {
            res.render('private/courses-view', { courses })
            console.log(courses.ta)
        })
        .catch(err => console.log(err))

})

router.post('/join-course/:id', (req, res, next) => {

    let { students } = req.body
    students = Mongoose.Types.ObjectId(`${req.session.currentUser._id}`);

    Courses
        .findById(req.params.id)
        .update({$push:{students}})
        .then(() => {
            res.redirect('/courses')
        })
        .catch(err => console.log(err))

})

router.get('/creation-of-courses', isLoggedIn, checkRole('TA'), (req, res, next) => {

    User
        .find()
        .then(users => {
            res.render('private/course-creation-view', { users })
        })
        .catch(err => console.log(err))

})

router.post('/course-creation', (req, res, next) => {


    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    Courses
        .create(req.body)
        .then(() => {
            res.redirect('/courses')
        })
        .catch(err => console.log(err))

})

//Delete Student
router.post('/students/:id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params
    const isPM = req.session.currentUser.role === 'PM'


    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/students')
        })

})


///editar

router.get('/students/:id/edit', (req, res) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => {

            res.render('private/edit-view', { user })

        })
        .catch(err => console.log(err))

})

router.post('/students/:id/edit', (req, res) => {

    const { id } = req.params
    const { username, email, profileImg, description } = req.body

    User
        .findByIdAndUpdate(id, req.body)
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))
})


///Mark as DEV
router.post('/students/:id/dev-update', isLoggedIn, checkRole('STUDENT', 'PM'), (req, res, next) => {

    User
        .findByIdAndUpdate(req.params.id, { role: 'DEV' })
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})

///Mark as TA
router.post('/students/:id/ta-update', isLoggedIn, checkRole('STUDENT', 'PM'), (req, res, next) => {


    User
        .findByIdAndUpdate(req.params.id, { role: 'TA' })
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})



module.exports = router