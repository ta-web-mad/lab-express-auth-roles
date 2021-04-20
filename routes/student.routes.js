const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')

const { isLoggedIn } = require('./../middlewares')
const {isStudent, isBoss} = require('./../utils')


router.get('/detalles/:student_id', (req, res) => {
     const { student_id} = req.params
User
    .findById(student_id)
    .then(theStudent => res.render('pages/auth/student-details', {theStudent, isStudent: isStudent(req.session.currentUser), isBoss: isBoss(req.session.currentUser)}))
    .catch(err => console.log('Error!', err))
})


module.exports = router
