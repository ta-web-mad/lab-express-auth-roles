function loggedIn(req, res, next) {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Log In to access' })
}

function loggedOut(req, res, next) {
    !req.session.currentUser ? next() : res.redirect('/')
}

const checkRoles = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: `No tienes permisos de ${roleToCheck}` })
    }
}


module.exports = {
    loggedIn,
    loggedOut,
    checkRoles,
}
