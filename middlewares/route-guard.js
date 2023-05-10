const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
}


const checkRoles = (...admittedRoles) => (req, res, next) => {
    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)
    if (isAdmitted) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
}

const checkIfOwnerOrPM =  (req, res, next) =>{
    let {_id} = req.params

    if(_id === req.session.currentUser._id || req.session.currentUser.role === "PM") {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
    }
}


module.exports = { isLoggedIn, checkRoles, checkIfOwnerOrPM }