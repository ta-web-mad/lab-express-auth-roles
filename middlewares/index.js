module.exports = {

    checkRoles: (...allowedRoles) => (req, res, next) => {          
        if (allowedRoles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.render('pages/auth/login-form', { errorMessage: 'Desautorizado' })
        }
    },
    isLoggedIn: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        }
        else {
            res.render('pages/auth/login-form', { errorMessage: 'Inicia sesión para acceder' })
        }
    },
}