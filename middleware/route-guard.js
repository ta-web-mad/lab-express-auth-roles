const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'Inicia sesion para continuar' })
    }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    }
    else {
        res.redirect('/student-profile')
    }
}

const checkRole = (...roles) => (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) {
        next()
    }
    else {
        res.render('auth/login-form', { errorMessage: 'No tienes los permisos necesarios' })
    }
}


module.exports = { isLoggedIn, isLoggedOut, checkRole }