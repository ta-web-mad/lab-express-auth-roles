const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'Log in to continue' })
    }
}


const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    }
    else {
        res.redirect('/students')
    }
}

const checkRole = (...roles) => (req, res, next) => {

    if (roles.includes(req.session.currentUser.role)) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'Forbidden access' })
    }

}

const PMorOwn = (req, res, next) => {
    const { student_id } = req.params
    if (req.session.currentUser._id === student_id) {
        next()
    }
    else if (req.session.currentUser.role === 'PM') {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'Forbidden access' })
    }
}




module.exports = { isLoggedIn, isLoggedOut, checkRole, PMorOwn }