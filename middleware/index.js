module.exports = {
    checkLoggedUser: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        } else {
            res.render('auth/login-page', { errorMessage: 'Not Authorized. Log in!' })
        }
    },
    checkRoles: (...roles) => (req, res, next) => {
        if (roles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.render('auth/login-page', { errorMessage: 'Restricted to PM' })
        }
    },
    isLoggedOut: (req, res, next) => {
        if (req.session.currentUser) {
            res.redirect('/students')
        } else {
            next()
        }
    }
}