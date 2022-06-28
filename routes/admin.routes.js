const router = require("express").Router()

const { checkRole } = require("../middleware/roles-checker")

const { isLoggedIn } = require('../middleware/session-guard')

router.get('/admin', isLoggedIn, checkRole('PM'), (req, res) => {
    res.render('admin/panel', { user: req.session.currentUser })
    
})

module.exports = router