const router = require("express").Router()

const { checkLoggedUser, checkRoles } = require("../middleware")

router.get('/panel', checkLoggedUser, checkRoles('PM'), (req, res) => {
    res.render('admin/admin-panel', req.session.currentUser)
})

module.exports = router