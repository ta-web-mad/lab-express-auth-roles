const express = require('express')
const router = express.Router()

const { checkRoles, isLoggedIn } = require('./../middlewares')




router.get('/boss', isLoggedIn, checkRoles('BOSS'), (req, res) => {
    res.render('pages/boss/boss-page', { user: req.session.currentUser })
})

module.exports = router