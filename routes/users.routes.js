const router = require("express").Router()
// const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
// const saltRounds = 10

const { isLoggedIn, checkRole } = require('../middlewares/route-guard')

router.get('/listado', (req, res, next) => {

    User
        .find()   // Devuelve un array
        .then(users => res.render('students/list', { users }))
        .catch(err => console.log(err))
})

// Render students details
router.get('/alumnos/:user_id', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res, next) => {

    const { user_id } = req.params
    console.log(user_id)
    console.log(req.params)

    User
        .findById(user_id)
        .then(user => {
            res.render('students/details', {
                user,
                isPM: req.session.currentUser?.role === 'PM'
            })
        })
        // .then(user => res.render('students/details', user))
        .catch(err => console.log(err))
})

// Edit form render
router.get('/editar/:user_id', isLoggedIn, checkRole('PM'), (req, res) => {    // ROLES: acceso por rol

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('students/edit', user))
        .catch(err => console.log(err))
})


// Edit form handler
router.post('/editar', isLoggedIn, checkRole('PM'), (req, res) => {         // ROLES: acceso por rol

    const { username, email, description, profileImg, user_id } = req.body

    User
        .findByIdAndUpdate(user_id, { username, email, description, profileImg })
        .then(user => res.redirect(`/alumnos/${user._id}`))
        .catch(err => console.log(err))
})


// Delete user
router.post('/eliminar/:user_id', isLoggedIn, checkRole('PM'), (req, res) => {          // ROLES: acceso por rol

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/listado'))
        .catch(err => console.log(err))
})


module.exports = router
