const express = require('express')
const User = require('../models/user.model')
const router = express.Router()

const { checkRoles, isLoggedIn } = require('./../middlewares')

router.get('/panel', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    User
        .find({ role: "STUDENT" })
        .then(studentRole=> res.render('pages/boss/panel', { studentRole}))
        .catch(err => console.log('Error!', err))
})

router.post('/edit/:id', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const { role } = req.body

    User
        .findByIdAndUpdate(req.params.id, { role })
        .then(() => res.redirect('/admin/panel'))
        .catch(err => console.log('Error!', err))
})


module.exports = router