const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
}


const isLoggedOut = (req, res, next) => {
    !req.session.currentUser ? next() : res.redirect('users/list-page')
}

const checkRoles = (...admittedRoles) => (req, res, next) => {

    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)

    if (isAdmitted) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
}

const checkUser = (req, res, next) => {

    const { user_id } = req.params
    if (req.session.currentUser.role === "PM" || req.session.currentUser._id === user_id) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
}

module.exports = { isLoggedIn, isLoggedOut, checkRoles, checkUser } 