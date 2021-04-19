module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        }
        else {
            res.render('pages/auth/login', { errorMessage: 'Please log in to access' })
        }
    },
    checkRoles: (...allowedRoles) => (req, res, next) => {         
        if (allowedRoles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.render('pages/auth/login', { errorMessage: 'Not authorized' })
        }
    }
}