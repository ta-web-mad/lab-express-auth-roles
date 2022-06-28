const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.render('user/students', { errorMessage: 'Debes iniciar sesión' })
    }
    next()
}

const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
        return res.redirect('/')
    }
    next()
}

const checkRole = (...grantedRoles) => (req, res, next) => {
    if (grantedRoles.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permisos' })
    }

}



module.exports = { isLoggedIn, isLoggedOut, checkRole }