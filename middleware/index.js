
module.exports = {
    isLoggedIn: (req, res, next) => {
        req.session.currentUser ? next() : res.render('auth/login', { errorMsg: 'Inicia sesión para continuar' })
    },

    checkRoles: (...roles) => (req, res, next) => {
        roles.includes(req.session.currentUser?.role) ? next() : res.render('auth/login', { errorMsg: 'No tienes permisos' })
    },

    checkIfCurrUser: (req, res, next) => {
        req.session.currentUser?._id === req.params.id ? next() :  res.render('auth/login', { errorMsg: 'No tienes permisos' })
    },

    checkIfCurrUserOrPM: (req, res, next) => {
        req.session.currentUser?._id === req.params.id || req.session.currentUser?.role === "PM" ? next() :  res.render('auth/login', { errorMsg: 'No tienes permisos' })
    },

}