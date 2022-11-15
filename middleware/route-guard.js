
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

function checkEdit(req, res, next) {
    if (req.session.currentUser._id === req.params.stud_id || req.session.currentUser.role === 'PM') {
        console.log(req.params)
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permisos' })
    }
}



const checkRoles = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: `No tienes permisos de ${roleToCheck}` })
    }
}


module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRoles,
    checkEdit
}