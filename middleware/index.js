module.exports = {
    checkLoggedIn: (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Log in to acces the student profiles' }),
    checkRole: (...rolesArray) => (req, res, next) => rolesArray.includes(req.user.role) ? next() : res.render('site/home', { errorMsg: 'You do not have the privileges to acces this area' })
}