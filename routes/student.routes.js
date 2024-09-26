const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require('../middleware/route-guard');


router.get('/students', (req, res, next) => {

    User
        .find()
        .select({ username: 1 })
        .then(students => {
            res.render('students/list', { students })
        })
        .catch(err => console.log(err))

})

router.get('/students/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => {
            res.render('students/details', {
                student, isPM: req.session.currentUser.role === 'PM',
                isStudent: req.session.currentUser._id === id
            })
        })
        .catch(err => console.log(err))

})

router.get('/students/edit/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => {
            res.render('students/edit', { student })
        })
        .catch(err => console.log(err))
})


router.post('/students/edit/:id', isLoggedIn, (req, res, next) => {

    const { username, email, description, profileImg } = req.body

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, email, description, profileImg })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

router.post('/students/delete/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})

router.post('/students/dev/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})

router.post('/students/ta/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})



module.exports = router
