const router = require("express").Router()
const {isLoggedIn} = require ("../middlewares")
const User = require('../models/User.model')

router.get('/', isLoggedIn,(req, res) => {
    User
        .find({role: 'STUDENT'})
        .select('username')
        .then((students) => res.render('students/students', {students}))
        .catch(err => console.log(err))
});

router.get("/:id", isLoggedIn,(req, res) => {
    const { id } = req.params

    User
    .findById(id)
    .then((student) => res.render('students/students-profile', {student}))
    .catch(err => console.log(err))
});

module.exports = router