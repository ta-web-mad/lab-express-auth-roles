const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render("auth/login")
}

const isLoggedOn = (req, res, next) => {
    !req.session.currentUser ? next() : res.render("auth/login")
}


const checkRoles = (...admitedRoles) => (req, res, next) => {
    const isAdmitted = admitedRoles.includes(req.session.currentUser.userRoles)
    if (isAdmitted) {
        next()
    } else {
        res.render('auth/login')
    }
}
const isOwner = (req, res, next) => {
    const { id } = req.params
    const isOwner = (id == req.session.currentUser._id) ? true : false

    if (isOwner) {
        next()
    } else {
        res.redirect(`/${id}`)
    }
}

module.exports = { isLoggedIn, checkRoles, isLoggedOn, isOwner }