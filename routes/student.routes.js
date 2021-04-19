const express = require('express')
const router = express.Router()

const { isLoggedIn, checkRoles } = require('./../middlewares')
const { capitalizeText, isValidIdFormat, isEditor, isBoss, formatValidationError } = require('./../utils')

const { formatDate } = require('./../utils')

const User = require('./../models/user.model')


//1

router.get('/estudiantes', (req, res) => {

    User
        .find()
        .then(allStudents => res.render('pages/student/student-page', { allStudents, msg: req.query.msg, isBoss: isBoss(req.session.currentUser), isEditor: isEditor(req.session.currentUser)}))
        .catch(err => console.log('Error!', err))
})


//2
router.get('/estudiantes/detalle/:id', (req, res) => {

    User
        .findById(req.params.id)
        .then(student => res.render('pages/student/show-page', student))
        .catch(err => console.log('Error!', err))
})

//3
router.get('/estudiantes', isLoggedIn, (req, res) => {
    const now = new Date()
    res.render('pages/student/show-page', { student: req.session.currentUser, now: formatDate(now) })
})

// Delete a student from the database

router.post('/estudiantes/delete/:id',isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const user_id  = req.params.id

    User
        .findByIdAndRemove(user_id)
        .then(() => res.redirect('/estudiantes'))
        .catch(err => console.log('Error!', err))
})


// Edit a student GET

router.get('/estudiantes/edit', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const { user_id } = req.query

    User
        .findById(user_id)
        .then(student => res.render('pages/student/edit-student', student))
        .catch(err => console.log('Error!', err))
})


// Edit a student POST

router.post('/estudiantes/edit',isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const { user_id } = req.query
    const { name, description} = req.body

    User
        .findByIdAndUpdate(user_id , { name, description })
        .then(editedStudent => res.redirect(`/estudiantes/detalle/${editedStudent._id}`))
        .catch(err => console.log('Error!', err))
})



module.exports = router