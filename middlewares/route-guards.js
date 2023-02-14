const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) next()
    else res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
}

const checkRole = (...roles) => (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) next()
    else res.render('auth/login', { errorMessage: 'No dispones de permisos' })
}

const isOwnerOrPM = (req, res, next) => {
    console.log(req.params)
    if (req.session.currentUser._id === req.params.id || req.session.currentUser.role === "PM") next()
    else res.render('auth/login', { errorMessage: 'No dispones de permisos' })

}


module.exports = { isLoggedIn, checkRole, isOwnerOrPM }