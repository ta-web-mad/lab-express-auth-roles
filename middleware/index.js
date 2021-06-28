module.exports = {
    checkLoggedUser: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        } else {
            res.render('auth/login-page', { errorMessage: 'Log-In to continue' })
        }
    },
    whatever: (req, res, next) => {
        next()
    },
    checkRoles: (...roles) => (req, res, next) => {
        if (roles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.render('auth/login-page', { errorMessage: 'Restringed Area, byebye' })
        }
    }
}