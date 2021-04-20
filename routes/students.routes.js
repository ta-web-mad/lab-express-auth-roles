const express = require('express');
const router = express.Router();

const { isLoggedIn, checkRoles } = require('./../middlewares')
 const {isBoss, isTa, isDev}   = require('./../utils')

const mongoose = require('mongoose')

const User = require('./../models/user.model')

//STUDENT LIST
router.get('/', isLoggedIn, (req, res, next) => {
    
    User
        .find()
        .then(allStudents => res.render('pages/students/index', { allStudents, isBoss: isBoss(req.session.currentUser) }))
        .catch(err => console.log('Error', err))
    })


router.get('/:student_id', isLoggedIn, (req, res, next) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => res.render ('pages/students/details',  {student, isBoss: isBoss(req.session.currentUser)}))
        .catch(err => console.log('Error', err))
})

//DELETE MOVIE(POST)
router.get('/:student_id/delete', isLoggedIn, (req, res) => {

    const { student_id } = req.params

    User
        .findByIdAndRemove(student_id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log('Error', err))
})

//EDIT STUDENT(GET)
router.get('/:student_id/edit', isLoggedIn, (req, res) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => res.render('pages/students/edit', student))
        .catch(err => console.log('Error', err))
})

//EDIT STUDENT(POST)
router.post('/:student_id/edit', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const { student_id } = req.params
    const { role, username, name, profileImg, description } = req.body

    User
        .findByIdAndUpdate(student_id, {role, username, name, profileImg, description})
        .then(() => res.redirect('/students'))
        .catch(err => console.log('Error', err))
})

//EDIT STUDENT(GET) BY STUDENTS
// router.get('/profile/:my_id', isLoggedIn, checkRoles('STUDENT'), (req, res) => {

//     const { my_id } = req.params
//     if ( my_id  === req.session.currentUser._id) {
//         User
//             .findById(student_id)
//             .then(student => res.render('pages/students/my-area', student))
//             .catch(err => console.log('Error', err))
//     }
    
// })

module.exports=router
