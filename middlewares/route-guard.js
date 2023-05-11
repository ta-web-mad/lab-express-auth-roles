const isLogged = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
}


const isNotLogged = (req, res, next) => {
    !req.session.currentUser ? next() : res.redirect('/')
}


const checkRoles = (...admittedRoles) => (req, res, next) => {

    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)

    if (isAdmitted) {
        next()
    } else {
        res.render('index', { errorMessage: 'Acceso no autorizado' })
    }
}


const checkOwnerOrPM = (req, res, next) => {

    const {id} = req.params

    if (id === req.session.currentUser._id || req.session.currentUser.role === 'PM') {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
}


module.exports = { isLogged, isNotLogged, checkRoles, checkOwnerOrPM }