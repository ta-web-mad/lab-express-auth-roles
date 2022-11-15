const router = require("express").Router()
const User = require('../models/User.model')
const { loggedIn, loggedOut, checkRoles } = require('../middleware/route-guard');

router.get("/list", loggedIn, (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .select({ username: 1 })
        .then(users => {
            console.log(users)
            res.render('user/student-list', { users })
        })

})

router.get("/details/:id", loggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)

        .then(userDetails => {
            console.log(userDetails)

            res.render('user/student-details', {
                userDetails,
                isPm: req.session.currentUser.role === 'PM',

                isStudent: req.session.currentUser.role === 'STUDENT' && req.session.currentUser._id === id
            })
        })
        .catch(err => console.log(err))
})

router.post('/delete/:student_id', (req, res) => {

    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect('/students/list'))
        .catch(err => console.log(err))

})

router.get('/edit/:student_id', (req, res, next) => {
    const { student_id } = req.params

    User
        .findByIdAndUpdate(student_id)
        .then(student => {
            res.render('user/edit-student', student)
        })
})

router.post('/edit/:student_id', (req, res, next) => {

    const { username, email, profileImg, description } = req.body
    const { student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { username, email, profileImg, description })
        .then(() => {
            res.redirect(`/students/details/${student_id}`)
        })
        .catch(err => console.log(err))

})

router.post('/edit-role/:student_id/:role', (req, res, next) => {
    const { student_id, role } = req.params

    User
        .findByIdAndUpdate(student_id, { role })
        .then(() => {
            res.redirect(`/students/details/${student_id}`)
        })
        .catch(err => console.log(err))

})

module.exports = router



