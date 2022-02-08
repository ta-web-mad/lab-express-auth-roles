const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', {
        errorMessage: 'Identifícate para acceder'
    })
}

const isTA = (req, res, next) => {
    req.session.currentUser.role === 'TA' ? next() : res.redirect('/', {
        errorMessage: 'No tienes acceso a esta página'
    })
}
const checkRole = (role) => (req, res, next) => {
    role === req.session.currentUser.role ? next() : res.render('auth/login', {
        errorMessage: `Desautorizado, solo rol ${role}`
    })
}


module.exports = { isLoggedIn, checkRole, isTA }