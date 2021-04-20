const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const User = require('./../models/user.model')
const { isLoggedIn } = require('./../middlewares')
const { isBoss, checkUser, checkUser2 } = require('./../utils')

router.get('/students', (req, res) => {
    User
        .find({ role: 'STUDENT' })
        .then(allStudents => {
            console.log(allStudents);
            res.render('pages/students', {
                allStudents, isBoss: isBoss(req.session.currentUser), user_id: checkUser(req.session.currentUser),
                helpers: {
                    idValidation: function (id1, id2) { return id1 === id2 },
                }
            })
        })
        .catch(err => console.log(err))
})

router.get('/students/:id', isLoggedIn, (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(student => res.render('pages/student-detail', { student, checkUser2: checkUser2(req.session.currentUser, id) }))
        .catch(err => console.log(err))

})

router.get('/elim/:id', (req, res) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(res.redirect('/students'))
        .catch(err => console.log(err))
})

router.get('/edit/:id', (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(student => res.render('pages/student-edit', student))
        .catch(err => console.log(err))
})

router.post('/student/:id', (req, res) => {


    const { id } = req.params
    let { username, role } = req.body

    User
        .findByIdAndUpdate(id, { username, role })
        .then(res.redirect('/students'))
        .catch(err => console.log(err))

})


module.exports = router