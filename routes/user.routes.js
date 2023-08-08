const express = require('express');
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard');
const router = express.Router();


router.get("/my-profile", isLoggedIn, (req, res) => {

    console.log('EL USUARIO LOGUEADO ES', req.session.currentUser)

    res.render("user/personalprofile", { loggedUser: req.session.currentUser });
})

// role based access
router.get("/panel-admin", isLoggedIn, checkRoles('STUDENT', 'PM'), (req, res) => {
    res.send('<h1>Estás aquí porque estás logueado y porque eres ADMIN jeje</h1>')
})

module.exports = router