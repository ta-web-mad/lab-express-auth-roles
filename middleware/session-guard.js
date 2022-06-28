const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
    }
    next()
}

const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
        return res.redirect('/')
    }
    next()
}

const isAdmin = (req, res, next) => {
    if (req.session.currentUser.role !== 'PM') {
        return res.redirect('/alumnos')
    }
    next()
}


module.exports = { isLoggedIn, isLoggedOut, isAdmin }