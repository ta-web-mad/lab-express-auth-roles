const express = require('express')
const User = require('./../models/User.model')
const router = express.Router()
const { isLoggedIn, checkRole } = require('./../middleware/session-guard')
const { rolesChecker } = require('../utils/roles-checker')

// Students list

router.get('/students', isLoggedIn, (req, res, next) => {

    const roles = rolesChecker(req.session.currentUser)

    User
        .find()
        .then(students => {
            res.render('user/students', { students, roles })
        })
        .catch(err => console.log(err))
})


// One student details

router.get('/students/:id', isLoggedIn, (req, res, next) => {

    const roles = rolesChecker(req.session.currentUser)

    const { id } = req.params

    User
        .findById(id)
        .then(user => {
            res.render('user/details', { user, roles })
        })
        .catch(err => console.log(err))
})


// Update

router.get('/students/:id/edit', isLoggedIn, checkRole('PM'), (req, res) => {
    const { id } = req.params
    User
        .findById(id)
        .then(students => res.render('admin/update', students))
        .catch(err => console.log(err))
})

router.post('/students/:id/edit', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { email, username, image, description } = req.body
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { email, username, image, description })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))

})


// Delete

router.post('/students/:id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

module.exports = router


// Change role to DEV


router.post('/students/:id/change-role-DEV', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params
    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
})


// Change role to TA


router.post('/students/:id/change-role-TA', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
})