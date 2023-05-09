const express = require('express')
const router = express.Router()

const User = require('../models/User.model')

const { isLoggedIn, checkRoles, checkUser } = require('../middlewares/route-guards')

router.get('/', isLoggedIn, (req, res, send) => {


    User
        .find({ role: "STUDENT" })
        .select({ username: 1 })
        .sort({ username: 1 })
        .then(users => res.render('users/list-page', { users }))
        .catch(err => console.log(err))
})

router.get('/detalles/:user_id', isLoggedIn, (req, res, send) => {

    const { user_id } = req.params

    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
    }
    const userMercho = {
        isUser: req.session.currentUser?._id === user_id,
    }

    User
        .findById(user_id)
        .then(user => res.render('users/user-details', { user, userRole, userMercho }))
        .catch(err => console.log(err))
})

router.get('/detalles/editar/:user_id', isLoggedIn, checkUser, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('users/edit-page', user))
        .catch(err => console.log(err))
})

router.post('/detalles/editar/:user_id', isLoggedIn, checkRoles('PM'), (req, res, send) => {

    const { username, email, description } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { username, email, description })
        .then(() => res.redirect("/students"))
        .catch(err => console.log(err))
})

router.post('/detalles/developer/:user_id', isLoggedIn, checkRoles('PM'), (req, res, send) => {

    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { role: 'DEV' })
        .then(() => res.redirect("/students"))
        .catch(err => console.log(err))
})

router.post('/detalles/teacher-assistant/:user_id', isLoggedIn, checkRoles('PM'), (req, res, send) => {

    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { role: 'TA' })
        .then(() => res.redirect("/students"))
        .catch(err => console.log(err))
})


router.post('/detalles/eliminar/:user_id', isLoggedIn, checkRoles('PM'), (req, res, send) => {
    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})


module.exports = router