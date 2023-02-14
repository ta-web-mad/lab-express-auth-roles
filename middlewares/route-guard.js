const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
    }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    }
    else {
        res.redirect('/perfil')
    }
}

// ROLESS (los tres puntos generan un string de los datos recibidos)

const checkRole = (...roles) => (req, res, next) => {

    if (roles.includes(req.session.currentUser.role)) { next() }

    else { res.render('auth/login', { errorMessage: 'No tienes permiso' }) }
}

const canEdit = (req, res, next) => {

    const userId = req.session.currentUser._id
    const { idEdit } = req.params
    console.log(userId)
    console.log(req.params.id)

    if (req.session.currentUser.role === 'PM' || req.session.currentUser._id === req.params.id) { next() }

    else { res.render('auth/login', { errorMessage: 'No tienes permiso' }) }
}



module.exports = { isLoggedIn, isLoggedOut, checkRole, canEdit }