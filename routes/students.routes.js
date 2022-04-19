const router = require("express").Router()

const mongoose = require('mongoose')

const { isLoggedIn, checkRole } = require('./../middleware/route-guard')

const User = require('../models/User.model')

router.get("/list", isLoggedIn, (req, res, next) => {
    User
        .find()
        .then(users => res.render("students/students-list", { users }))
        .catch(err => console.log(err))
})

router.get('/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const isPM = req.session.currentUser.role === 'PM'
    const isTheUser = req.session.currentUser._id === id

    if (mongoose.Types.ObjectId.isValid(id)) {
        User
            .findById(id)
            .then(user => {
                res.render('students/profile', { user, isPM, isTheUser })
            })
            .catch(err => console.log(err))
    } else {
        res.redirect('/')
    }
})

router.get('/:id/edit', isLoggedIn, (req, res, next) => {


    const { id } = req.params

    if (mongoose.Types.ObjectId.isValid(id)) {
        if (checkRole('PM') || id === req.session.currentUser._id) {
            User
                .findById(id)
                .then(user => {

                    res.render('students/edit-student', user)
                })
                .catch(err => console.log(err))
        } else {
            res.render('/list', { errorMessage: 'No es tu perfil!' })
        }
    } else {
        res.redirect('/')
    }

});

router.post('/:id/edit', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    const { username, email, profileImg, description, role } = req.body

    if (checkRole('PM') || id === req.session.currentUser._id) {
        User
            .findByIdAndUpdate(id, { username, email, profileImg, description, role })
            .then(() => {

                res.redirect('/students/list')
            })
            .catch(err => console.log(err))
    } else {
        res.render('students/students-list', { errorMessage: 'No es tu perfil!' })
    }

});

router.post('/:id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students/list'))
        .catch(err => console.log(err))



});

router.post('/:id/makeTA', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    const role = 'TA'

    User
        .findByIdAndUpdate(id, { role })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))

});

router.post('/:id/makeDEV', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    const role = 'DEV'

    User
        .findByIdAndUpdate(id, { role })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))

});


module.exports = router
