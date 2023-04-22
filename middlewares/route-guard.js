const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next();
    } else {
        res.render("auth/login", { errorMessage: 'Debes iniciar secion' })
    }
}

module.exports = { isLoggedIn };