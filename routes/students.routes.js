const router = require("express").Router()
const User = require('./../models/User.model')
const { isLoggedIn } = require('./../middleware/route-guard')

router.get('/', isLoggedIn, (req, res) => {

    User
        .find({ role: 'STUDENT' })
        .select({ username: 1 })
        .then((students) => {
            res.render('students/students-list', { students })
        })
})

router.get('/:students_id/details', isLoggedIn, (req, res) => {
    const { students_id } = req.params

    User
        .findById(students_id)
        .then(students => {
            res.render('students/students-details', {
                students,
                isPM: req.session.currentUser.role === 'PM',
                isCurrentUser: req.session.currentUser._id === students_id
            })
        })
        .catch(err => console.log(err))
})

router.get('/:students_id/edit', isLoggedIn, (req, res) => {
    const { students_id } = req.params
    User
        .findById(students_id)
        .then(students => {
            res.render('students/edit-students', students)
        })
        .catch(err => console.log(err))
})

router.post('/:students_id/edit', isLoggedIn, (req, res) => {
    const { username, email, description } = req.body
    const { students_id } = req.params
    User
        .findByIdAndUpdate(students_id, { username, email, description })
        .then(() => {
            res.redirect(`/students/${students_id}/details`)
        })
        .catch(err => console.log(err))
})

router.post('/:students_id/delete', isLoggedIn, (req, res) => {
    const { students_id } = req.params

    User
        .findByIdAndDelete(students_id)
        .then(() => res.redirect(`/`))
        .catch(err => console.log(err))
});

router.get('/:students_id/updaterole/:role', isLoggedIn, (req, res) => {
    const { role, students_id } = req.params

    User
        .findByIdAndUpdate(students_id, { role })
        .then(() => {
            res.redirect(`/students`)
        })
        .catch(err => console.log(err))
})



module.exports = router