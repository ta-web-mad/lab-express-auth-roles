const canEditStudent = () => (req, res, next) => {
    const user = req.session.currentUser
    const userID = req.params.id
    if (user.role === "PM" || user._id === userID) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permisos' })
    }
}

module.exports = { canEditStudent }