const router = require("express").Router()
const User = require('./../models/User.model')
const { isLoggedIn, checkRole, isOwnerOrPM } = require('./../middlewares/route-guards')

router.get('/', isLoggedIn, (req, res, next) => {
    User
        .find({ role: 'STUDENT' })
        .then(students => res.render('students/students-list', { students }))
        .catch(err => next(err))
})

router.post('/:id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

router.get('/:id/edit', isLoggedIn, isOwnerOrPM, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(student => res.render('students/students-edit', student))
        .catch(err => next(err))
})

router.post('/:id/edit', isLoggedIn, isOwnerOrPM, (req, res, next) => {
    const { email, username, profileImg, description, id } = req.body
    User
        .findByIdAndUpdate(id, { email, username, profileImg, description })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => next(err))
})


router.post('/:id/:role', isLoggedIn, checkRole("PM"), (req, res, next) => {
    const { id, role } = req.params
    User
        .findByIdAndUpdate(id, { role })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => next(err))
})


router.get('/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(student => res.render('students/students-details', {
            student,
            isPM: req.session.currentUser?.role === "PM",
            isUser: req.session.currentUser?._id === id
        }))
        .catch(err => next(err))
})




module.exports = router
