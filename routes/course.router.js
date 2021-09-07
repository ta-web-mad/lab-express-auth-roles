
const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require("../models/User.model")

router.get('/', (req, res) => {
    res.render("courses/courses")
})

router.get('/create', (req, res) => {
    // console.log(" user_id" + req.session.currentUser._id)

    User
        .find()
        .then((users) => {
            res.render("courses/course-create", { users })

        })
        .catch(err => console.error(err))
})

router.post('/create', (req, res) => {
    console.log(req.body)
    console.log(req.params)

})
module.exports = router
