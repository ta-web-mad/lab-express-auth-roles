module.exports = {
  checkLoggedIn: (req, res, next) =>
    req.isAuthenticated()
      ? next()
      : res.render("auth/login", { errorMessage: "Login" }),

  checkBoss: (req, res, next) =>
    req.user.role === "BOSS"
      ? next()
      : res.render("my-platform", {
          errorMessage: "You don't have enough credentials",
        }),

  checkEmployee: (req, res, next) =>
    req.user.role === "TA" || req.user.role === "DEV"
      ? next()
      : res.render("my-platform", {
          errorMessage: "You don't have enough credentials",
        }),

  checkProfilePermissions: (req, res, next) =>
    ["TA", "DEV", "BOSS"].includes(req.user.role)
      ? next()
      : res.render("my-platform", {
          errorMessage: "You don't have enough credentials",
        }),
}
