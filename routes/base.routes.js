const express = require('express')
const router = express.Router()

// Endpoints
router.get('/', (req, res) => res.render('index'))

const { checkLoggedIn, checkRole } = require('./../middleware')
const { isAdmin } = require('./../utils')

// Endpoints
router.get('/', (req, res) => res.render('index'))

router.get('/profile', checkLoggedIn, (req, res) => res.render('private', { user: req.user, isAdmin: isAdmin(req.user) }))

router.get('/-page', checkLoggedIn, checkRole('BOSS','GM'), (req, res) => res.send('Authorized access to ' + req.user.role))
//router.get('/editor-page', checkLoggedIn, checkRole('DEV','TA'), (req, res) => res.send('Acceso autorizado porque eres ' + req.user.role))
//router.get('/guest-page', checkLoggedIn, checkRole('BOSS', 'DEV', 'TA', 'STUDENT', 'GUEST'), (req, res) => res.send('Acceso autorizado porque eres ' + req.user.role))


module.exports = router
