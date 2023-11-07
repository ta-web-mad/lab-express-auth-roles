const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect("/")
    }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect("/")
    }
}

const checkRole = (...admittedRoles) => (req, res, next) => {
    const { role } = req.session.currentUser

    if (admittedRoles.includes(role)) {
        next()
    } else {
        res.redirect("/iniciar-sesion")
    }

}

const checkPMorOwner = (req, res, next) => {
    const { _id } = req.params

    if (req.session.currentUser.role === "PM" || req.session.currentUser._id === _id) {
        next()
    } else {
        res.redirect("/iniciar-sesion")
    }
}




module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRole,
    checkPMorOwner,
}