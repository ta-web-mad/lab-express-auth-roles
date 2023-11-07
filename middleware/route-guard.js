const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect('/iniciar-sesion')
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

const checkActualUser = (...admittedRoles) => (req, res, next) => {

    const { role } = req.session.currentUser
    const { id } = req.params

    if (admittedRoles.includes(role) || req.session.currentUser._id === id) {
        next()
    } else {
        res.redirect('/iniciar-sesion')
    }
}

module.exports = {
    isLoggedIn,
    checkRole,
    checkActualUser
}