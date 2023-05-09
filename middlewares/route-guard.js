const checkRole = require("../utils/checkRole")

const isLoggedIn = (req, res, next) => {
    req.session.currentUser
        ? next()
        : res.render('auth/login', { errorMessage: 'Please login to continue', role: checkRole(req.session.currentUser) })
}
const isLoggedOut = (req, res, next) => {
    !req.session.currentUser
        ? next()
        : res.redirect('/my-profile')
}
const isAuthorized = (...roles) => (req, res, next) => {
    if (req.session.currentUser && roles.includes(req.session.currentUser.role)) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'You do not have permits', role: checkRole(req.session.currentUser) })
    }
}
const canEdit = (req, res, next) => {
    const { id } = req.params
    if (req.session.currentUser.role !== "PM" && req.session.currentUser._id !== id) {
        res.redirect('/students')
    } else {
        next()
    }
}
module.exports = { isLoggedIn, isLoggedOut, isAuthorized, canEdit }