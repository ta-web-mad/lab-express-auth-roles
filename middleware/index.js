module.exports = {
    checkLoggedIn: (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Log in to continue' }),
    checkRole: (...rolesArray) => (req, res, next) => rolesArray.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'You cannot enter to this area,sorry!' })
} 