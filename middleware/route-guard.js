const isLoggedIn =(req, res, next) => {
    if (!req.session.currentUser){
        return res.redirect("/iniciar-sesion");
    }
    next ();
};
const isLoggedOut =(req, res, next) => {
    if (req.session.currentUser){
        return res.redirect("/");
    }
    next ();
};
const checkRole = (roles=[]) => (req, res, next) => {
    if(roles.includes(req.session.currentUser.role)){
      next()
    } else {
      res.render('auth/login', { errorMessage: 'No tienes permisos.'})
    }
};

module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRole
};
