
const mongoose = require("mongoose")

module.exports = {
    isLoggedIn: (req, res, next) => {
        req.session.currentUser ? next() : res.render('auth/login', { errorMsg: 'Inicia sesión para continuar' })
    },

    checkId: (req, res, next) => {
        mongoose.Types.ObjectId.isValid(req.params.id) ? next() : res.redirect('/')
    },

    checkRoles: (...roles) => (req, res, next) => {
        roles.includes(req.session.currentUser?.role) ? next() : res.render('auth/login', { errorMsg: 'No tienes permisos' })
    },

    checkIfCurrUser: (req, res, next) => {
        req.session.currentUser?._id === req.params.id ? next() :  res.render('auth/login', { errorMsg: 'No tienes permisos' })
    },

    checkIfCurrUserOrPM: (req, res, next) => {
        req.session.currentUser?._id === req.params.id || req.session.currentUser?.role === "PM" ? next() :  res.render('auth/login', { errorMsg: 'No tienes permisos' })
    },

}