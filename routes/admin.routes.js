const { isLoggedIn, isAuthorized } = require("../middlewares/route-guard")
const checkRole = require("../utils/checkRole")
const router = require("express").Router()


router.get('/', isLoggedIn, isAuthorized("PM"), (req, res, next) => res.render('admin/admin-panel', { role: checkRole(req.session.currentUser) }))



module.exports = router
