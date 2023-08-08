
const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        console.log("el usuario logueado es:", req.session.currentUser)
        next()
    } else {
        res.redirect('/login?err=Identify yourself to access')
    }
}


const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect('/')
    }
}

const checkRoles = (...admittedRoles) => (req, res, next) => {

    const { role } = req.session.currentUser

    if (admittedRoles.includes(role)) {
        next()
    } else {
        res.redirect('/login?err=not authorized')
    }
}


module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRoles
}