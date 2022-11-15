const router = require("express").Router()
const User = require('../models/User.model')

router.get("/list", (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .select({ username: 1 })
        .then(user => {
            res.render('user/student-list', { user })
        })

})

router.get("/details/:id", (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)

        .then(userDetails => {
            console.log(userDetails)
            res.render('user/student-details', userDetails)
        })
})

module.exports = router
