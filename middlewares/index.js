module.exports = {
  accessRole:
    (...roles) =>
    (req, res, next) => {
      if (roles.includes(req.session.currentUser?.role) || roles.includes(req.session.currentUser?._id)) {
        next()
      } else {
        res.render('login/login', { error: 'Area not allowed' })
      }
    },
}
