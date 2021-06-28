const router = require("express").Router()

const { checkLoggedUser, checkRoles } = require("../middleware")

router.get('/panel', checkLoggedUser, checkRoles('ADMIN'), (req, res) => {
    res.render('admin/admin-panel', req.session.currentUser)
})

module.exports = router