const mongoose = require('mongoose')

module.exports = {
    isLogged: (req, res, next) => {
        req.session.currentUser ? next() : res.render('auth/login', { errorMsg: 'You must be logged' })
    },
    checkRoles: (...roles) => (req, res, next) => {
        roles.includes(req.session.currentUser.role) ? next() : res.render('auth/login', { errorMsg: 'No tienes permisos' })
    }
}