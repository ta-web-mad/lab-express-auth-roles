const router = require("express").Router();
const { isLoggedIn, checkRole } = require("../middlewares/route-guard");
const User = require('./../models/Course.model')


// CREAR CURSOS
router.get('/create', (req, res) => {
    Courses
        .find()
        .then(newCourse => {
            res.render('courses', { newCourse })
        })
        .catch(err => console.log(err))
})


router.post('/create', (req, res) => {

    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status } = req.body

    Courses
        .create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status })
        .then(() => {
            res.redirect('/courses')
        })
        .catch(err => console.log(err))
})


// router.get('/', isLoggedIn, checkRole, (req, res) => {
//     const isTA = req.session.currentUser.role === 'TA'

//     Course
//         .find()
//         .then(courses => {
//             res.render('students', { courses, isTA })
//         })
//         .catch(err => console.log(err))
// })



module.exports = router;