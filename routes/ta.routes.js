const router = require("express").Router()
const Course = require('./../models/User.model')
const User = require('./../models/User.model')

const { isLoggedIn } = require('./../middleware/session-guard')
const { checkRole } = require('./../middleware/roles-checker')
const { checkOwnerOrPM } = require('./../middleware/same-user')

router.get('/courses/create', isLoggedIn, checkRole('TA'), (req, res, next) => {

    User
        .find({ $or: [{ role: 'TA' }, { role: 'DEV' }] })
        .select({ id: 1, username: 1 })
        .then(userData => {
            res.render('courses/create', { userData })
        })
        .catch(err => console.log(err))


})

module.exports = router