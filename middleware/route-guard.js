const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect('/inicio-sesion')
    }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect('/')
    }
}


const checkRole = (...admittedRoles) => (req, res, next) => {

    const { role } = req.session.currentUser

    if (admittedRoles.includes(role)) {
        next()
    } else {
        res.redirect('/inicio-sesion')
    }
}

const check = (...admittedRoles) => (req, res, next) => {
    const { _id } = req.params
    const { role } = req.session.currentUser

    if (req.session.currentUser._id === _id || admittedRoles.includes(role)) {
        next()
    } else {
        res.redirect('/inicio-sesion')
    }
}




module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRole,
    check
}