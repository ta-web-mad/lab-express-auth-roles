const router = require("express").Router()

const User = require('./../models/user.model')

const { checkLoggedUser, checkRoles } = require('./../middleware')

router.get('/mi-perfil', checkLoggedUser, (req, res) => {
    const loggedUser = req.session.currentUser
    res.render('user/user-profile', loggedUser)
})

router.get('/students', checkLoggedUser, (req, res) => {

    const isPM = req.session.currentUser?.role === 'PM'
    User
        .find({ role: "STUDENT" })
        // .select('name')
        .then(users => res.render('user/students', { users, isPM }))
        .catch(err => console.log(err))
})

router.get('/student/:user_id', (req, res) => {

    const { user_id } = req.params
    const loggedUser = req.session.currentUser


    // const isAdmin = req.session.currentUser?.role === 'ADMIN'

    User
        .findById(user_id)
        .then(user => res.render('user/user-profile', { user, loggedUser }))
        .catch(err => console.log(err))
})

router.get('/editar', checkLoggedUser, checkRoles('PM'), (req, res) => {

    const { user_id } = req.query

    User
        .findById(user_id)
        .then(user => res.render('user/edit-profile', user))
        .catch(err => console.log(err))
})

router.post('/editar', checkLoggedUser, checkRoles('PM'), (req, res) => {

    const { user_id } = req.query
    const { name, description, profileImg } = req.body

    User
        .findByIdAndUpdate(user_id, { name, description, profileImg })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})
module.exports = router

