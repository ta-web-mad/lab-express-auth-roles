const express = require('express');
const { isLoggedIn, isLoggedOut, checkRole, editRole, editMyProfile } = require('../middlewares/route-guard');
const router = express.Router();
const User = require('./../models/User.model')

router.get('/users/students', isLoggedIn, (req, res, next) => {
    User
        .find({ role: 'STUDENT' })
        .then(users => {
            res.render('users/students', { users })
        })
        .catch(err => next(err))
})

router.get('/users/students/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(users => {
            const isPM = req.session.currentUser?.role === 'PM'
            const isMyId = req.session.currentUser?.id === id
            res.render('users/student-profile', {
                users, isPM, isMyId
            })
        })
        .catch(err => next(err))
})

//QUERIA AÑADIR UNA VISTA DE SOLO STAFF, PERO SOLO CONSEGUIA QUE SE VIESE UNO DE LOS 3 (PM, DEV O TA), PERO NO LOS 3.

// router.get('/users/staff-roles', isLoggedIn, (req, res, next) => {
//     const roles = [{ role: 'DEV' }, { role: 'TA' }, { role: 'PM' }]
//     User
//         .find(roles)
//         .then(users => {
//             res.render('users/staff-roles', { users })
//         })
//         .catch(err => next(err))
// })


//NO CONSIGO QUE LO EDITE EL USUARIO CON EL QUE LA ID COINCIDE
router.get('/edit/:id', isLoggedIn, editMyProfile, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('users/student-edit', user))
        .catch(err => next(err))
})

router.post('/edit/:id', isLoggedIn, editMyProfile, checkRole('PM'), (req, res, next) => {
    const { id } = req.params
    const { username, profileImg, description, email, role } = req.body

    User
        .findByIdAndUpdate(id, { username, profileImg, description, email, role })
        .then(user => res.redirect(`/users/students/${id}`))
        .catch(err => next(err))
})

router.post('/eliminar/:id', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/users/students'))
        .catch(err => next(err))
})


router.post('/edit-role/:id/:role', isLoggedIn, checkRole('PM'), editRole, (req, res, next) => {
    const { id, role } = req.params

    User
        .findByIdAndUpdate(id, { role })
        .then(() => res.redirect('/users/students'))
        .catch(err => res.redirect(`/users/students/${id}`))
})





module.exports = router