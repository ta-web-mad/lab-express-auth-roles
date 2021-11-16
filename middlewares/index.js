module.exports = {
    isLoggedIn: (req, res, next) => {
      req.session.currentUser ? next() : res.render("auth/login", { errorMessage: "You have to be logged to see this page" })
    },
  
  
    checkRoles: (...roles) => (req, res, next) => {
      roles.includes(req.session.currentUser.role) ? next() : res.status(401).render("auth/login-page", { errorMessage: "No tienes los permisos adecuados" })
    }
}