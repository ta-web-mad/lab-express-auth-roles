const router = require("express").Router()
const { isLoggedin, checkRole } = require("../middleware/route-guard")
const User = require("../models/User.model")


//Students
router.get('/students', (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then(students => res.render('users/students-list', { students }))
        .catch(err => next(err))
})

router.get('/students/:user_id', isLoggedin, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('users/student-details', {
                user: user,
                isPM: req.session.currentUser?.role === 'PM',
                isOwner: req.session.currentUser?._id === user_id
            })
        })
        .catch(err => next(err))
})

//Staff list
router.get('/staff', (req, res, next) => {

    User
        .find({ role: { $ne: 'STUDENT' } })
        // .then(staff => res.send({ staff }))
        .then(staff => res.render('users/staff-list', { staff }))
        .catch(err => next(err))
})


//User edit form render
router.get('/students/:user_id/edit', isLoggedin, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('users/edit-student', {
                user: user,
                isPM: req.session.currentUser?.role === 'PM',
                isOwner: req.session.currentUser?._id === user_id
            })
        })
        .catch(err => next(err))
})

//User edit form hanlder

router.post('/students/:user_id/edit', isLoggedin, (req, res, next) => {

    // const { user_id } = req.params
    const { user_id, email, username, profileImg, description, role } = req.body

    User
        .findByIdAndUpdate(user_id, { email, username, profileImg, description, role })
        // .then(user => res.send(user))
        .then(user => res.redirect(`/students/${user._id}`))
        .catch(err => next(err))
})

//Delete user

router.post('/students/:user_id/delete', isLoggedin, checkRole('PM'), (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

module.exports = router