const express = require('express')
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard')
const router = express.Router()

const User = require("../models/User.model")

//list
router.get('/students', isLoggedIn, (req, res, next) => {

    User.find()
        .then(users => {
            res.render('students/students-list', { users })
        })
        .catch(err => console.log(err))

})

//profile
router.get('/students/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM'
    }

    const userStudent = {
        isUser: req.session.currentUser?._id === id
    }

    User
        .findById(id)
        .then(user => res.render('students/student-profile', { user, userRole, userStudent }))
        .catch(err => console.log(err))

})


//edit (render)
router.get('/students/:id/edit', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(users => res.render('students/student-edit', users))
        .catch(err => console.log(err))

})

//edit (handler) 
router.post("/students/:id/edit", isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {

    const { username, email, profileImg, description } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

router.post('/students/dev/:id', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

router.post('/students/ta/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

//delete
router.post('/students/:id/delete', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

})


module.exports = router