const isLoggedin = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Log in to continue' })
    }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect('/')
    }
}

const checkRole = (...roles) => (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'You don not have credentials to access' })
    }
}

// const localSession = (req, res, next) => {
//     if (req.session.currentUser) {
//         res.local.currentUserId = req.session.currentUser._id
//     } else {
//         res.local.currentUserId = null
//     }
//     next()
// }

// const userIsStaff = user => user.role != 'STUDENT'

module.exports = { isLoggedin, isLoggedOut, checkRole }