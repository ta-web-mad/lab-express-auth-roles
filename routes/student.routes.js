const router = require("express").Router()

const { isLoggedIn, checkRoles, checkStudentOrPM } = require('../middlewares/route-guard')
const User = require("../models/User.model")


//Students List
router.get('/', isLoggedIn, (req, res, next) =>

    User
        .find({ role: 'STUDENT' })
        .select({ username: 1, profileImg: 1 })
        .sort({ username: 1 })
        .then(userFromDB => {
            res.render('students/students', { userFromDB })
        })
        .catch(error => next(error))

)


//Student Details
router.get('/:id', (req, res, next) => {
    const { id } = req.params
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
        isOwner: req.session.currentUser?._id === id,
    }

    User
        .findById(id)
        .then(user => {
            console.log({ user, userRole })
            res.render('students/students-details', { user, userRole })
        })
        .catch(error => next(error))


})


//Student Edit Profile
router.get('/:id/edit', isLoggedIn, checkStudentOrPM, (req, res, next) => {
    const { id } = req.params
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
        isSTUDENT: req.session.currentUser?.role === 'STUDENT',
    }

    User
        .findById(id)
        .then(user => {
            res.render('students/students-edit', { user, userRole })
        })
        .catch(error => next(error))

})
router.post('/:id/edit', isLoggedIn, checkRoles('STUDENT', 'PM'), (req, res, next) => {
    const { id } = req.params
    const { email, username, profileImg, description } = req.body

    User
        .findByIdAndUpdate(id, { email, username, profileImg, description })
        .then(() => {
            res.redirect(`/students/${id}`)
        })
        .catch(error => next(error))

})


//Update ROLE to TA
router.post('/students/:id/ta', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => {
            res.redirect(`/students/${id}`)
        })
        .catch(err => console.log(err))
})


//Update ROLE to DEV
router.post('/students/:id/dev', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => {
            res.redirect(`/students/${id}`)
        })
        .catch(err => console.log(err))
})


module.exports = router
