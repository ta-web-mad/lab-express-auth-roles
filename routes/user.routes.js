const router = require("express").Router()
const { route } = require("express/lib/application")
const { isLoggedIn, checkRole } = require("../middleware/route-guard")
const User = require('./../models/User.model')
const { isPM, isMyProfile } = require('./../utils')

router.get("/students", isLoggedIn, (req, res, next) => {
    // necesito los estudiantes
    User
        .find({ role: 'STUDENT' })
        .then(allStudents => res.render('student/students', { allStudents }))
        .catch(err => next(err))
})

router.get('/students/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const currentId = req.session.currentUser._id

    User
        .findById(id)
        .then(student => res.render('student/student-details', {
            student,
            isPM: isPM(req.session.currentUser),
            isMyProfile: isMyProfile(id, currentId)
        }))
        .catch(err => next(err))
})


// ruta PM edit student
router.get('/students/:id/edit', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res, next) => {
    const { id } = req.params

    if (isPM(req.session.currentUser) || isMyProfile(id, req.session.currentUser._id))
        User
            .findById(id)
            .then(student => res.render('student/student-PM-edit', student))
            .catch(err => next(err))
})

router.post('/students/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { email, username, profileImg, description } = req.body

    User
        .findByIdAndUpdate(id, { email, username, profileImg, description }, { new: true })
        .then(student => res.redirect(`/students/${id}`))
        .catch(err => next(err))
})


// ruta PM delete student
router.post('/students/:id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})


// ruta PM update student role
router.post('/students/:id/mk-dev', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'DEV' }, { new: true })
        .then(student => res.redirect('/students'))
        .catch(err => next(err))
})

router.post('/students/:id/mk-ta', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' }, { new: true })
        .then(student => res.redirect('/students'))
        .catch(err => next(err))
})




module.exports = router