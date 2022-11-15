function isLoggedIn(req, res, next) {
    if (req.session.currentUser) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Inicia sesión para acceder' })
    }
}

function isLoggedOut(req, res, next) {
    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect('/')
    }
}

const checkRoles = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: `No tienes permisos de ${roleToCheck}` })
    }
}

function checkEdit(req, res, next) {
    // console.log(req.params)
    if (req.session.currentUser._id === req.params.user_id || req.session.currentUser.role === 'PM') {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permisos' })
    }
}


module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRoles,
    checkEdit
}