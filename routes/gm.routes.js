const express = require('express')
const router = express.Router()

const User = require('../models/user.model')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const {checkLoggedIn, checkRole} = require('../middleware/index')

router.get('/', checkLoggedIn, checkRole(['BOSS']), (req, res, next) => {
    User
        .find()
        .then(users => res.render('boss/index', {users}))
        .catch(err => next(new Error(err)))    
})


router.get('/create', checkLoggedIn, checkRole(['BOSS']), (req, res, next) => res.render('boss/create'))
router.post('/create', (req, res, next) => {

    const password = req.body.password
    
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    const {username, name, role} = req.body

    User
        .create({username, name, role, password: hashPass})
        .then(res.redirect('/general-manager'))
        .catch(err => next(new Error(err)))
})

router.post('/:id/delete', (req, res, next) => {

    const userID = req.params.id

    User
        .findByIdAndRemove(userID)
        .then(res.redirect('/general-manager'))
        .catch(err => next(new Error(err)))

})

module.exports = router