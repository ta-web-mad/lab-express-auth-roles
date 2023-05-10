const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.redirect('/login')
}


const isLoggedOut = (req, res, next) => {
    !req.session.currentUser ? next() : res.redirect('/')
}

const checkRoles = (...admittedRoles) => (req, res, next) => {

    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)

    if (isAdmitted) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
}

const checkSame = (req, res, next) => {

    if (req.params._id === req.session.currentUser._id || req.session.currentUser.role === 'PM') {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
}

module.exports = { isLoggedIn, isLoggedOut, checkRoles, checkSame }


