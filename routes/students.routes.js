const router = require("express").Router()

const User = require('../models/User.model')

const { isLoggedIn } = require('./../middleware/session-guard')
const { viewerChecker } = require('./../middleware/viewer.checker')
const { rolesChecker } = require('./../utils/roles-checker')


//Students list and permission to edit just for admin and same logged in user
router.get('/students', isLoggedIn, (req, res) => {
    const roles = rolesChecker(req.session.currentUser)

    User
        .find()
        .then(users => {
            users.forEach(user => {
                if (user.id === req.session.currentUser._id) user.isSame = true
            })
            
            res.render('student/students-list', { users, roles })
        })
        .catch(err => console.log(err))
})

//Student profile
router.get('/students/:user_id', isLoggedIn, (req, res) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('student/student-profile', user)
            console.log(user.username)
        })
        .catch(err => console.log(err))
})

//Edit student and change role
router.get('/student/:user_id/edit', isLoggedIn, (req, res) => {

    const role = rolesChecker(req.session.currentUser)
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('student/student-edit', { user, role })
        })
        .catch(err => console.log(err))
})

router.post('/student/:user_id/edit', isLoggedIn, (req, res) => {
    const { username, description, email, profileImg, role } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { username, description, email, profileImg, role }, { new: true })
        .then(user => {
            res.render('student/student-profile', user)
        })
        .catch(err => console.log(err))
})

//Delete user
router.post('/students/:user_id/delete', isLoggedIn, (req, res) => {
    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

module.exports = router