const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Inicia sesión para acceder' })
}

const checkRole = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.roles)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permisos' })
    }
}

module.exports = { isLoggedIn, checkRole }