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
        res.redirect('/')
    }
}


const userIsAdmin = (...roles) => (req, res, next) => (roles.includes(req.session.currentUser.role, next()))





module.exports = { isLoggedIn, isLoggedOut, userIsAdmin }