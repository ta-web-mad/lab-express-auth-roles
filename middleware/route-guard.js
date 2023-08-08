const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect('/iniciar-sesion')
    }
}

const checkRoles = (...admittedRoles) => (req, res, next) => {
    const { role } = req.session.currentUser
    const { _id } = req.session.currentUser

    if (admittedRoles.includes(role) || admittedRoles.includes(_id)) {
        next()
    } else {
        res.redirect('/iniciar-sesion?err=No estas autorizado')
    }
}



module.exports = {
    isLoggedIn,
    checkRoles
}