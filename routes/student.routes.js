const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRole } = require('../middelware/auth')

router.get('/students', isLoggedIn, (req, res, next) => {
    const isStudent = req.session.currentUser.roles === 'STUDENT'
    const isPm = req.session.currentUser.roles === 'PM'
    User
        .find()
        .then(user => {
            res.render('students/students', { user, isStudent, isPm })
        })
})

router.get('/students/:id', (req, res, next) => {
    const isPm = req.session.currentUser.roles === 'PM'
    const isMe = req.session.currentUser._id === req.params.id
    const { id } = req.params
    User
        .findById(id)
        .then(user => {
            res.render('students/students-detail', { user, isPm, isMe })
        })
        .catch(err => console.log(err))

})

router.get('/student/:id/edit-student', (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(user => {
            res.render('students/edit-students', user)
        })

})



router.post('/student/:id/edit-student', (req, res, next) => {
    const { username, email, profileImg, description } = req.body
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { username, email, profileImg, description })
        .then(() => {
            res.redirect('/')
        })

})

router.get("/student/:id/delete", checkRole("PM"), (req, res) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect("/students")
        })

})




router.post('/student/:id/edit', (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(user => {
            res.render('students/edit-student-status', user)


        })

})




router.post('/students/:id/roles', (req, res) => {
    const { roles } = req.body
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { roles })
        .then(() => {
            res.redirect('/')

        })
})




module.exports = router