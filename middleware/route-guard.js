const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect('/iniciar-sesion')
    }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect('/')
    }
}


const checkRole = (...admittedRoles) => (req, res, next) => {

    const { role } = req.session.currentUser

    if (admittedRoles.includes(role)) {
        next()
    } else {
        res.redirect('/iniciar-sesion')
    }
}

const checkOwner = (req, res, next) => {
    const { id } = req.params
    if (id === req.session.currentUser._id || req.session.currentUser.role === 'PM') {
        next()
    } else {
        res.redirect('/listado-estudiante')
    }
}


module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRole,
    checkOwner
}