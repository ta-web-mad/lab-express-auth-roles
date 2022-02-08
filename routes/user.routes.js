const router = require("express").Router()
const User = require('./../models/User.model')
const {isLoggedIn, checkRole} = require('./../middleware/route-guard')
const { isPM, isSameStudent } = require("../utils")



router.get('/estudiantes', isLoggedIn, (req, res, next) => {

    User

    .find({ role: "STUDENT" })
    .then(allStudents => res.render('users/student-list', {allStudents}))
    .catch(err=>next(err))
})

router.get('/estudiantes/:id', isLoggedIn, (req, res, next) => {
    const {id} = req.params

    User
    .findById(id)
    .then(student =>res.render('users/student-detail', {
        student, 
        isPM:isPM(req.session.currentUser), 
        isSameStudent:isSameStudent(id, req.session.currentUser._id),
        }))
    .catch(err => console.log(err))
})

router.get('/estudiantes/:id/editar', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res, next)=>{
    const { id } = req.params

    User
    .findById(id)
    .then(student => res.render('users/student-edit', {
    student,
    isSameStudent: isSameStudent(id, req.session.currentUser._id),
    }))
    .catch(err => console.log(err))
})

router.post('/estudiantes/:id/editar', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res, next) =>{
    const {id} = req.params
    const {username, email, profileImg, description} = req.body

    User
    .findByIdAndUpdate(id, {username, email, profileImg, description})
    .then(()=> res.redirect('/estudiantes'))
    .catch(err =>console.log(err))
})

router.post('/estudiantes/:id/eliminar', isLoggedIn, checkRole('PM'), (req, res, next)=>{
    const {id} = req.params
    
    User
    .findByIdAndDelete(id)
    .then(() => res.redirect('/estudiantes'))
    .catch(err =>console.log(err))
})

router.post('/estudiantes/:id/to-dev', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params
    
    User
        .findByIdAndUpdate(id, { role: 'DEV'})
        .then(() => res.redirect('/estudiantes'))
        .catch(err => console.log(err))
})

router.post('/estudiantes/:id/to-TA', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect('/estudiantes'))
        .catch(err => console.log(err))
})

module.exports = router