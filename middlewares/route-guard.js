const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
};
const isLoggedOut = (req, res, next) => {
    !req.session.currentUser ? next() : res.redirect('/')
};
const checkRoles = (...admittedRoles) => (req, res, next) => {

    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)

    if (isAdmitted) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
};

//No termino de entender la lógica del middleware... 

module.exports = { isLoggedIn, isLoggedOut, checkRoles };

