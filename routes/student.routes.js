const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

const User = require('./../models/user.model')

const { isLoggedIn, checkRoles } = require('./../middlewares')
const { isCurrentUser, isBOSS, isDEV, isTA } = require('./../utils')

router.get('/students', isLoggedIn, (req, res) => {
    //console.log('All students will be listed.')
    User
        .find()
        .then(studentsFound => {
            //console.log('Students to list:', studentsFound)
            res.render('pages/students', { studentsFound })
        })
        .catch(err => console.log('Error!', err))
})

router.get('/students/:studentId', isLoggedIn, (req, res) => {
    const studentId = req.params.studentId
    //console.log('Student with ID:', studentId)
    User
        .findById(studentId)
        .then(studentFound => {
            //console.log('Student to show:', studentFound)
            res.render('pages/student', { studentFound, isCurrentUser: isCurrentUser(studentFound, req.session.currentUser), isBOSS: isBOSS(req.session.currentUser)})
        })
        .catch(err => console.log('Error!', err))
})

router.post('/delete/:studentId', isLoggedIn, checkRoles('BOSS'), (req, res) => {
    const studentId = req.params.studentId
    //console.log('Delete student with ID:', studentId)
    User
        .findByIdAndDelete(studentId)
        .then(deletedStudent => {
            //console.log(deletedStudent.name, 'has been deleted.')
            res.redirect('/students')
        })
        .catch(err => console.log('Error!', err))
})

router.post('/editRole/:studentId', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const studentId = req.params.studentId
    console.log('Edit student with ID:', studentId)
    const role = req.body.role
    console.log('Apply role:', role)

    User
        .findByIdAndUpdate(studentId, { role })
        .then(updatedPerson => {
            // console.log(updatedPerson.username, 'Old Role > New Role:')
            // console.log(updatedPerson.role, '>', role)
            res.redirect(`/students/${updatedPerson.id}`)
        })
        .catch(err => console.log('Error!', err))
})

router.get('/editProfile/:studentId', isLoggedIn, (req, res) => {

    const studentId = req.params.studentId
    //console.log('Edit profile of student with ID:', studentId)

    if (studentId !== req.session.currentUser._id && req.session.currentUser.role !== 'BOSS') {
        res.render('pages/auth/loginForm', {
            errorMessage: 'USER HAS UNAUTHORIZED ACCESS.'
        })
    }
    User
        .findById(studentId)
        .then(foundStudent => {
            console.log('Student to edit:', foundStudent.name)
            res.render('pages/editProfile', foundStudent)
    })
})

router.post('/update/:studentId', (req, res) => {
    const studentId = req.params.studentId
    console.log('Will update profile of user with:', studentId)
    const { name, description } = req.body
    console.log('Changes to make:', name, description)
    User
        .findByIdAndUpdate(studentId, { name, description })
        .then(updatedStudent => {
            console.log(updatedStudent.username, 'Old > New:')
            console.log(updatedStudent.name, '>', name)
            console.log(updatedStudent.description, '>', description)
            res.redirect(`/students/${updatedStudent.id}`)
        })
})


module.exports = router