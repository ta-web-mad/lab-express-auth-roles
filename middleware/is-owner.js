const isOwnerId = (req, res, next) => {

    const isOwner = req.params._id === req.session.currentUser._id
    const isPM = req.session.currentUser.role === 'PM'

    if (isOwner || isPM) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'no tienes permisos madafaka' })
    }
}


module.exports = { isOwnerId }