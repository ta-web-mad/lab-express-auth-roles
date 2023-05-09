const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User.model");
const saltRounds = 10;
//Esta constante requiere de los middlewares
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard');


// students list
router.get("/students", isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then(students => res.render('students/student-list', { students }))
        .catch(err => console.log(err))
});


//Students details
router.get("/students/:id", isLoggedIn, (req, res, next) => {

    const userRole = {
        isPm: req.session.currentUser?.role === 'PM',
        isTa: req.session.currentUser?.role === 'TA',
        isDEV: req.session.currentUser?.role === 'DEV',
        isStudent: req.session.currentUser?.role === 'STUDENT',
    }

    const { id: owner } = req.params

    User
        .findById(owner)
        .then(user => res.render('students/student-details', { user, userRole }))
        .catch(err => console.log(err))
});
router.get("/student/edit/:id", isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id: owner } = req.params

    User
        .findById(owner)
        .then(users => res.render(`students/edit-student`, users))
        .catch(err => console.log(err))
});
router.post('/student/edit/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { username, description, profileImg, role } = req.body

    const { id: owner } = req.params

    User
        .findByIdAndUpdate(owner, { username, profileImg, role, description })
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
});

router.post('/student/delete/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id: owner } = req.params

    User
        .findByIdAndDelete(owner)
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
});

router.post('/student/editTA/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    //const { username, description, profileImg, role } = req.body

    const { id: owner } = req.params

    User
        .findByIdAndUpdate(owner, { role: "TA" })
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
});
router.post('/student/editDEV/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    //const { username, description, profileImg, role } = req.body

    const { id: owner } = req.params

    User
        .findByIdAndUpdate(owner, { role: "DEV" })
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
});
//Esto es una vaina loca que me lleva a la gloria, son demasiadas horas ya...
router.post('/student/editByUser/:id', isLoggedIn, checkRoles('STUDENT'), (req, res, next) => {

    const { id: owner } = req.params

    User
        .findByIdAndUpdate(owner, { role: "STUDENT" })
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
});

//Esto exporta las rutas
module.exports = router;

