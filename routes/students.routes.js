const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const saltRounds = 10
const { isLoggedIn } = require('./../middleware/route.guard')
const { checkUserCurrent } = require('./../middleware/route.guard')

///const { findById } = require('./../models/User.model')
const User = require('./../models/User.model')

router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then(students => {

            res.render('students/students-page', { students })
        })
        .catch(err => next(err))

})
router.get('/students/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const isPm = req.session.currentUser.role === 'PM'

    const isCurrentUser = req.session.currentUser._id === id

    console.log(isCurrentUser)
    User
        .findById(id)
        .then(student => {
            res.render('students/student-details', { student, isPm, isCurrentUser })
        })
        .catch(err => next(err))
})



router.get('/students/:id/edit', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(oneStudent => {

            res.render('students/edit-students', oneStudent)
        })
        .catch(err => next(err))
})
router.post('/students/:id/edit', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const { username, email, userPwd, profileImg, description } = req.body

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(userPwd, salt))
        .then(hashedPassword => User.findByIdAndUpdate(id, { username, email, password: hashedPassword, profileImg, description }))
        .then(() => res.redirect('/students'))
        .catch(error => next(error));
})


router.post('/students/:id/delete', (req, res, next) => {

    const { id } = req.params
    User
        .findByIdAndDelete(id)

        .then(() => {
            res.redirect('/students')
        })
        .catch(err => next(err))
})


router.post('/students/:id/editToTA', (req, res, next) => {

    const { id } = req.params
    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(student => {
            res.redirect('/students')
        })
        .catch(err => next(err))
})

router.post('/students/:id/editToDEV', (req, res, next) => {

    const { id } = req.params
    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(student => {
            res.redirect('/students')
        })
        .catch(err => next(err))
})



module.exports = router