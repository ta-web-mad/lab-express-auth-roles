const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.render("auth/login", { errorMessage: "You must login to access" });
  }
};

const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect("/auth/signup");
  } else {
    next();
  }
};

const checkRole =
  (roles = []) =>
  (req, res, next) => {
    if (roles.includes(req.session.currentUser.roles)) {
      next();
    } else {
      res.render("auth/login", { errorMessage: "No tienes permisos." });
    }
  };

module.exports = { isLoggedIn, isLoggedOut, checkRole };
