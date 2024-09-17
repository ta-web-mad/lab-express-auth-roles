const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
    }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    }
    else {
        res.redirect('/users/student-profile')
    }
}

const checkRole = (...roles) => (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'No dispones de permiso' })
    }
}

const editRole = (req, res, next) => {
    if (req.session.currentUser.role === 'PM') {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'No dispones de permiso' })
    }
}

const editMyProfile = (req, res, next) => {
    if (req.session.currentUser.id === req.params.id) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'No dispones de permiso' })
    }
}




module.exports = { isLoggedIn, isLoggedOut, checkRole, editRole, editMyProfile }