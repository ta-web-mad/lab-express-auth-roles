const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.render("auth/login", { errorMessage: "Debes iniciar secion" });
  }
};

const checkRole =
  (roles = []) =>
  (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) {
      next();
    } else {
      res.render("auth/login", { errorMessage: "No tienes permisos." });
    }
  };

module.exports = { isLoggedIn, checkRole };
