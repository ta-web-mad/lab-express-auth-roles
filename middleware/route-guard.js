function isLoggedIn(req, res, next) {
    if (req.session.currentUser) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Inicio de sesión necesario' })
    }
}

function isLoggedOut(req, res, next) {
    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect('/mi-perfil')
    }
}

const checkRoles = (roleCheck) => (req, res, next) => {
    if (roleCheck === req.session.currentUser.role) {
        next()
    } else {
        res.render('auth/login', { errorMessage: `No tienes permisos de ${roleCheck}` })
    }
}

module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRoles
}