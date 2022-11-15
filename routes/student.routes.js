const User = require("../models/User.model")
const router = require("express").Router()

const { isLoggedIn, isLoggedOut, checkRoles } = require('./../middleware/route-guard')

router.get("/list", (req, res, next) => {

    User
        .find()
        .select({ username: 1 })
        .then(students => {
            res.render("user/students", { students })
        })
        .catch(err => console.log(err))
})

router.get('/student-profile/:user_id', isLoggedIn, (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then((students) => {
            res.render('user/student-profile', {
                students,
                isPM: req.session.currentUser.role === 'PM'
            })
        })
        .catch(err => console.log(err))
})

router.get('/student/edit/:user_id', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then((students) => {
            res.render('user/students-edit', {
                students,
                isPM: req.session.currentUser.role === 'PM'
            })
        })
        .catch(err => console.log(err))
})

router.post('/student/edit/:user_id', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { username, email, profileImg, description, role } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { username, email, profileImg, description, role })
        .then(() => res.redirect(`/students/student-profile/${user_id}`))
        .catch(err => console.log(err))
})

router.post('/student/delete/:user_id', (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/students/list'))
        .catch(err => console.log(err))

})

module.exports = router