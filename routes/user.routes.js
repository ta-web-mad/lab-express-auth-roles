const express = require('express');
const router = express.Router();
const { isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard.js')


router.get("/myprofile", isLoggedIn, (req, res, next) => {
    res.render("./myprofile", { user: req.session.currentUser })
})




// router.get('/admin-panel', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {       // ROLES: acceso por rol
//     res.render("user/admin-page", { user: req.session.currentUser })
// })

module.exports = router