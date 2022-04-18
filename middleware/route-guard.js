// declarar isLoggedIn
const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', {
        errorMessage: 'Inicia sesión para acceder'
    })
}

const checkRole = (...admittedRoles) => (req, res, next) => {
    admittedRoles.includes(req.session.currentUser.role) ? next() : res.render('auth/login', {
        errorMessage: `Desautorizado, solo tiene acceso: ${admittedRoles}`
    })
}


// exportar
module.exports = { isLoggedIn, checkRole }