const express = require('express')
const router = express.Router()
const User = require('./../models/user.model')

const { checkLoggedIn, checkRole } = require('./../middleware')
const { isBoss } = require('./../utils')

// Endpoints
router.get('/', (req, res) => res.render('index'))

router.get('/boss-page', checkLoggedIn, checkRole('BOSS'), (req, res) => {
    User
        .find()
        .then(users => {
            res.render('auth/boss-page', { users })
        })
        .catch(err => console.log(err))
})


router.post('/boss-age', (req, res) => {
    //He probado ya de todo, ayer me pasó igual, me estanqué en delete...
    User
        .deleteOne()
        .then(users => res.render('/boss-page'))
        .catch(err => console.log(err))
})

router.get('/dev-page', checkLoggedIn, checkRole('BOSS', 'DEV'), (req, res) => res.render('auth/dev-page'))


module.exports = router