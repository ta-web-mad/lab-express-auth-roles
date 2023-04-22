const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.render("auth/login", { errorMessage: "Debes iniciar sesión" });
    return;
  }
};

module.exports = { isLoggedIn }
