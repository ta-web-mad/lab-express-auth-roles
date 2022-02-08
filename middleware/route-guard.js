const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', {
        errorMessage: 'Identifícate para acceder'
    })
}

const checkRole = (...permitedRoles) => (req, res, next) => {
    permitedRoles.includes(req.session.currentUser.role) ? next() : res.render('auth/login', {
        errorMessage: `Desautorizado, solo rol ${permitedRoles}`
    })
}

const allowEdit = (req, res, next) => {
    req.params.id === req.session.currentUser._id || req.session.currentUser.role === 'PM' ? next() : res.render('auth/login', {
        errorMessage: `Desautorizado, solo rol ${permitedRoles}`
    })
}

module.exports = { isLoggedIn, checkRole, allowEdit }