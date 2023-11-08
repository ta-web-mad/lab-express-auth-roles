const issLogedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect('/iniciar-sesion')
    }
}
const checkRole = (...adimetteRoles) => (req, res, next) => {

    const { role } = req.session.currentUser

    if (adimetteRoles.includes(role)) {
        next()
    } else {
        res.redirect('/')
    }
}

const check = (...isOwner) => (req, res, next) => {

    const { _id } = req.params
    const { role } = req.session.currentUser


    if (req.session.currentUser._id === _id || isOwner.includes(role)) {
        next()
    } else {
        res.redirect('/')
    }
}




module.exports = {
    issLogedIn,
    checkRole,
    check
}