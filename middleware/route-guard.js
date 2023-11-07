const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    }
    else {
        res.redirect('/iniciar-sesion')
    }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    }
    else {
        res.redirect('/')
    }
}

const checkRoles = (allowOwner, ...admittedRoles) => (req, res, next) => {
    const { _id } = req.params
    const { role } = req.session.currentUser

    if (allowOwner) {
        if (_id === req.session.currentUser._id || admittedRoles.includes(role)) {
            next()
        }
        else {
            res.redirect('/')
        }
    }
    else {
        if (admittedRoles.includes(role)) {
            next()
        }
        else {
            res.redirect('/iniciar-sesion')
        }
    }
}

module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRoles
}