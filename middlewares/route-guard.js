
const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
}


const isLoggedOut = (req, res, next) => {
    !req.session.currentUser ? next() : res.redirect('/')
}


const checkRoles = (...admittedRoles) => (req, res, next) => {

    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)

    if (isAdmitted) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
}


const checkOwner = (req, res, next) => {

    if (req.params.id === req.session.currentUser._id || req.session.currentUser.role === 'PM') {
        next()

    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
}

//const { all } = require("../routes/user.routes")

/* const checkOwnerAndPM = (req, res, next) => {
    
    const allowedRoles = ['User', 'PM'];

    if (allowedRoles.includes(req.session.currentUser.role)) {
        next();
    } else {
        res.render(('auth/login', { errorMessage: 'Acceso no autorizado' }))
    }
} */

module.exports = { isLoggedIn, isLoggedOut, checkRoles, checkOwner }