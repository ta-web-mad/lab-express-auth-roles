const router = require('express').Router();
const User = require('../models/User.model');
const { STUDENT, PM } = require('../const/user.const');
const isLogedin = require('../middleware/islogedin.middleware');
const { roleValidation } = require('../middleware/roles.middleware');

const { compare, compare2 } = require('../utils/compareID');
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
    const { currentUser } = req.session;
    User.findById(id)
        .then(student => {
            if (req.session.currentUser.role === PM) {
                const isPM = true;
                res.render('students/student-details', { student, isPM });
            }
            else if (id.toString() === currentUser._id.toString()) {
                const canEditMyself = true;
                res.render('students/student-details', { student, canEditMyself });
            }
            else {
                res.render('students/student-details', { student });
            }
        })
        .catch(err => next(err));
});

//Edit student
router.get('/edit/:id', isLogedin, roleValidation([STUDENT, PM]), (req, res, next) => {
    const { id } = req.params;
    const { currentUser } = req.session;
    User.findById(id)
        .then(student => {
            // console.log(id.toString());
            // console.log(req.session.currentUser._id.toString());
            if (currentUser.role === PM) {
                const isPM = true;
                res.render('students/student-edit', { student, isPM });
            }
            else if (id.toString() === currentUser._id.toString()) {
                const canEditMyself = true;
                // console.log('====================================');
                // console.log("COSA");
                // console.log('====================================');
                res.render('students/student-edit', { student, canEditMyself });
            }
            else {
                res.redirect('/');
            }
        })
        .catch(err => next(err));
});

router.post('/edit/:id', isLogedin, roleValidation([STUDENT, PM]), (req, res, next) => {
    const { id } = req.params;
    const { currentUser } = req.session;
    const { username, email, description } = req.body;
    User.findByIdAndUpdate(id, { username, email, description }, { new: true })
        .then(() => {
            if (currentUser.role === PM) {
                res.redirect(`/students/${id}`);
            }
            else if (id.toString() === currentUser._id.toString()) {
                res.redirect(`/students/${id}`);
            } else {
                // res.redirect(`/students/${student._id}`);
                res.redirect('/');
            }
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

//Upgrade student
router.post('/upgrade/:id', isLogedin, roleValidation([PM]), (req, res, next) => {
    const { id } = req.params;
    const { newRole } = req.body;
    console.log(newRole);
    User.findByIdAndUpdate(id, { role: newRole }, { new: true })
        .then(() => {
            res.redirect('/students');
        })
        .catch(err => next(err));
});


module.exports = router;

