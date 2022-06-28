const isLoggedIn = (req, res, next) => {
    !req.session.currentUser ? res.render('auth/login', { errorMessage: 'Necesitas registrarte para acceder' }) : next()
}

const checkRole = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permiso para acceder' })
    }
}


module.exports = { isLoggedIn,checkRole }

