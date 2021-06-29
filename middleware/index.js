module.exports = {
    checkLoggedUser: (req, res, next) => {
        if (req.session.currentUser?._id) {
            next()
        } else {
            res.render('auth/login-page', { errorMessage: 'Inicia sesión para continuar' })
        }
    },

    checkRoles: (...roles) => (req, res, next) => {
        if (roles.includes(req.session.currentUser?.role)) {
            next()
        } else {
            res.render('auth/login-page', { errorMessage: 'Área restringida' })
        }
    }
}