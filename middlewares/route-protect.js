//parte de la iteración 1: proteger las rutas
const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect('/login?err=Identifícate para acceder')
    }
}




module.exports = {
    isLoggedIn
}