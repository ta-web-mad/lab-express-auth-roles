const express = require('express');
const router = express.Router();
const Student = require('./../models/User.model')

const { isLoggedIn, checkRole } = require('../middlewares/route-guard')

router.get('/students', isLoggedIn, (req, res, next) => {
    Student
        .find({ role: 'STUDENT' })
        .sort({ title: 1 })
        .then(student => {
            res.render('students/list', { student })
            //     student: student,
            //     isPM: req.session.currentUser?.role === 'PM',
            // })
        })
        .catch(err => next(err))
})

router.get('/students/:_id', isLoggedIn, (req, res, next) => {
    const { _id } = req.params
    console.log(req.params)

    Student
        .findById(_id)
        .then(student => {
            res.render('students/details', {
                student: student,
                isPM: req.session.currentUser?.role === 'PM',
            })
        })
        .catch(err => next(err))
})

router.get('/edit/:_id', isLoggedIn, checkRole('PM', 'STUDENT', 'DEV', 'TA'), (req, res, next) => {

    const { _id } = req.params

    Student
        .findById(_id)
        .then(student => res.render('students/edit-student-form', student))
        .catch(err => next(err))
})

router.post('/students/edit', isLoggedIn, checkRole('PM', 'STUDENT', 'DEV', 'TA'), (req, res, next) => {
    const { email, username, profileImg, description, student_id } = req.body
    console.log('req.body', req.body)
    Student
        .findByIdAndUpdate(student_id, { email, username, profileImg, description })
        .then(student => res.redirect(`/students/${student._id}`))
        .catch(err => next(err))
})


router.post('/delete/:student_id', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { student_id } = req.params

    Student
        .findByIdAndDelete(student_id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

router.post('/markDev/:student_id', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { student_id, role } = req.params

    Student
        .findByIdAndUpdate(student_id, { role: 'DEV' })
        .then(() => res.redirect('/'))
        .catch(err => next(err))


})

router.post('/markTA/:student_id', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { student_id, role } = req.params

    Student
        .findByIdAndUpdate(student_id, { role: 'TA' })
        .then(() => res.redirect('/'))
        .catch(err => next(err))


})


module.exports = router