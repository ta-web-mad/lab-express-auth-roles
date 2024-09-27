const isLogedin = (req, res, next) => {
    console.log(req.session.user)
    const user = req.session.user;
    if (user) {
        next();
        return;
    }
    res.redirect('/iniciar-sesion');
};

module.exports = isLogedin;