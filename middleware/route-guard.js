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
        res.redirect("/")
    }
}

const checkRole = (...admittedRoles) => (req, res, next) => {

    const { role } = req.session.currentUser

    if (admittedRoles.includes(role)) {
        next()
    } else {
        res.redirect("/iniciar-sesion")
    }
}

// Esto es lo más que se me ha ocurrido :(

const checkUser = (...admittedRoles) => (req, res, next) => {

    const { role } = req.session.currentUser
    const { user_id } = req.params

    if (req.session.currentUser._id === user_id || admittedRoles.includes(role)) {
        next()
    } else {
        res.redirect('/inciar-sesion')
    }
}



module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRole,
    checkUser
}