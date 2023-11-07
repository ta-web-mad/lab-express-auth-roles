const router = require("express").Router()

const User = require('../models/User.model')

const { isLoggedIn, checkRoles } = require('../middleware/route-guard')

router.get('/', isLoggedIn, (req, res, next) => {
    User
        .find({ role: 'STUDENT'})
        .then((students) => {
            res.render('user/student/list', { students })
        }
        )
        .catch(error => next(error))
})

router.get('/detalles/:_id', isLoggedIn, (req, res, next) => {
    const { _id } = req.params
    User
        .findById(_id)
        .then((student) => {
            res.render('user/student/detail', { student, isPmOrOwner: req.session.currentUser.role === 'PM' || req.session.currentUser._id === _id, isPm: req.session.currentUser.role === 'PM' })
        })
        .catch(error => next(error))
})

router.get('/editar/:_id', isLoggedIn, checkRoles(true, 'PM'), (req, res, next) => {
    const { _id } = req.params

    User
        .findById(_id)
        .then((student) => {
            res.render('user/student/edit', {student, isPm: req.session.currentUser.role === 'PM'})
        })
        .catch(error => next(error))
})

router.post('/editar/:_id', isLoggedIn, checkRoles(true, 'PM'), (req, res, next) => {
    let { username, profileImg, description } = req.body
    const { _id } = req.params

    if (username.length === 0) {
        res.render('user/student/edit', { errorMessage: 'Completa el username' })
        return
    }

    if (profileImg.length === 0) {
        profileImg = 'https://i.stack.imgur.com/l60Hf.png'
    }
    
    if (description.length === 0) {
        description = 'No existe descripción.'
    }
    

    User
        .findOne({ username })
        .then((user) => {
            if (user._id === _id) {
                User
                    .findByIdAndUpdate(_id, { username, profileImg, description})
                    .then((successUser) => {
                        res.redirect(`/alumnos/detalles/${_id}`)
                    })
            }
            else {
                User
                    .findById(_id)
                    .then((student) => {
                        console.log(student)
                        res.render('user/student/edit', { student, errorMessage: 'Username duplicado' })
                    })
            }
        })
        .catch(error => next(error))
})

router.post('/editar/rol/:_id', isLoggedIn, checkRoles(false, 'PM'), (req, res, next) => {
    const { role } = req.body
    const { _id } = req.params

    User
        .findByIdAndUpdate(_id, { role })
        .then((updatedUser) => {
            res.redirect(`/alumnos/detalles/${_id}`)
        })
        .catch(error => next(error))
})

router.post('/eliminar/:_id', isLoggedIn, checkRoles(false, 'PM'), (req, res, next) => {
    const { _id } = req.params

    User
        .findByIdAndDelete(_id)
        .then((user) => {
            res.redirect('/alumnos')
        })
        .catch(error => console.log(error))
})
  
module.exports = router