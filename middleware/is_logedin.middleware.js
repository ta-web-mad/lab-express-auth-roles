
const isLogedin = (req, res, next) => {
    console.log('LEEE ESTOO =>>>>>>>:', req.session.user)
    const user = req.session.user;
    if (user) {
        next();
        return;
    }
    res.redirect('/iniciar-sesion');
};

module.exports = isLogedin;
