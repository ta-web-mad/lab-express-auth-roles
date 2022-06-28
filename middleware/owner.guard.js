const isOwnerOrPM = (req, res, next) => {

    const isOwner = req.params.id === req.session.currentUser._id
    const isPM = req.session.currentUser.role === 'PM'

    if (isOwner || isPM) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permiso para editar' })
    }
}


module.exports = { isOwnerOrPM }