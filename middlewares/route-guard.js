const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) { next() }
    else { res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' }) }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) { next() }
    else { res.redirect('index') }
}

const checkRole = (...roles) => (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) { return next() }
    if (req.session.currentUser._id === req.params.user_id) { return next() }
    else { res.render('index', { errorMessage: 'Permisos insuficientes' }) }
}

module.exports = { isLoggedIn, isLoggedOut, checkRole }