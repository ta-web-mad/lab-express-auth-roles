const mongoose = require("mongoose")

module.exports = {

    isLoggedIn: (req, res, next) => {
        req.session.currentUser ? next() : res.render('auth/login', { errorMsg: 'Inicia sesión para continuar' })
    }, 
    checkRoles: (...roles) => (req, res, next) => {
        roles.includes(req.session.currentUser.role) ? next() : res.render('auth/login', { errorMsg: 'No tienes permisos' })
    },
    userId: (req, res, next) => {
        const ObjectId = require('mongoose').Types.ObjectId;
        ObjectId.isValid(req.params.id)? next() : res.redirect(req.baseUrl);
    },

}