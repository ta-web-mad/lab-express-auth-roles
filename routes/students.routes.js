const router = require("express").Router()
const User = require("../models/User.model")

const { isLoggedIn, checkRole, checkActualUser } = require('./../middleware/route-guard')

router.get('/', isLoggedIn, (req, res) => {

    User
        .find({ role: 'STUDENT' })
        .then(student => res.render('students/students', { student }))
        .catch(err => console.log(err))

})

router.get('/:id', isLoggedIn, (req, res) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => res.render('students/students-details', {
            student,
            isPm: req.session.currentUser.role === 'PM',
            isUser: req.session.currentUser._id === id
        }))
        .catch(err => console.log(err))

})

router.get('/:id/editar', isLoggedIn, checkActualUser('PM'), (req, res) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => res.render('students/students-edit', { student, user: req.session.currentUser }))
        .catch(err => console.log(err))

})

router.post('/:id/editar', isLoggedIn, checkActualUser('PM'), (req, res) => {

    const { username, email, description } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, email, description })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

router.post('/:id/eliminar', isLoggedIn, checkRole('PM'), (req, res) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})

router.get('/:id/set-dev', isLoggedIn, checkRole('PM'), (req, res) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})

router.get('/:id/set-ta', isLoggedIn, checkRole('PM'), (req, res) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})



module.exports = router