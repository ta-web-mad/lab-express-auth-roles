const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'You must log in to continue' })
}

const isLoggedOut = (req, res, next) => {
    !req.session.currentUser ? next() : res.redirect('/')
}

const checkRoles = (...admittedRoles) => (req, res, next) => {
    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)

    if (isAdmitted) {
        next()
    } else {
        res.render('auth/login', { errorMessage: "User unauthorized" })
    }

}

const checkOwnership = (checkRoles) => (req, res, next) => {

    const isPM = checkRoles('PM')
    const { user_id } = req.params
    const isOwner = req.session.currentUser

    if (isOwner._id === user_id || isPM) {
        next()
    } else {
        res.render('auth/login', { errorMessage: "User unauthorized" })
    }
}



module.exports = { isLoggedIn, isLoggedOut, checkRoles, checkOwnership }