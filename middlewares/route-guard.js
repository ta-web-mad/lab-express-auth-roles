const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Primero debes iniciar sesion' })
}

const checkRole = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No puedes acceder' })
    }
}

module.exports = { isLoggedIn, checkRole }