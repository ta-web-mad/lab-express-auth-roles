const isLoggedIn = (req, res, next) => {
  req.session.currentUser
    ? next()
    : res.render("auth/login", {
        errorMessage: "Identifícate para acceder",
      });
};

module.exports = { isLoggedIn };
