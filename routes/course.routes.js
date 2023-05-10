const Course = require("../models/Course.model")
const router = require("express").Router()
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard')


router.get('/courses/add', isLoggedIn, checkRoles('TA'), (req, res, next) => {
    res.render('courses/course-add');
});

router.post('/courses/add', isLoggedIn, checkRoles('TA'), (req, res, next) => {
    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body;
    Course.create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(() => res.redirect('/courses'))
        .catch(err => console.log('Error adding a new course:', err));
});

router.get('/courses', isLoggedIn, checkRoles('TA'), (req, res, next) => {
    Course.find()
        .then(courses => res.render('course-list', { courses }))
        .catch(err => console.log('Error listing courses:', err));
});

// router.get('/courses/edit/:course_id', isLoggedIn, checkRoles('TA'), (req, res, next) => {
//     const { course_id } = req.params;
//     Course.findById(course_id)
//         .then(course => res.render('courses/edit-course', { course }))
//         .catch(err => console.log('Error displaying course edit page:', err));
// });

// router.post('/courses/edit/:course_id', isLoggedIn, checkRoles('TA'), (req, res, next) => {
//     const { course_id } = req.params;
//     const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body;
//     Course.findByIdAndUpdate(course_id, { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
//         .then(() => res.redirect(`/courses/${course_id}`))
//         .catch(err => console.log('Error editing course:', err));
// });

// router.post('/courses/delete/:course_id', isLoggedIn, checkRoles('TA'), (req, res, next) => {
//     const { course_id } = req.params;
//     Course.findByIdAndDelete(course_id)
//         .then(() => res.redirect('/courses'))
//         .catch(err => console.log('Error deleting course:', err));
// });

module.exports = router;

