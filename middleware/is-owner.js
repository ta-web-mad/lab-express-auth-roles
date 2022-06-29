const isOwnerOrPM = (req, res, next) => {
    if (req.params.student_id === req.session.currentUser._id || req.session.currentUser.role === "PM") {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'No tienes permiso para editar' })
    }
}
module.exports = { isOwnerOrPM }
