const express = require('express')
const { isLoggedIn, isLoggedOut, checkRoles, checkOwner } = require('../middlewares/route-guard')
const User = require('../models/User.model')
const router = express.Router()



router.get("/students", isLoggedIn, (req, res, next) => {

    User
        .find()
        .sort({ username: 1 })
        .then(users => {
            res.render('students/students-list', { users })
        })
        .catch(err => console.log(err))

})


router.get('/students/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM'
    }

    User
        .findById(id)
        .then(users => res.render('students/students-details', { users, userRole }))
        .catch(err => console.log(err))
})


router.get('/students/edit/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    //console.log(req.params)

    const { id } = req.params

    User
        .findById(id)
        .then(users => res.render('students/students-edit', users))
        .catch(err => console.log(err))
})


router.post('/students/edit/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { username, mail, profileImg, description } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, mail, profileImg, description })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))
})


router.post('/students/delete/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})



router.post('/students/mark-as-dev/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params

    User.findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))

})


router.post('/students/mark-as-ta/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))

})


router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render('students/students-profile', { users: req.session.currentUser })
})



router.get('/students/edit/:id', isLoggedIn, checkOwner, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(users => res.render('students/students-edit', users))
        .catch(err => console.log(err))
})





/* 
router.post('/students/edit/:id', isLoggedIn, checkOwner, (req, res, next) => {

    const { username, mail, profileImg, description } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, mail, profileImg, description })
        .then(() => res.redirect(`/students/students-profile`))
        .catch(err => console.log(err))
})
 */


module.exports = router