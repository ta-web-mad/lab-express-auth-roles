function loggedIn(req, res, next) {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Log In to access' })
}