
const router = require("express").Router()
const bcrypt = require('bcrypt')
const app = require("../app")

const User = require('./../models/User.model')





router.get('/students', (req, res) => {

    User
        .find()
        .select('username')
        .then(student => res.render('user/user-list', { student }))
        .catch(err => console.log(err))
})

// Students details
router.get('/students/:student_id', (req, res) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(userDesription => res.render('user/user-profile', userDesription))
        .catch(err => console.log(err))
})



module.exports = router