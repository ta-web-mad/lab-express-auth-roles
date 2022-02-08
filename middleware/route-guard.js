const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render("auth/login", {
        errorMessage: "Identifícate para acceder"
    })
}

const checkRoles = (...admittedRoles) => (req, res, next) => {
    admittedRoles.includes(req.session.currentUser.role) ? next() : res.render("auth/login", {
        errorMessage: "No tienes permisos suficientes"
    })
}

const loggedUser = (req, res, next) => {
    req.params.id != req.session.currentUser ? res.render("auth/login", {
        errorMessage: "No tienes permisos suficientes"
    }) : next()
}

const bothCheck = (req, res, next) => {
    console.log(req.params, req.session.currentUser)
    if (["PM"].includes(req.session.currentUser.role) || req.params.id == req.session.currentUser._id) {
        next()
    } else {
        res.render("auth/login", {
            errorMessage: "No tienes permisos suficientes"
        })
    }
}

module.exports = { isLoggedIn, checkRoles, loggedUser, bothCheck }