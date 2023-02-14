const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) next()
    else res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
}

const checkRole = (...roles) => (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) next()
    else res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
}

module.exports = { isLoggedIn, checkRole }