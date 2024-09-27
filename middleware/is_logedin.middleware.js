const isLogedin = (req, res, next) => {
    const user = req.session.currentUser;
    if (user) {
        next();
        return;
    }
    res.redirect('/iniciar-sesion');
};

module.exports = isLogedin;
