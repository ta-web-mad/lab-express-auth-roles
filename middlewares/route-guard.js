const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.render("auth/login", { errorMessage: "Debes iniciar sesión" });
    return;
  }
};

const checkRole =
  (roles = []) =>
  (req, res, next) => {
    console.log(roles);
    console.log(req.session.currentUser);
    if (roles.includes(req.session.currentUser.role)) {
      next();
    } else if (req.params.id === req.session.currentUser._id) {
      next();
    } else {
      res.render("auth/login", { errorMessage: "No tiene permisos" });
    }
  };

module.exports = { isLoggedIn, checkRole };
