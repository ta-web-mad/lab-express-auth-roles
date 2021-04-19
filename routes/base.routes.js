const express = require('express')
const router = express.Router()

// Endpoints
router.get('/', (req, res) => {
    //console.log(req.session.currentUser)
    res.render('pages/index', req.session.currentUser)
})

module.exports = router