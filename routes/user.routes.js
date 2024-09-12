const router = require("express").Router()
const User = require("../models/User.model")

const { isLoggedIn } = require('./../middleware/session-guard');
const { isAdmin } = require('./../middleware/session-guard');
const { rolesChecker } = require("../utils/rolesChecker");
// const { myProfileCheck } = require("../utils/myProfileCheck");


router.get('/alumnos', isLoggedIn, (req, res) => {

    const role = rolesChecker(req.session.currentUser)

    User
        .find({ role: 'STUDENT' })
        .then(users => {
            res.render('students/list', { users, role })
        })
        .catch(err => console.log(err))
})

router.get('/alumnos/:id', isLoggedIn, (req, res) => {

    const { id } = req.params
    const check = (id === req.session.currentUser._id)

    User
        .findById(id)
        .then(student => {
            res.render('students/details', { student, check })
        })
        .catch(err => console.log(err))
})

//Update
router.get('/alumnos/:id/editar', isAdmin, (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(user => {
            res.render('auth/update', user)
        })
        .catch(err => console.log(err))
})

router.post('/alumnos/:id/editar', (req, res) => {
    const { username, email, profileImg, description } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description })
        .then(user => res.redirect('/alumnos'))
        .catch(err => console.log(err))
})

//Delete
router.post('/alumnos/:id/eliminar', (req, res) => {
    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/alumnos')
        })
        .catch(err => console.log(err))
})

router.post('/alumnos/:id/dev', (req, res) => {
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(user => res.redirect('/alumnos'))
        .catch(err => console.log(err))
})

router.post('/alumnos/:id/TA', (req, res) => {
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(user => res.redirect('/alumnos'))
        .catch(err => console.log(err))
})
module.exports = router
