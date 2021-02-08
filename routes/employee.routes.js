const express = require('express')
const router = express.Router()

const User = require('../models/user.model')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const {checkLoggedIn, checkRole} = require('../middleware/index')

router.get('/', checkLoggedIn, checkRole(['TA', 'DEV']), (req, res, next) => {

    User
        .find()
        .then(users => res.render('employee/index', {users}))
        .catch(err => next(new Error(err)))
    
})

router.get('/edit', checkLoggedIn, checkRole(['TA', 'DEV']), (req, res, next) => res.render('employee/edit', req.user))
router.post('/edit', (req, res, next) => {

    password = req.body.password

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)
    
    const{username, name} = req.body

    

    User
        .findByIdAndUpdate(req.user._id, {username, name, password: hashPass})
        .then(res.redirect('/'))
        .catch(err => next(new Error(err)))
        
})

module.exports = router