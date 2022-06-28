const router = require("express").Router()

const User = require("../models/User.model")

const { isLoggedIn } = require("./../middleware/route.guard")
const { checkRole } = require("./../middleware/route.guard")

const { isOwnerOrPM } = require('./../middleware/owner.guard')


//List

router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find()
        .then(students => {
            res.render('auth/students', { students })
        })
        .catch(err => console.log(err))

})

//Profile

router.get('/profile/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const isPM = req.session.currentUser.role === 'PM'

    User
        .findById(id)
        .then(student => {
            res.render('auth/profile', { student, isPM })
        })

        .catch(err => console.log(err))

})

//Delete user

router.post('/students/:id/delete', isLoggedIn, checkRole('PM'), (req, res) => {
    const { id } = req.params


    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))
})

//Update user

router.get('/students/:id/editar', isLoggedIn, isOwnerOrPM, (req, res) => {
    const { id } = req.params
    User
        .findById(id)
        .then(students => {
            res.render('auth/edit-user', students)
        })
        .catch(err => console.log(err))

})

router.post('/students/:id/editar', (req, res) => {

    const { id } = req.params
    const { username, email, description } = req.body

    User
        .findByIdAndUpdate(id, { username, email, description })
        .then(() => {
            res.redirect(`/profile/${id}`)
        })
        .catch(err => console.log(err))

})

module.exports = router

//EDIT ROL

router.post('/students/:id/editar/TA', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/students/:id/editar/DEV', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => {
            console.log(err)
        })
})