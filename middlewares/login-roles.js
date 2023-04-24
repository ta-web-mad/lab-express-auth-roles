const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.render("auth/login", { errorMessage: "You must login to access" });
  }
};

module.exports = isLoggedIn;
