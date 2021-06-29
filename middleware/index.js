module.exports = {
    checkLoggedUser: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        } else {
            res.render('auth/login-page', { errorMessage: 'Not Authorized. Log in!' })
        }
    },
    checkRoles: (...roles) => (req, res, next) => {
        console.log(`req.session.currentUser ${req.session.currentUser.role}`)
        if (roles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.render('auth/login-page', { errorMessage: `Restricted to ${roles}` })
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