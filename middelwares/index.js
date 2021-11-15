module.exports = {
  isLoggedIn: (req, res, next) => {
    req.session.currentUser
      ? next()
      : res.render("auth/login", {
          errorMessage: "You need to login to see theese area",
        });
  },
};
