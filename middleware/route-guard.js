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

const checkRole = (...admitedRoles) => (req, res, next) => {
    const { role } = req.session.currentUser
    if (admitedRoles.includes(role)) {
        next()
    } else {
        res.redirect('/iniciar-sesion')
    }
}

module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRole
}