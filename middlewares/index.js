module.exports = {
    isLoggedIn: (req, res, next) => {
      req.session.currentUser ? next() : res.render("auth/login", { errorMessage: "Has de estar logueado para ver este contenido" })
    }
  }

  