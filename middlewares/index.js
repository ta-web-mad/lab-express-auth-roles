module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.session.currentUser) {
      next()
    } else {
      res.render('auth/login', {
        errorMsg: 'You must be logged to see this page',
      })
    }
  },

  checkRoles:
    (...roles) =>
    (req, res, next) => {
      if (roles.includes(req.session.currentUser.role)) {
        next()
      } else {
        res.render('auth/login', {
          errorMsg: "You don't have the permissions to visit this page",
        })
      }
    },

  checkIfCurrUserOrPM: (req, res, next) => {
    if (
      req.session.currentUser._id === req.params.id ||
      req.session.currentUser.role === 'PM'
    ) {
      next()
    } else {
      res.render('auth/login', {
        errorMsg: "You don't have the permissions to visit this page",
      })
    }
  },
}
