const logged = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', {
        errorMessage: 'Identifícate para acceder'
    })
}

const getRoled = (...admittedRoles) => (req, res, next) => {
    admittedRoles.includes(req.session.currentUser.role) ? next() : res.render('auth/login', {
        errorMessage: `Desautorizado, solo rol ${admittedRoles}`
    })
}

module.exports = { logged, getRoled }