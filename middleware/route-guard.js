const isUser = (req, res, next) => {
    console.log('---VAMOS A COMPROBAR LA SESIÓN---->', req.session)
    !req.session.currentUser ? res.redirect('/iniciar-sesion') : next()
}

const isNoUser = (req, res, next) => {
    req.session.currentUser ? res.redirect('/registro') : next()
}

const checkRole = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permisos' })
    }
}

module.exports = { isUser, isNoUser, checkRole }


// if (!req.session.currentUser) {
//     res.redirect('/registro')
// } else {
//     next()
// }