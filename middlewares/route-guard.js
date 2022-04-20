const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next () : res.render('auth/login', {errorMessage: 'Si desea acceder deberá iniciar sesión'})
}

const checkRole = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', {errorMessage: 'No tienes permisos'})
    }
}

module.exports = {isLoggedIn, checkRole}