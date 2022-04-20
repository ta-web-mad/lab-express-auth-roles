const checkId = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser._id)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permisos' })
    }
}

module.exports = checkId