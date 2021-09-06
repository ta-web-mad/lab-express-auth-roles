const router = require('express').Router();
const User = require('../models/User.model');
const {
  isLoggedIn,
  checkId,
  checkRoles,
  checkIfStudentOrPM,
} = require('./../middleware');

router.get('/', isLoggedIn, (req, res, next) => {
  User.find({ role: 'STUDENT' })
    .then(user =>
      res.render('students/students-list', {
        user,
        isLogged: req.session.currentUser,
        isPM: req.session.currentUser?.role === 'PM',
      })
    )
    .catch(err => console.log(err));
});

router.get('/:studentId', isLoggedIn, (req, res, next) => {
  const { studentId } = req.params;

  User.findById(studentId)
    .then(student =>
      res.render('students/student-profile', {
        student: student,
        isLogged: req.session.currentUser,
        isPM: req.session.currentUser?.role === 'PM',
      })
    )
    .catch(err => console.error(err));
});

router.get('/:studentId/edit', checkRoles('PM'), (req, res, next) => {
  const { studentId } = req.params;

  User.findById(studentId)
    .then(student => res.render('students/edit-student', { student }))

    .catch(err => console.log(err));
});

router.post('/:studentId/edit', checkRoles('PM'), (req, res, next) => {
  const { studentId } = req.params;
  const { username, role } = req.body;
  User.findByIdAndUpdate(studentId, { username, role })
    .then(student => res.redirect(`/students/${studentId}`))

    .catch(err => console.log(err));
});

router.get('/:studentId/delete', checkRoles('PM'), (req, res, next) => {
  const { studentId } = req.params;

  User.findByIdAndRemove(studentId)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err));
});

module.exports = router;
