const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) next()
    else res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
}


const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) next()
    else res.redirect('/')
}


const checkRole = (...roles) => (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) next()
    else {
        res.render('auth/login', { errorMessage: 'Tu perfil no tiene los permisos necesarios' })
        return
    }
}

const check_RolePM_CurrentUser = (req, res, next) => {
    if (req.session.currentUser?.role === 'PM' || req.session.currentUser?._id === req.params.id || req.session.currentUser?._id === req.body.id) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'Tu perfil no tiene los permisos necesarios' })
        return
    }
}

module.exports = { isLoggedIn, isLoggedOut, checkRole, check_RolePM_CurrentUser }