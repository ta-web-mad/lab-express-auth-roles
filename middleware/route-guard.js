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
const checkRoleOwner = (...rolesAllow) => (req, res, next) => {

    const { _id } = req.params
    const { role } = req.session.currentUser

    if (rolesAllow.includes(role) || req.session.currentUser._id === _id) {
        next()
    } else {
        res.redirect('/iniciar-sesion')
    }
}



module.exports = {
    isLoggedIn,
    checkRole,
    checkRoleOwner
}