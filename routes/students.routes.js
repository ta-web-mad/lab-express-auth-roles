const express = require('express');
const router = express.Router();
const Students = require('./../models/User.model')

const { isLoggedIn, checkRole } = require('../middlewares/route-guard');
const { route } = require('./index.routes');
const { find, findByIdAndDelete } = require('./../models/User.model');

router.get('/staff', isLoggedIn, (req, res, next) => {

    Students
        .find({ role: ['DEV', 'TA', 'PM'] })
        .then(staff => res.render('staff/staff-list', {
            staff: staff,
            isStudent: req.session.currentUser?.role === 'STUDENT',
            isDev: req.session.currentUser?.role === 'DEV',
            isTa: req.session.currentUser?.role === 'TA',
            isPm: req.session.currentUser?.role === 'PM',
        }))
        .catch(error => next(error))
})

router.get('/students', isLoggedIn, (req, res, next) => {

    Students
        .find({ role: 'STUDENT' })
        .then(students => res.render('students/students-list', { students }))
        .catch(error => next(error))
})

router.get('/students/:_id', isLoggedIn, (req, res, next) => {

    const { _id } = req.params
    Students
        .findById(_id)
        .then(students => res.render('students/students-profile', {
            students: students,
            isStudent: req.session.currentUser?.role === 'STUDENT',
            isDev: req.session.currentUser?.role === 'DEV',
            isTa: req.session.currentUser?.role === 'TA',
            isPm: req.session.currentUser?.role === 'PM',
        }))
        .catch(error => next(error))
})

router.post('/students/delete/:_id', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { _id } = req.params

    Students
        .findByIdAndDelete(_id)
        .then(() => res.redirect(`/students`))
        .catch(error => next(error))
})

router.get('/students/edit/:_id', isLoggedIn, checkRole('PM'), (req, res) => {
    const { _id } = req.params
    Students
        .findById(_id)
        .then(students => res.render('students/edit-form', students))
        .catch(error => next(error))

})

router.post('/students/edit/:_id', isLoggedIn, checkRole('PM'), (req, res) => {

    const { username, profileImg, email, description, _id } = req.body
    console.log(req.body)

    Students
        .findByIdAndUpdate(_id, { username, profileImg, email, description })
        .then(() => res.redirect('/students'))
        .catch(error => next(error))
})

// router.get('/students/edit/:_id', isLoggedIn, checkRole('STUDENT'), (req, res) => {
//     const { _id } = req.params
//     Students
//         .findById(_id)
//         .then(students => res.render('students/edit-form', {
//             students: students,
//             isStudent: req.session.currentUser?.id === _id,
//         }))
//         .catch(error => next(error))

// })

// router.post('/students/edit/:_id', isLoggedIn, checkRole('STUDENT'), (req, res) => {

//     const { username, profileImg, email, description, _id } = req.body
//     console.log(req.body)

//     Students
//         .findByIdAndUpdate(_id, { username, profileImg, email, description })
//         .then(() => res.redirect('/students'))
//         .catch(error => next(error))
// })



router.post('/students/updateRole/:_id/TA', isLoggedIn, checkRole('PM'), (req, res) => {

    const { role, _id } = req.params
    console.log(req.params)
    Students
        .findByIdAndUpdate(_id, { role: 'TA' })
        .then(() => res.redirect('/staff'))
        .catch(error => next(error))
})

router.post('/students/updateRole/:_id/DEV', isLoggedIn, checkRole('PM'), (req, res) => {

    const { role, _id } = req.params
    console.log(req.params)
    Students
        .findByIdAndUpdate(_id, { role: 'DEV' })
        .then(() => res.redirect('/staff'))
        .catch(error => next(error))
})

router.post('/staff/updateRole/:_id/STUDENT', isLoggedIn, checkRole('PM'), (req, res) => {

    const { role, _id } = req.params
    console.log(req.params)
    Students
        .findByIdAndUpdate(_id, { role: 'STUDENT' })
        .then(() => res.redirect('/students'))
        .catch(error => next(error))
})


module.exports = router