const router = require('express').Router()
const User = require("../models/User.model")



const { issLogedIn, checkRole, check } = require('../middleware/route-guard')


router.get('/lista', issLogedIn, checkRole('PM', 'STUDENT'), (req, res) => {



    User
        .find({ role: 'STUDENT' })
        .then(students => res.render('students/students',
            {
                students: students,
                isAdmin: req.session.currentUser.role === 'PM',

            }))
        .catch(err => console.log(err))

})


router.get('/lista/:_id', issLogedIn, checkRole('PM', 'STUDENT'), (req, res) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(student => res.render('students/student',
            {
                student: student,
                isAdmin: req.session.currentUser.role === 'PM',
                isOwner: req.session.currentUser._id === _id || req.session.currentUser.role === 'PM'

            }))
        .catch(err => console.log(err))
})

router.post('/eliminar/:_id', issLogedIn, checkRole('PM'), (req, res) => {

    const { _id } = req.params

    User
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/estudiantes/lista'))
        .catch(err => console.log(err))

})

router.get('/lista/editar/:_id', issLogedIn, check('PM'), (req, res,) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(student => res.render('students/edit', student))
        .catch(err => console.log(err))
})



router.post('/lista/editar/:_id', issLogedIn, check('PM'), (req, res) => {

    const { _id } = req.params
    const { username, email, profileImg, description } = req.body

    User
        .findByIdAndUpdate(_id, { username, email, profileImg, description })
        .then(() => res.redirect(`/estudiantes/lista/${_id}`))
        .catch(err => console.log(err))


})

router.post('/lista/:_id/DEV', issLogedIn, checkRole('PM'), (req, res) => {



    const { _id } = req.params
    const { role } = req.session.currentUser

    User
        .findByIdAndUpdate(_id, { role: 'DEV' })
        .then(() => res.redirect('/estudiantes/lista',))
        .catch(err => console.log(err))

})


router.post('/lista/:_id/TA', issLogedIn, checkRole('PM'), (req, res) => {




    const { _id } = req.params
    const { role } = req.session.currentUser

    User
        .findByIdAndUpdate(_id, { role: 'TA' })
        .then(() => res.redirect('/estudiantes/lista'))
        .catch(err => console.log(err))

})









module.exports = router