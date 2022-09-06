const router = require('express').Router();
const User = require('../models/User.model');
const { STUDENT, PM } = require('../const/user.const');
const isLogedin = require('../middleware/islogedin.middleware');
const { roleValidation } = require('../middleware/roles.middleware');
//List of students
router.get('/', isLogedin, roleValidation([STUDENT, PM]), (req, res, next) => {
    User.find()
        .then(users => {
            const students = users.filter(user => user.role === STUDENT);
            // console.log(students);
            // if (req.session.currentUser.role === PM) {
            //     console.log('DENTRO DEL PM');
            //     const isPM = true;
            //     res.render('students/students-list', { students, isPM });
            // }
            // else {
            res.render('students/students-list', { students });
            // }
        })
        .catch(err => next(err));
});

//Student details
router.get('/:id', isLogedin, roleValidation([STUDENT, PM]), (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
        .then(student => {
            if (req.session.currentUser.role === PM) {
                const isPM = true;
                res.render('students/student-details', { student, isPM });
            }
            else {
                res.render('students/student-details', { student });
            }
        })
        .catch(err => next(err));
});

//Edit student
router.get('/edit/:id', isLogedin, roleValidation([PM]), (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
        .then(student => {
            if (req.session.currentUser.role === PM) {
                const isPM = true;
                res.render('students/student-edit', { student, isPM });
            }
            else {
                res.render('students/student-edit', { student });
            }
        })
        .catch(err => next(err));
});

router.post('/edit/:id', isLogedin, roleValidation([PM]), (req, res, next) => {
    const { id } = req.params;
    const { username, email, description } = req.body;
    User.findByIdAndUpdate(id, { username, email, description }, { new: true })
        .then(student => {
            res.redirect(`/students/${student._id}`);
        })
        .catch(err => next(err));
});

//Delete student
router.post('/delete/:id', isLogedin, roleValidation([PM]), (req, res, next) => {
    const { id } = req.params;
    User.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/students');
        })
        .catch(err => next(err));
});

module.exports = router;

