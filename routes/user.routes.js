const router = require("express").Router()
//const express = require('express')
//const router = express.Router()
//^^^ IT'S THE SAME

const User = require('../models/User.model')

const { isLoggedIn, checkRoles, checkOwnership } = require('../middlewares/route-guard')

router.get("/students", isLoggedIn, (req, res, next) => {

    const userRole = {
        isPM: req.session.currentUser?.role === 'PM'
    }
    const currentUserId = req.session.currentUser?._id

    User
        .find()
        .select({ username: 1 })
        .sort({ username: 1 })
        .then(users => {
            users.forEach(user => {
                const pageUserId = user._id
                if (currentUserId == pageUserId) {
                    user.isOwner = true
                } else {
                    user.isOwner = false
                }
                if (user.isOwner || userRole.isPM) {
                    user.canEdit = true
                } else {
                    user.canEdit = false
                }
            })
            res.render("users/students", { users, userRole, currentUserId })
        })
        .catch(err => console.log('---> user error', err))
})

router.get('/students/:user_id', isLoggedIn, (req, res) => {

    const { user_id } = req.params
    const currentUserId = req.session.currentUser?._id

    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
    }

    User
        .findById(user_id)
        .then(user => {
            const pageUserId = user._id
            if (currentUserId == pageUserId) {
                user.isOwner = true
            } else {
                user.isOwner = false
            }
            if (user.isOwner || userRole.isPM) {
                user.canEdit = true
            } else {
                user.canEdit = false
            }
            res.render('users/student-profile', { user, userRole, currentUserId })
        })

        .catch(err => console.log('---> error displaying student profile', err))
})

router.get('/students/edit/:user_id', isLoggedIn, checkOwnership(checkRoles), (req, res, next) => {

    const { user_id } = req.params

    const userRole = {
        isPM: req.session.currentUser?.role === 'PM'
    }

    User
        .findById(user_id)
        .then(user => res.render('users/student-edit', { user, userRole }))
        .catch(err => console.log('---> error displaying student edit page', err))
})

router.post('/students/edit/:user_id', isLoggedIn, checkOwnership(checkRoles), (req, res, next) => {
    const { username, description, role, email, profileImg } = req.body
    const { user_id } = req.params
    User
        .findByIdAndUpdate(user_id, { username, description, role, email, profileImg })
        .then(() => res.redirect(`/students/${user_id}`))
        .catch(err => console.log('---> error editing student', err))
})

router.post('/students/delete/:user_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect(`/students`))
        .catch(err => console.log('--> error deleting', err))
})

router.post('/students/makeDEV/:user_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { user_id } = req.params
    User
        .findByIdAndUpdate(user_id, { role: 'DEV' })
        .then(() => res.redirect(`/students/${user_id}`))
        .catch(err => console.log('---> error editing student', err))
})

router.post('/students/makeTA/:user_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { user_id } = req.params
    User
        .findByIdAndUpdate(user_id, { role: 'TA' })
        .then(() => res.redirect(`/students/${user_id}`))
        .catch(err => console.log('---> error editing student', err))
})



module.exports = router
