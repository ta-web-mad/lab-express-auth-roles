const router = require("express").Router()

const { isLogged, checkRoles, checkOwnerOrPM} = require("../middlewares/route-guard")
const User = require('../models/User.model')
const Course = require('../models/Course.model')


router.get("/courses", checkRoles('PM','TA'), (req, res, next) => {

    Course.find()
    .then( courseList => res.render("courses/courseList" , {courseList}))
    .catch(error => next(error))

})

// -------------------------------------------------------------------------------------------------------------

router.get("/courses/create", checkRoles('PM','TA'), (req, res, next) => {

    promises = [
        User.find({ "role": {"$eq": "STUDENT"} } ) ,
        User.find({ "role": {"$eq": "TA"} } ) ,
        User.find({ "role": {"$eq": "PM"} } )
    ]

    Promise.all(promises)
    .then(results => res.render('courses/createCourse' , {students:results[0], tas:results[1], pms:results[2] }))



    // User.find({ "role": {"$eq": "STUDENT"} } )
    // .then( studentList => res.render('courses/createCourse' , {studentList}))
    // .catch(error => next(error))

})


router.post("/courses/create" , checkRoles('PM','TA') , (req, res, next) => {

    const {title, startDate, endDate, courseImg, description, leadTeacher, ta, students} = req.body
    
    Course.create({title, startDate, endDate, courseImg, description, leadTeacher, ta, students})
    // .then( course => res.send(course))
    .then( () => res.redirect('/courses'))
    .catch(error => next(error))

})

// -------------------------------------------------------------------------------------------------------------

router.get("/courses/:id", checkRoles('PM','TA'), (req, res, next) => {

    const {id} = req.params

    Course.findById(id)
    .populate('leadTeacher')
    .populate('ta')
    .populate('students')
    // .then( course => res.send(course))
    .then( course => res.render('courses/courseDetails' , course))
    .catch(error => next(error))

})

// -------------------------------------------------------------------------------------------------------------

router.post("/courses/:id/delete" , checkRoles('PM','TA') , (req, res, next) => {

    const {id} = req.params

    Course.findByIdAndDelete(id)
    .then( () => res.redirect('/courses')) 
    .catch(error => next(error))

})

// -------------------------------------------------------------------------------------------------------------

router.get("/courses/:id/edit", checkRoles('PM','TA'), (req, res, next) => {

    const {id} = req.params

    promises = [
        User.find({ "role": {"$eq": "STUDENT"} } ) ,
        User.find({ "role": {"$eq": "TA"} } ) ,
        User.find({ "role": {"$eq": "PM"} } ) ,
        Course.findById(id).populate('leadTeacher').populate('ta').populate('students')
    ]

    Promise.all(promises)
    .then(results => res.render('courses/editCourse' , {students:results[0], tas:results[1], pms:results[2], course:results[3]} ) )
    .catch(error => next(error))








    // User.find({ "role": {"$eq": "STUDENT"} } )
    // .then( studentList => res.render('courses/createCourse' , {studentList}))
    // .catch(error => next(error))

})


router.post("/courses/:id/edit" , checkRoles('PM','TA') , (req, res, next) => {

    const {title, startDate, endDate, courseImg, description, leadTeacher, ta, students} = req.body
    
    Course.create({title, startDate, endDate, courseImg, description, leadTeacher, ta, students})
    // .then( course => res.send(course))
    .then( () => res.redirect('/courses'))
    .catch(error => next(error))

})


module.exports = router
