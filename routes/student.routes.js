const router = require('express').Router();
const User = require('../models/User.model');
const { STUDENT } = require('../const/user.const');
const isLogedin = require('../middleware/islogedin.middleware');
//List of students
router.get('/', isLogedin, (req, res) => {
    User.find()
        .then(users => {
            const students = users.filter(user => user.role === STUDENT);
            // console.log(students);
            res.render('students/students-list', { students });
        })
        .catch(err => next(err));
});

//Student details
router.get('/:id', isLogedin, (req, res) => {
    const { id } = req.params;
    User.findById(id)
        .then(user => {
            res.render('students/student-details', { student: user });
        })
        .catch(err => next(err));
});


module.exports = router;

