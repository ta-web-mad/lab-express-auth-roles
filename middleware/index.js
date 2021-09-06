const mongoose = require('mongoose');

// Custom middleware
module.exports = {
  isLoggedIn: (req, res, next) => {
    req.session.currentUser
      ? next()
      : res.render('auth/login', { errorMsg: 'Inicia sesión para continuar' });
  },

  checkId: (req, res, next) => {
    mongoose.Types.ObjectId.isValid(req.params.id) ? next() : res.redirect('/');
  },

  checkRoles:
    (...roles) =>
    (req, res, next) =>
      roles.includes(req.session.currentUser.role) ||
      roles.includes(req.session.currentUser.role)
        ? next()
        : res.render('auth/login', { errorMsg: 'No tienes permisos' }),

  checkStudentId: studentId => (req, res, next) => {
    studentId === req.session.currentUser._id
      ? next()
      : res.render('auth/login', { errorMsg: 'No tienes permisos' });
  },

  // checkStudentOrPM: (req, res, next) =>
  //   this.checkStudentId(req.params._id) || this.checkRoles('PM')
  //     ? next()
  //     : res.render('auth/login', { errorMsg: 'No tienes permisos' }),
};
