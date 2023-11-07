const router = require('express').Router()
const User = require('./../models/User.model')

const { isLoggedIn, checkRole } = require('./../middleware/route-guard')

router.get('/listado-estudiante', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res) => {
    User
        .find({ role: 'STUDENT' })
        .then(student => {
            res.render('user/students-list', {
                student: student,
                isPM: req.session.currentUser.role === 'PM'
            })
        })
        .catch(error => console.log(error))
})

router.get('/student/:id', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res) => {

    const { id } = req.params
    User
        .findById(id)
        .then(student => {
            res.render('user/student-profile', {
                student,
                isPM: req.session.currentUser.role === 'PM'
            })
        })
        .catch(error => console.log(error))
})

router.get('/student/:id/edit', isLoggedIn, checkRole('PM'), (req, res) => {
    const { id } = req.params
    User
        .findById(id)
        .then((student) => {
            res.render('user/student-edit', student)
        })
        .catch(error => error)
})

router.post('/student/:id/edit', isLoggedIn, checkRole('PM'), (req, res) => {
    const { id } = req.params
    const { username, email, profileImg, description, role } = req.body
    User
        .findByIdAndUpdate(id, { username, email, profileImg, description, role })
        .then(() => {
            res.redirect('/listado-estudiante')
        })
        .catch(error => error)
})

router.post('/student/:id/delete', isLoggedIn, checkRole('PM'), (req, res) => {
    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/listado-estudiante'))
        .catch(error => console.log(error))
})

router.post('/student/:id/dev', isLoggedIn, checkRole('PM'), (req, res) => {
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect('/listado-estudiante'))
        .catch(error => console.log(error))
})

router.post('/student/:id/ta', isLoggedIn, checkRole('PM'), (req, res) => {
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect('/listado-estudiante'))
        .catch(error => console.log(error))
})

router.get('/edit-your-profile', isLoggedIn, checkRole('STUDENT'), (req, res) => {


    User
        .findById(req.session.currentUser._id)
        .then(user => {
            res.render('user/edit-profile', user)
        })
        .catch(error => console.log(error))

})

router.post('/edit-your-profile/:id', isLoggedIn, checkRole('STUDENT'), (req, res) => {

    const { id } = req.params
    const { username, email, profileImg, description } = req.body
    User
        .findByIdAndUpdate(id, { username, email, profileImg, description })
        .then(() => res.redirect('/listado-estudiante'))
        .catch(error => console.log(error))
})

module.exports = router

