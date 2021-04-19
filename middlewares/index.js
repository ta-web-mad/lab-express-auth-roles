module.exports = {
    customMiddleware: (req, res, next) => next(),

    isLoggedIn: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        }
        else {
            res.render('pages/auth/login-form', { errorMessage: 'Log in first' })
        }
    },

    checkRoles: (...allowedRoles) => (req, res, next) => {
        if (allowedRoles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.render('pages/auth/login-form', { errorMessage: 'No permisson' })
        }
    },

    checkEditCapability: () => (req, res, next) => {
        if ((req.session.currentUser.role === "BOSS") || (
            (req.params.student_id) &&
            (req.session.currentUser._id === req.params.student_id))) {
            next()
        } else {
            res.render('pages/auth/login-form', { errorMessage: 'No permisson' })
        }
    }
}