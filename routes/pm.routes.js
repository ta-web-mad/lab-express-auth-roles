
const router = require("express").Router()

const { checkLoggedUser, checkRoles } = require("../middleware")

router.get('pm/panel', checkLoggedUser, checkRoles('PM'), (req, res) => {
    res.render('pm/pm-panel', req.session.currentUser)
})

module.exports = router