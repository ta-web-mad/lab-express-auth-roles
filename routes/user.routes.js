const router = require("express").Router()
const { isLoggedIn, checkRole } = require('../middlewares/route-guard')
const User = require("../models/User.model")
const Course = require('../models/Course.model')


// Students List
router.get("/students", isLoggedIn, checkRole('STUDENT', 'DEV', 'TA', 'PM'), (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then(users => {
            res.render("users/students/list", {
                users: users,
                isSTUDENT: req.session.currentUser?.role === 'STUDENT',
                isDEV: req.session.currentUser?.role === 'DEV',
                isTA: req.session.currentUser?.role === 'TA',
                isPM: req.session.currentUser?.role === 'PM'
            })
        })
        .catch(err => next(err))
})


// Student Profile
router.get('/students/:_id/profile', isLoggedIn, checkRole('STUDENT', 'DEV', 'TA', 'PM'), (req, res, next) => {
    const { _id } = req.params

    User
        .findById(_id)
        .then(user => {
            res.render('users/students/profile', {
                user: user,
                isOWNER: req.session.currentUser._id === _id,
                isSTUDENT: req.session.currentUser?.role === 'STUDENT',
                isDEV: req.session.currentUser?.role === 'DEV',
                isTA: req.session.currentUser?.role === 'TA',
                isPM: req.session.currentUser?.role === 'PM'
            })
        })
        .catch(err => next(err))
})


// Student Edit Profile
router.get('/students/:_id/edit', isLoggedIn, checkRole('STUDENT', 'DEV', 'TA', 'PM'), (req, res, next) => {

    console.log('entro aqui??')
    const { _id } = req.params

    User
        .findById(_id)
        .then(user => {
            res.render('users/students/edit', {
                user: user,
                isOWNER: req.session.currentUser._id === _id,
                isDEV: req.session.currentUser?.role === 'DEV',
                isTA: req.session.currentUser?.role === 'TA',
                isPM: req.session.currentUser?.role === 'PM'
            })
        })
        .catch(err => next(err))
})

// Edit form handler
router.post('/students/edit', isLoggedIn, checkRole('DEV', 'TA', 'PM'), (req, res, next) => {

    const { username, email, profileImg, description, role, _id } = req.body

    User
        .findByIdAndUpdate(_id, { username, email, profileImg, description, role })
        .then(user => res.redirect(`/students/${_id}/profile`))
        .catch(err => next(err))
})

//Students Delete
router.post('/students/:_id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { _id } = req.params

    User
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

//Students Role
router.post('/students/:_id/profile/:role', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { role, _id } = req.params

    User
        .findByIdAndUpdate(_id, { role })
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})



module.exports = router



    // .then(users => {
    //     res.render("user/students/list", {
    //         users: users,
    //         isDEV: req.session.currentUser?.role === 'DEV',
    //         isTA: req.session.currentUser?.role === 'TA',
    //         isPM: req.session.currentUser?.role === 'PM'
    //     })
    // })