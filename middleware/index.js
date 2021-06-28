module.exports = {
    checkLoggedUser: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        } else {
            res.render('auth/log-in', { errorMessage: 'Log-in for continue' })
        }
    },
    checkRoles: (...roles) => (req, res, next) => {
        if (roles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.render('auth/log-in', { errorMessage: 'Restricted Area' })
        }
    }
}