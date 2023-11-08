const router = require('express').Router()
const User = require('../models/User.model')
const { isLoggedIn, checkRole, isOwner } = require('../middleware/route.guard')

router.get('/', isLoggedIn, (req, res, next) => {

    const { role } = req.query

    User
        .find({ role: "STUDENT" })
        .then(students => {
            res.render('users/students', { students })
        })
        .catch(err => next(err))
})

router.get('/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => {
            res.render('users/student-detail', {
                student: student,
                isPM: req.session.currentUser.role === 'PM',
                isOwner: id === req.session.currentUser._id
            }
            )
        })
        .catch(err => next(err))
})

router.get('/edit/:id', isLoggedIn, isOwner, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => res.render('users/student-edit', {
            student: student,
            isOwner: id == req.session.currentUser._id,
            isPM: req.session.currentUser.role === "PM"
        }))
        .catch(err => next(err))

})

router.post('/edit/:id', isLoggedIn, isOwner, (req, res, next) => {


    const { id } = req.params
    const { username, email, profileImg, description, role } = req.body

    console.log("entramos en editar")

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description, role })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => next(err))
})

router.get('/edit/:id', isLoggedIn, checkRole("PM"), (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => res.render('users/student-edit', student))
        .catch(err => next(err))

})

router.post('/edit/:id', isLoggedIn, isOwner, (req, res, next) => {


    const { id } = req.params
    const { username, email, password, profileImg, description, role } = req.body

    console.log("entramos en editar")

    User
        .findByIdAndUpdate(id, { username, email, password, profileImg, description, role })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => next(err))
})


router.post('/delete/:id', isLoggedIn, checkRole("PM"), (req, res, next) => {
    console.log('Intenta eliminar')
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

module.exports = router