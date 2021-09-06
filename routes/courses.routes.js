const router = require("express").Router()
const Course = require("../models/Course.model")
const { isLoggedIn, checkRoles } = require("../middleware")
const { isRole } = require("../utils")
const User = require("../models/User.model")


router.get("/", isLoggedIn, (req, res) => {

    Course
    .find()
    .select("title")
    .then((courses) => {
        //MOVER ISROLE A UTILS
        res.render("courses/courses-list", {courses, isTA: req.session.currentUser?.role === "TA"})
    })
    .catch((err) => console.log(err))
})

router.get("/crear", checkRoles("TA"), (req, res) => {

    const courseInfo = {}

    User
    .find({role: "TA"})
    .then((tas) => {
        courseInfo.tas = tas
        return User.find({role: "STUDENT"})
    })
    .then((students) => {
        courseInfo.students = students
        return User.find({role: "TEACHER"})
    })
    .then((teachers) => {
        courseInfo.teachers = teachers
        return Course.find()
    })
    .then((courses) => {
        courseInfo.courses = courses
        return res.render("courses/courses-create", {courseInfo})
    })
    .catch((err) => console.log(err))

})

router.post('/crear', (req, res) => {

    const { title, leadTeacher, startData, endDate, ta, courseImg, description, status, students } = req.body
  
    Course
      .create({ title, leadTeacher, startData, endDate, ta, courseImg, description, status, students })
      .then(course => res.redirect(`/cursos/`))
      .catch(err => console.log(err))
})

router.get('/detalles/:id', (req, res) => {
    const { id } = req.params

    Course
        .findById(id)
        //FORMAT DATE PENDING
        .then((course) => res.render("courses/course-details", {course, isTA: req.session.currentUser?.role === "TA"}))
        .catch(err => console.log(err))
})

router.get('/editar/:id', checkRoles("TA"), (req, res) => {

    const { id } = req.params

    const courseInfo = {}

    User
    .find({role: "TA"})
    .then((tas) => {
        courseInfo.tas = tas
        return User.find({role: "STUDENT"})
    })
    .then((students) => {
        courseInfo.students = students
        return User.find({role: "TEACHER"})
    })
    .then((teachers) => {
        courseInfo.teachers = teachers
        return Course.findById(id)
    })
    .then((course) => {
        courseInfo.course = course
        return res.render("courses/course-edit", courseInfo)
    })
    .catch(err => console.log(err))
})

router.post('/editar/:id', checkRoles("TA"), (req, res) => {

    const { id } = req.params
    const { title, leadTeacher, startData, endDate, ta, courseImg, description, status, students } = req.body

    Course
        .findByIdAndUpdate(id, { title, leadTeacher, startData, endDate, ta, courseImg, description, status, students })
        .then( () => res.redirect("/cursos"))
        .catch(err => console.log(err))
})

router.get("/borrar/:id", checkRoles("TA"), (req, res) => {
    const { id } = req.params

    Course
    .findByIdAndDelete(id)
    .then(() => {
        res.redirect("/cursos")
    })
    .catch((err) => console.log(err))
    
})



module.exports = router