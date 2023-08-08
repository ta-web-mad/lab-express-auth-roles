//parte de la iteración#1: proteger las rutas
const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect('/login?err=Identifícate para acceder')
    }
}
// parte de la iteración#2: usuario PM el único capaz de ver los botones de editar y borrar usuario

const checkRoles = (...admittedRoles) => (req, res, next) => {

    const { role } = req.session.currentUser

    if (admittedRoles.includes(role)) {
        next()
    } else {
        res.redirect('/login?err=No estás autorizado')
    }
}


module.exports = {
    isLoggedIn,
    checkRoles
}