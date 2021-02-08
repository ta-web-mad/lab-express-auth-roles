module.exports = {
    checkLoggedIn: (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Login to continue' }),
    
    checkRole: (...rolesArray) => (req, res, next) => rolesArray.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Unauthorized' })
}