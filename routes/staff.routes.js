const router = require("express").Router()
const { isLoggedIn, checkRole } = require("../middlewares/route-guard")
const User = require("./../models/User.model")

router.get("/", isLoggedIn, (req, res, next) => {
    User
        .find({ role: { $ne: 'STUDENT' } })
        .then(staff => res.render("staff/staff-list", { staff }))
})


module.exports = router
