
const checkOwnerOrPM = (req, res, next) => {

    const isOwner = req.params.student_id === req.session.currentUser._id
    const isPM = req.session.currentUser.role === 'PM'

    if (isOwner || isPM) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permisos' })
    }
}

module.exports = { checkOwnerOrPM }



