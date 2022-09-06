const roleValidation = (...roles) => (req, res, next) => {
    // ['ADMIN', 'COMPANY']
    if (req.session.currentUser && roles.includes(req.session.currentUser.role)) {
        next();
    } else {
        res.render('auth/login', { errorMessage: 'Fiera no tienes permiso' });
    }
}


module.exports = roleValidation