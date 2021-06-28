module.exports = {
    checkLoggedUser: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        } else {
            res.render('/login-page', { errorMessage: 'Inicia sesión para continuar' })
        }
    },
    whatever: (req, res, next) => {
        next()
    },
    checkRoles: (...roles) => (req, res, next) => {
        if (roles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.render('auth/login-page', { errorMessage: 'Área restringida' })
        }
    }
}