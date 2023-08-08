const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next()
  } else {
    res.redirect('/log-in')
  }
}

// const isLoggedOut = (req, res, next) => {
//   if (!req.session.currentUser) {
//     next()
//   } else {
//     res.redirect('/')
//   }
// }

const checkRoles =
  (...admittedRoles) =>
  (req, res, next) => {
    const { role } = req.session.currentUser

    if (admittedRoles.includes(role)) {
      next()
    } else {
      res.redirect('/log-in?err=No estás autorizado')
    }
  }

module.exports = {
  isLoggedIn,
  //   isLoggedOut,
  checkRoles
}
