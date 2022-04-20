const router = require("express").Router()
const Course = require("../models/Course.model")
const User = require("../models/User.model")


const { isLoggedIn, checkRole, isPMorCurrentStudent } = require('../middlewares/route-guard')

router.get('/courses', isLoggedIn, (req, res, next) => {

    let isTA
    let isStudent
    if (req.session.currentUser){
        isTA = req.session.currentUser.role === 'TA'
        isStudent = req.session.currentUser.role === 'STUDENT'
    }
    else{
        isTA = false
        isStudent = false
    }
    Course
        .find()
        .then(courses => res.render('courses/courses', { courses, isTA, isStudent }))

})

router.get('/createcourse', (req, res, next) => {

    let data = {}
    User
        .find({ role: "TA" })
        .then(tas => {
            data.tas = tas
            console.log(data.tas)
            return User.find({ role: "STUDENT" })
        })

        // .find({ role: "STUDENT" })
        .then(students => {
            data.students = students
            console.log(data.students)
            res.render("courses/createcourse", data)
        })

})

router.post('/createcourse', (req, res, next) => {

    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body
    Course
        .create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(res.redirect("/courses"))
    // res.render("courses/createcourse")
    // Course
    //     .create()
    //     .then(courses => res.render('courses/courses', { courses }))

})




router.get('/courses/:id', isLoggedIn, (req, res, next) => {

    // const isEditor = req.session.currentUser.role === 'EDITOR'
    let courseFound = true
    const { id } = req.params
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        Course
            .findById(req.params.id)
            .populate('ta')
            .populate("students")
            .then(course => {
                if (!course) {
                    courseFound = false
                }
                res.render('courses/course', { course, courseFound, badId: false })
            })
            .catch(error => next(error));
    }
    else res.render('courses/course', { badId: true })

})

router.get('/courses/:id/edit', isLoggedIn, checkRole("TA"), (req, res, next) => {


    // const isPM = req.session.currentUser.role === 'PM'
    // const isEditor = req.session.currentUser.role === 'EDITOR'
    let data = {}
    User
        .find({ role: "TA" })
        .then(tas => {
            data.tas = tas
            console.log(data.tas)
            return User.find({ role: "STUDENT" })
        })

        // .find({ role: "STUDENT" })
        .then(students => {
            data.students = students
            console.log(data.students)
            res.render("courses/createcourse", data)
        })
    Course
        .findById(req.params.id)
        .then(course => res.render('courses/edit-course', { course, data }))
        .catch(error => next(error));
})




router.post('/courses/:id/edit', isLoggedIn, checkRole("TA"), (req, res, next) => {


    // const isPM = req.session.currentUser.role === 'PM'
    // const isEditor = req.session.currentUser.role === 'EDITOR'
    const { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students } = req.body
    Course
        .findByIdAndUpdate(req.params.id, { title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students })
        .then(user => res.redirect(`/courses/${req.params.id}`))
        .catch(error => next(error));

})

router.post('/courses/:id/join', isLoggedIn, checkRole("STUDENT"), (req, res, next) => {

    const { id } = req.params
    const userId = req.session.currentUser._id
    Course
        .findByIdAndUpdate(id, { $push: { students: userId } }, { new: true })
        .then(course => {
            console.log(course)
            res.redirect("/courses")
        })
})

router.post('/courses/:id/delete', isLoggedIn, checkRole("TA"), (req, res, next) => {

    Course
        .findByIdAndRemove(req.params.id)
        .then(course => res.redirect('/courses'))
        .catch(error => next(error));

})

module.exports = router
