const mongoose = require("mongoose")

module.exports = {

    isLoggedIn: (req,res,next) => {
        req.session.currentUser ? next() : res.render('auth/login',{errorMsg : 'LogIn to continue'})
    },
    checkRole: (role) => (req,res,next) => {

        role === req.session.currentUser.role ? next() : res.render('auth/login',{errorMsg : 'NO ROLES'})

    },
    checkValue: (req,res,next) => { req.params.id == req.session.currentUser._id.toString() ? next() :  res.redirect('/students') }
}