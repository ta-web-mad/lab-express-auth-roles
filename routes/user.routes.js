const router = require('express').Router()
const User = require('../models/User.model')
const bycript = require('bcryptjs')

const { isLoggedIn, checkRole } = require('../middleware/route-guard')

const saltRounds = 10

router.get('/', isLoggedIn, (req, res, next) => {
    User
        .find({ role: 'STUDENT' })
        .then(student => res.render('users/students', { student }))
        .catch(err => next(err))
})

router.get('/:student_id', isLoggedIn, (req, res, next) => {
    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => res.render('users/student-details', {
            student,
            isStud: student.role === 'STUDENT',
            isDev: student.role === 'DEV',
            isTa: student.role === 'TA',
            isPm: student.role === 'PM',
            isVisible: req.session.currentUser?.role === 'PM',
            isOwner: req.session.currentUser?._id.toString() === student._id.toString()
        }))
        .catch(err => next(err))
})

router.get('/:student_id/edit', checkRole('PM'), (req, res, next) => {
    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => res.render('users/edit', {
            student,
            is
        }))
        .catch(err => next(err))
})

router.post('/:student_id/edit', checkRole('PM'), (req, res, next) => {
    const { email, userPwd, username, profileImg, description } = req.body
    const { student_id } = req.params

    bycript
        .genSalt(saltRounds)
        .then(salt => bycript.hash(userPwd, salt))
        .then(passwordHash => User.findByIdAndUpdate(student_id, { username, email, password: passwordHash, profileImg, description }))
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})

router.post('/:student_id/delete', checkRole('PM'), (req, res, next) => {
    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

router.post('/:student_id/change-role', checkRole('PM'), (req, res, next) => {
    const { role } = req.body
    const { student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { role })
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})

module.exports = router