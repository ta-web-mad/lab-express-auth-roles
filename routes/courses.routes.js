const router = require("express").Router()

const { checkRole } = require("../middleware/route-guard")
const Course = require("./../models/Course.model")
const User = require("./../models/User.model")

const { isPM, isTA, ownStudent } = require("./../utils/sameStudent")

router.get('/', (req, res) => {
    Course
        .find()
        .then(courses => {
            res.render('courses/courses.hbs', { courses, ta: isTA(req.session.currentUser) })
        })
        .catch(err => console.log(err))
})

router.get("/create", checkRole("TA"),(req, res, next) => {
    User
        .find()
        .then(users => {
            res.render('courses/new-course', { users })
        })
        .catch(err => console.log(err))
})

router.post('/create', checkRole("TA"), (req, res) => {
    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    Course
        .create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(() => {
            res.redirect(`/courses`)
        })
        .catch(err => console.log(err))
})

router.get('/:id', checkRole("TA"), (req, res) => {

    const { id } = req.params

    Course
        .findById(id)
        .populate("ta")
        .populate("leadTeacher")
        .populate("students")
        .then(detCourse => {
            res.render('courses/course-details', detCourse)
        })
        .catch(err => console.log(err))
})

router.post('/:id/delete', checkRole("TA"), (req, res) => {

    const { id } = req.params

    Course
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/courses')
        })
        .catch(err => console.log(err))
})

router.get('/:id/edit', checkRole("TA"), (req, res) => {

    const { id } = req.params

    Course
        .findById(id)
        .then(editCourse => {
            User
                .find()
                .then(editUser => {
                    res.render('courses/edit-course', { editUser, editCourse })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

module.exports = router