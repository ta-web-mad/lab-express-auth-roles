const mongoose = require("mongoose")

module.exports = {

    isLoggedIn: (req,res,next) => {
        req.session.currentUser ? next() : res.render('auth/login',{errorMsg : 'Inicia sesión para continuar'})
    },
    checkRole: (role) => (req,res,next) => {

        role === req.session.currentUser.role ? next() : ('auth/login',{errorMsg : 'No tienes permiso para realizar estos cambios'})

    },
    checkValue: (req,res,next) => { req.params.id == req.session.currentUser._id ? next() :  res.redirect('/students') }
}