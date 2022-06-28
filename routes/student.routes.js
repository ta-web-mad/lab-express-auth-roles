const router = require("express").Router()

const User = require('./../models/User.model')

const { isLoggedIn } = require('./../middleware/session-guard')

const { rolesChecker } = require("../utils/roles-checker")

router.get("/students", isLoggedIn, (req, res) => {

    User
        .find()
        .then(students => {
            res.render('student/student-list', { students })
        })
        .catch(err => console.log(err))
})

router.get("/students/:id", isLoggedIn, (req, res) => {

    const roles = rolesChecker(req.session.currentUser)


    const { id } = req.params

    User
        .findById(id)
        .then(student => {
            res.render('student/student-profile', { student, roles })
        })
        .catch(err => console.log(err))


})

router.get('/students/:id/edit', (req, res) => {


    const { id } = req.params

    User
        .findById(id)
        .then(student => res.render('student/student-edit', student))
        .catch(err => console.log(err))
})

router.post('/students/:id/edit', (req, res) => {

    const { username, email, password, profileImg, description } = req.body

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, email, password, profileImg, description })
        .then(res.redirect(`/students`))
        .catch(err => console.log(err))
})


router.post('/students/:id/delete', (req, res) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))


})

module.exports = router