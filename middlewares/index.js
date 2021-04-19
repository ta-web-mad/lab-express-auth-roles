module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        } else {
            console.log('UNAUTHORIZED ACCESS. Please log in.')
            res.render('pages/auth/loginForm', { errorMessage: 'Must login first to access.' })
        }
    },
    checkRoles: (...allowedRoles) => (req, res, next) => {
        if (allowedRoles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.render('pages/auth/loginForm', {
                errorMessage: 'USER HAS UNAUTHORIZED ACCESS.'
            })
        }
    }
}