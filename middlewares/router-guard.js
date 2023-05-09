const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
}

const checkRoles = (...admittedRoles) => (req, res, next) => {
    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)
    if (isAdmitted) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Usuario no autorizado' })
    }
}

const checkIdUser = (req, res, next) => {
    const { user_id } = req.params
    if (req.session.currentUser._id === user_id || req.session.currentUser.role === 'PM') {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Usuario no autorizado' })
    }
}

module.exports = { isLoggedIn, checkRoles, checkIdUser }