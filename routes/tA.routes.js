const router = require("express").Router()

const Course = require('../models/Course.model')
const User = require('../models/User.model')

const { isLoggedIn, checkRole } = require('./../middlewares/route-guard')


router.get("/TA/createCourses", isLoggedIn, checkRole("TA"), (req, res, next) => {

    //    .find({ $or: [{ roles: "DEV" }, { roles: "TA" }] })
    User
        .find({ roles: "DEV" })
        .then(userDev => {
            User
                .find({ roles: "TA" })
                .then(userTA => {
                    User
                        .find({ roles: "STUDENT" })
                        .then(userStudents => {
                            res.render('TA/createCourses', { userDev, userTA, userStudents })
                        })
                })
        })
        .catch(err => console.log(err))
})

router.post("/TA/createCourses", isLoggedIn, checkRole("TA"), (req, res, next) => {

    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body

    Course
        .create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(() => {
            res.redirect(`/students`)
        })
        .catch(err => {
            console.log(err)
            res.render('/TA/createCourses')
        })
})

router.get("/TA/listaCursos", isLoggedIn, checkRole("TA"), (req, res, next) => {

    Course
        .find()
        .populate("leadTeacher")
        .populate("ta")
        .populate("students")
        .then(courses => {
            res.render("TA/listCourses", { courses })
        })
        .catch(err => console.log(err))
})

router.post("/TA/Eliminar/:id", isLoggedIn, checkRole("TA"), (req, res, next) => {

    const { id } = req.params
    console.log(id)

    Course
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/TA/listaCursos')
        })
        .catch(err => console.log(err))

})

router.get("/TA/Editar/:id", isLoggedIn, checkRole("TA"), (req, res, next) => {

    const { id } = req.params

    Course
        .findById(id)
        .then(newCourse => {
            res.render('TA/editCourse', newCourse)
        })
        .catch(err => console.log(err))

})




module.exports = router