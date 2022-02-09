const User = require("../models/User.model")

const router = require("express").Router()

const { isLogged } = require('../middleware/router.guard')
const { isPM } = require('../utils')

// Routes

// List students

router.get('/students', isLogged, (req, res, next) => {

    User
        .find({ roles: "STUDENT" })
        .then(students => res.render('students', { students }))
        .catch(err => next(err))

})

// Each student info

router.get('/student/:id', isLogged, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(students => res.render('students-details', { students, isPM: isPM(req.session.currentUser) }))
        .catch(err => next(err))
})

// Edit students

router.get('/student/:id/edit', isLogged, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(students => res.render('edit-student', { students, isPM: isPM(req.session.currentUser) }))
        .catch(err => next(err))
})

router.post('/student/:id/edit', isLogged, (req, res, next) => {

    const { id } = req.params
    const { username, email, profileImg, description, roles } = req.body


    User
        .findByIdAndUpdate(id, { username, email, profileImg, description, roles }, { new: true })
        .then(() => res.redirect(`/student/${id}`))
        .catch(err => next(err))
})

// Delete students           NO FUNCIONA EL BOTÓN DE ELIMINAR NO ENTIENDO POR QUÉ :(

router.post('/student/:id/delete', isLogged, (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndRemove(id)
        .then(() => res.render('/students', { isPM: isPM(req.session.currentUser) }))
        .catch(err => next(err))
})


// Change role

router.post('/student/:id/change/:role', (req, res, next) => {

    const { id } = req.params
    const { username, email, profileImg, description, roles } = req.body

    User
        .findByIdAndUpdate(id, req.body.roles)
        .then(() => res.render(`/student/${id}`, { isPM: isPM(req.session.currentUser) }))
        .catch(err => next(err))
})

module.exports = router