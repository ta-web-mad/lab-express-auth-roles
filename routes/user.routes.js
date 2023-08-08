const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require('../middleware/route-guard')


router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then(students => res.render('student/student-list', { students }))
        .catch(error => next(error))
})

router.get('/details/:user_id', isLoggedIn, (req, res, next) => {
    const { user_id } = req.params

    const userRole = {

        isPm: req.session.currentUser?.role === 'PM'
    }

    const userId = req.session.currentUser._id
    const owner = userId === user_id

    User
        .findById(user_id)
        .then(student => res.render('student/student-details', { student, userRole, owner }))
        .catch(error => next(error))
})




module.exports = router