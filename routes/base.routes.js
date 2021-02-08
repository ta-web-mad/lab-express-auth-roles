const express = require('express')
const router = express.Router()

const {checkLoggedIn} = require('../middleware/index')

// Endpoints
router.get('/', (req, res) => res.render('index'))

router.get('/profile', checkLoggedIn, (req, res) => res.render('profile', req.user))


module.exports = router
