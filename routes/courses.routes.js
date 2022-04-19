
const router = require('express').Router()

const { isLoggedIn, checkRole } = require('./../middleware/route-guard')

const Student = require('../models/User.model');
const Course = require("../models/Course.model")


router.get("/courses", isLoggedIn, (req, res, next) => {

    const isTA = req.session.currentUser.role === 'TA'

    Course
        .find()
        .then(courses => {
            res.render('courses/courses-list', {courses, isTA})
        })
        .catch(err => console.log(err))

})


// Create Courses
router.get("courses/create", isLoggedIn, checkRole('TA'), (req, res, next) => {
   
  User
    .find({ role: { $ne: 'PM' } })
    .then(users => res.render('courses/create-course-page', {users} ))
})


router.post("courses/create", isLoggedIn, checkRole('TA'), (req, res, next) => {
    const { title, leadTeacher, startDate, endDate, description, ta } = req.body

    Course
        .create({ title, leadTeacher, startDate, endDate, description, ta })
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))

})


// router.get('/courses/:id/edit', isLoggedIn, checkRole('TA'), (req, res, next) => {

//     const { id } = req.params


//     Course
//         .findById(id)
//         .then(course => {
//             res.render('course/edit-course', course)
//         })
//         .catch(err => console.log(err))
// })

// router.post('/courses/:id/edit', isLoggedIn, checkRole('TA'), (req, res, next) => {

//     const { title, leadTeacher, startDate, endDate, description, ta } = req.body
//     const { id } = req.params
    

//    Course
//         .findByIdAndUpdate(id, { title, leadTeacher, startDate, endDate, description, ta })
//         .then(() => {
//             res.redirect("/courses")
//         })
//         .catch(err => {
//             res.redirect(`/courses/${id}`)
//             console.log(err)
//         })
// })

      
// router.post("/courses/:id/delete", isLoggedIn, checkRole('TA'), (req, res, next) => {

//     const { id } = req.params;
    
//    Course
//         .findByIdAndDelete(id)
//         .then(course => res.redirect("/courses"))
//         .catch((err) => console.log(err))
//     })





module.exports = router 