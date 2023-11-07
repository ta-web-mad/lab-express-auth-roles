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

const checkOwnerOrPm = (...roles) => (req, res, next) => {



    console.log("el id del perfil en el que estoy")
    console.log("el id del que esta conectado")

}


module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRole
}