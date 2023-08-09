const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect('/inicio-sesion?err=Identifícate para acceder')
    }
}

//ITERACION 2 - ROL ADM

const checkRoles = (...admittedRoles) => (req, res, next) => {

    const { role } = req.session.currentUser

    if (admittedRoles.includes(role)) {
        next()
    } else {
        res.redirect('/inicio-sesion?err=No estás autorizado')
    }
}
module.exports = {
    isLoggedIn,
    checkRoles
}