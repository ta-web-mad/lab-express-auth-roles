const router = require("express").Router()
const User = require("../models/User.model")

const { isLoggedIn, isLoggedOut, checkRoles } = require('../middlewares/route-guard')

//Add DEV Privilege

router.get('/changePriv/:student_id/Dev', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { student_id } = req.params
    const newRole = 'DEV'

    User
        .findByIdAndUpdate(student_id, { role: newRole })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

//Add TA privilege

router.get('/changePriv/:student_id/Ta', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { student_id } = req.params
    const newRole = 'TA'

    User
        .findByIdAndUpdate(student_id, { role: newRole })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})



module.exports = router