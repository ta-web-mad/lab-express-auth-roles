const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', {
        errorMessage: 'Identifícate para acceder'
    })
}

const checkRole = (...admittedRoles) => (req, res, next) => {
    admittedRoles.includes(req.session.currentUser.role) ? next() : res.render('auth/login', {
        errorMessage: `Desautorizado, solo rol ${admittedRoles}`
    })
}

const check = (req, res, next) => {
    console.log(req.params, req.session.currentUser)
    if (["PM"].includes(req.session.currentUser.role) || req.params.id == req.session.currentUser._id) {
        next()
    } else {
        res.render("auth/login", {
            errorMessage: "No tienes permiso"
        })
    }
}
module.exports = { isLoggedIn, checkRole, check }