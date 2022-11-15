const router = require("express").Router()
const User = require('./../models/User.model')

const { isLoggedIn, checkEdit, isLoggedOut, checkRoles } = require('./../middleware/route-guard')

// Students list
router.get('/', isLoggedIn, (req, res) => {

    User
        .find({ role: 'STUDENT' })
        .sort({ username: 1 })
        .select({ username: 1, email: 1, profileImg: 1, description: 1 })
        .then(user => {
            res.render('students/list-students', { user })
        })
        .catch(err => console.log(err))
})

// Students details
router.get('/:student_id', isLoggedIn, (req, res) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(studentFromDB => {
            res.render('students/student-details', {
                studentFromDB,
                isPM: req.session.currentUser.role === 'PM',
                isCurrentUser: req.session.currentUser._id === student_id
            })
        })
        .catch(err => console.log(err))
})

// Edit Item (Render)
router.get('/:user_id/edit', isLoggedIn, checkEdit, (req, res) => {
    const { user_id } = req.params
    User
        .findById(user_id)
        .then(user => {
            res.render('students/user-edit', user)
        })
        .catch(err => console.log(err))
})

// Edit Item (Handle)
router.post('/:user_id/edit', isLoggedIn, checkEdit, (req, res) => {
    const { username, email, profileImg, description } = req.body
    const { user_id } = req.params
    User
        .findByIdAndUpdate(user_id, { username, email, profileImg, description })
        .then(() => res.redirect(`/students/${user_id}`))
        .catch(err => {
            console.log(err)
            res.redirect(`/students/${user_id}/edit`)
        })
})

// Delete Item
router.post('/:user_id/delete', isLoggedIn, (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

})


// Make DEV or TA
router.post('/:user_id/updaterole/:role', (req, res) => {
    const { role, user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { role })
        .then(() => res.redirect('/students'))
        .catch(err => {
            console.log(err)
            res.redirect(`/students/${user_id}/edit`)
        })
})


module.exports = router