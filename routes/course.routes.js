const router = require('express').Router()

const User = require('./../models/User.model')
const Course = require('./../models/Course.model')

const { isLoggedIn, checkRole, checkOwner } = require('./../middleware/route-guard')

router.get('/', isLoggedIn, checkRole('TA'), (req, res) => {
    res.render('course/menu')
})

router.get('/crear', isLoggedIn, checkRole('TA'), (req, res) => {
    User
        .find({ role: "TA" })
        .then(ta => {
            res.render('course/create', { ta })
            console.log(user)
        })
        .catch(error => console.log(error))
})

router.post('/crear', isLoggedIn, checkRole('TA'), (req, res) => {

})

module.exports = router