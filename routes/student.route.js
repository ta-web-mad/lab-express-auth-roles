const router = require("express").Router()
const User = require('./../models/User.model')

const { isLoggedIn } = require('../middleware/session-guard');
const { rolesChecker } = require("../utils/roles-checker");
const { checkRole } = require('../middleware/roles-checker')
const { isOwnerId } = require('../middleware/is-owner')

//students list

router.get('/students', isLoggedIn, checkRole('PM', 'Student'), (req, res, next) => {

    const roles = rolesChecker(req.session.currentUser)

    User
        .find()
        .then(student => res.render('students/list', { student, roles }))
        .catch(err => console.log(err))
})

//detalles

router.get('/students/:id/details', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const roles = rolesChecker(req.session.currentUser)


    User
        .findById(id)
        .then(student => res.render('students/details', { student, roles }))
        .catch(err => console.log(err))
})

// edicion

router.get('/students/:id/edit', isLoggedIn, isOwnerId, (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(students => res.render('students/update', students))
        .catch(err => console.log(err))
})

router.post('/students/:id/edit', isLoggedIn, isOwnerId, (req, res) => {
    const { username, email, description } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id)
        .then(students => res.render('students', students))
        .catch(err => console.log(err))
})

// delete

router.post('/students/:id/delete', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

//admin delete

router.post('/students/:id/delete', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

//roles
router.post('/students/:id/edit-role-TA', isLoggedIn, (req, res) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

router.post('/students/:id/edit-role-DEV', isLoggedIn, (req, res) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

module.exports = router