const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const Course = require("../models/Course.model")

const { isLoggedIn, isLoggedOut, checkRoles, checkUser } = require('../middlewares/route-guard')


///lista de cursos
router.get('/courses', (req, res, next) => {

    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
        isDEV: req.session.currentUser?.role === 'DEV',
        isTA: req.session.currentUser?.role === 'TA'
    }

    Course
        .find()
        .then(allCourses => {
            res.render('courses/courses-list', { userRole, allCourses })
        })
        .catch(err => console.log(err))

})


///creacion de cursos
router.get('/courses-create', isLoggedIn, checkRoles('TA'), (req, res, next) => {


    User
        .find()
        .then(allUsers => {
            const tas = allUsers.filter((user) => user.role === 'TA')
            const pms = allUsers.filter((user) => user.role === 'PM')
            const students = allUsers.filter((user) => user.role === 'STUDENT')
            res.render('courses/courses-create', { tas, pms, students })
        })
        .catch(err => console.log(err))
})
router.post('/courses-create', (req, res, next) => {
    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body;

    Course.create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(allCourses => {
            User.findByIdAndUpdate(leadTeacher, ta, students, { $push: { courses: allCourses._id } });
        })
        .then(() => res.redirect('courses/courses-list'))
        .catch(err => {
            console.log(`Err while creating the post in the DB: ${err}`);
            next(err);
        });

})


module.exports = router