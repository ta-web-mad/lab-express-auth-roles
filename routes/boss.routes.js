const express = require('express')
const router = express.Router()

const { checkRoles, isLoggedIn } = require('./../middlewares')

// Endpoints
router.get('/panel', isLoggedIn, checkRoles('BOSS'), (req, res) => {
    res.render('pages/boss/panel-page', { user: req.session.currentUser })
})

module.exports = router