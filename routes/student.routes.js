const router = require("express").Router()
const User = require("./../models/User.model")

const { isLoggedIn } = require('./../middleware/session-guard')


router.get('/students', isLoggedIn, (req, res, next) => {

    User

        .find()
        .then(students => res.render('student/list', { students }))
        .catch(err => console.log(err))
})

router.get('/students/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const isPM = req.session.currentUser.role === "PM"

    User

        .findById(id)
        .then(student => res.render('student/student-profile', { student, isPM }))
        .catch(err => console.log(err))

})

router.get('/students/:id/edit', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    User

        .findById(id)
        .then(students => res.render('student/edit-student', { students }))
        .catch(err => console.log(err))

})

router.post('/students/:id/edit', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const { username, email, description } = req.body

    User

        .findByIdAndUpdate(id, { username, email, description })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})

router.post('/students/:id/edit/:role', isLoggedIn, (req, res, next) => {
    const { id, role } = req.params


    User

        .findByIdAndUpdate(id, { role })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})
router.post('/students/:id/delete', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})


module.exports = router