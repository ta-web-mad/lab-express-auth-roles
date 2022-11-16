const rolesValidation = (roles) => (req, res, next) => {
    if (req.session.currentUser && roles.includes(req.session.currentUser.role)) {
        next();
    } else {
        res.render('not-found');
    }
}
module.exports = rolesValidation