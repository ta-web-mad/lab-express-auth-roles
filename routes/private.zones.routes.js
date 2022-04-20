const router = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require("../models/User.model")

const { checkPM, checkST, changeDEV, changeTA } = require("../utils")

const { isLoggedIn, checkRole } = require('./../middlewares/route-guard')


router.get('/estudiantes', isLoggedIn, (req, res, next) => {

    const isAdmin = req.session.currentUser.role === 'PM'
    const isCheckPM = checkPM(req.session.currentUser)

    User
        .find()
        .then(students => {
            res.render('private-zone/students', { students, isAdmin, isCheckPM })
        })
        .catch(err => console.log(err))
})

router.get('/estudiantes/:id', isLoggedIn, (req, res, next) => {

    const isAdmin = req.session.currentUser.role === 'PM'
    const isCheckPM = checkPM(req.session.currentUser)

    User
        .findById(req.params.id)
        .then(studentId => {
            res.render('private-zone/student-id', { studentId, isAdmin, isCheckPM })
        })
        .catch(err => console.log(err))

})

router.get('/estudiantes/:id/editar', isLoggedIn, (req, res, next) => {

    const isStudent = req.session.currentUser.role === 'STUDENT'
    const isCheckST = checkST(req.session.currentUser)
    const isCheckPM = checkPM(req.session.currentUser)


    User
        .findById(req.params.id)
        .then(studentId => {
            res.render('private-zone/update', { studentId, isStudent, isCheckST, isCheckPM })
        })
        .catch(err => console.log(err))

})

router.post('/estudiantes/:id/editar', isLoggedIn, (req, res, next) => {

    const { email, username, description, role } = req.body
    const isAdmin = req.session.currentUser.role === 'PM'
    const isCheckPM = checkPM(req.session.currentUser)


    User
        .findByIdAndUpdate(req.params.id, { email, username, description, role })
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))

})


router.post('/estudiantes/:id/eliminar', isLoggedIn, (req, res, next) => {

    const { student_id } = req.params.id

    User
        .findByIdAndDelete(student_id)
        .then(() => {
            res.redirect('/')

        })
        .catch(err => console.log(err))

})


router.post('/estudiantes/:role/cambiar-rol', isLoggedIn, (req, res, next) => {

    const { student_role } = req.params.role

    User
        .findById(student_role)
        .then(() => {
            res.redirect('/')

        })
        .catch(err => console.log(err))

})




module.exports = router