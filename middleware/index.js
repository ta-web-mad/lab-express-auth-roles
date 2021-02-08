module.exports = {
    checkLoggedIn: (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', {errorMsg: 'Log in to access'}),
    checkRole: rolesArray => (req, res, next) => rolesArray.includes(req.user.role) ? next() : res.render('index', { errorMsg: 'Desautorizado, no tienes privilegios' })
}