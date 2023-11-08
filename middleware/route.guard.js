const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.render('auth/login')
    }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    } else {
        res.render('/')
    }
}

const checkRole = (...admitedRoles) => (req, res, next) => {

    const { role } = req.session.currentUser

    if (admitedRoles.includes(role)) {
        next()
    } else {
        res.render('/')
    }

}

const isOwner = (req, res, next) => {
    const { id } = req.params
    const { role } = req.session.currentUser

    if (id == req.session.currentUser._id || role == "PM") {
        next()
    } else {
        res.render('/')
    }
}


module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRole,
    isOwner
}