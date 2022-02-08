const isLoggedIn = (req, res, next) => {
    console.log(req.session.currentUser)
    if (!req.session.currentUser) {
        return res.redirect('/iniciar-sesion');
    }
    next();
};

const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
        return res.redirect('/');
    }
    next();
};

const isUser = (req, res, next) => {
    console.log(req.params.id, req.session.currentUser._id)
    if (!req.params.id == req.session.currentUser._id) {
        return res.redirect('/iniciar-sesion');
    }
    next();
}


module.exports = {
    isLoggedIn,
    isLoggedOut,
    isUser
};