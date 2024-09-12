const roleValidation = (...roles) => (req, res, next) => {
    if (req.session.user && roles.includes(req.session.user.role)) {
        next();
    } else {
        res.redirect('/iniciar-sesion');
    }
}


module.exports = {
    roleValidation
}