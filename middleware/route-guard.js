

function isLoggedIn(req, res, next) {
    if (req.session.currentUser) { //SI ES CIERTO QUE EL USUARIO HA INCIADO SESION
        next()
    } else {
        res.render('auth/login', { error: 'Debe iniciar sesión para continuar' })
    }
}

function isLoggedOut(req, res, next) {
    if (!req.session.currentUser) { //SI ES CIERTO QUE EL USUARIO NO HA INICIADO SESION
        next()
    } else {
        res.redirect('/students')
    }
}



module.exports = {
    isLoggedIn,
    isLoggedOut,
}