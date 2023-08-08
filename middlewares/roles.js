const checkRoles = (...admittedRoles) => (req, res, next) => {

    const { role } = req.session.currentUser

    if (admittedRoles.includes(role)) {
        next()
    } else {
        res.redirect('/')
    }
}

const upgradeDev = (req, res, next) => {

}


module.exports = {
    checkRoles,
    upgradeDev,
}