const router = require("express").Router()
const { isLoggedIn, checkRoles, checkIdUser } = require('./../middlewares/router-guard')


const Course = require('./../models/Course.model')
const User = require('./../models/User.model')

// Create Course
router.get("/new/course", checkRoles("TA"), (req, res, next) => {
    User
        .find()
        .then(users => res.render("course/new-course", { users }))
        .catch(err => console.log(err))
})

// Create Course
router.post('/new/course', checkRoles("TA"), (req, res, next) => {
    const { title, startDate, endDate, description, courseImg, status, leadTeacher, students, ta } = req.body
    Course
        .create({ title, startDate, endDate, description, courseImg, status, leadTeacher, students, ta })
        .then(newCourse => res.redirect("/"))
        .catch(err => console.log(err))
})

// Course List
router.get('/courses', (req, res, next) => {
    const userRole = {
        isTA: req.session.currentUser?.role === 'TA'
    }
    Course
        .find()
        .then(courses => {
            res.render('course/course-list', { courses, userRole })
        })
        .catch(err => console.log(err))
})

// Course details
router.get('/course/details/:course_id', isLoggedIn, (req, res, next) => {

    const { course_id } = req.params
    Course
        .findById(course_id)
        .populate('students')
        .then(courseFound => {
            res.render('course/course-details', courseFound)
        })
        .catch(err => console.log(err))
})

// Edit Course (render) PRIVATE

router.get('/edit/course/details/:course_id', isLoggedIn, checkRoles('TA'), (req, res, next) => {
    const { course_id } = req.params
    const promises = [
        Course.findById(course_id),
        User.find()
    ]
    Promise
        .all(promises)
        .then(promisesResponse => {
            const courseFound = promisesResponse[0]
            const users = promisesResponse[1]
            res.render('course/course-edit', { courseFound, users })
        }).catch(err => console.log(err))

})

//////////////////////////////77 Add User Course///////////////////////////////////////////////
router.post('/ad/students/course/:course_id', isLoggedIn, checkRoles('STUDENT'), (req, res, next) => {
    const { course_id } = req.params

    Course
        .findByIdAndUpdate(course_id, { students: req.session.currentUser })
        .then(() => res.redirect('/courses'))
        .catch(err => console.log(err))
})

// Edit Course profile (handler) PRIVATE

router.post('/edit/course/details/:course_id', isLoggedIn, checkRoles('TA'), (req, res, next) => {

    const { title, startDate, endDate, description, courseImg, status, leadTeacher, students, ta } = req.body
    const { course_id } = req.params

    Course
        .findByIdAndUpdate(course_id, { title, startDate, endDate, description, courseImg, status, leadTeacher, students, ta })
        .then(() => res.redirect('/courses'))
        .catch(err => console.log(err))
})

// Delete Course

router.post('/delete/course/:course_id', isLoggedIn, checkRoles('TA'), (req, res, next) => {
    const { course_id } = req.params
    Course
        .findByIdAndDelete(course_id)
        .then(() => res.redirect('/courses'))
        .catch(err => console.log(err))
})



module.exports = router
