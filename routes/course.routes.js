const router = require("express").Router()
const bcrypt = require('bcryptjs')
const { send } = require("express/lib/response")
const User = require("../models/User.model")

const { isLoggedIn, isPmLogged, isTaLogged} = require('../middlewares/middlewares')
const Course = require("../models/Course.model")



router.get("/list",isLoggedIn,isTaLogged,(req, res, next)=>{
    Course
    .find()
        .populate('leadTeacher')
        .then(courses => res.render('course/course-list',{courses}))
        .catch(err => console.log(err))
    
})
router.get("/create-course", isLoggedIn, isTaLogged, (req, res, next) => {

    User
    .find()
    .then(users => {
        User
            .find({ roles:'TA'})
            .then(tas =>res.render('course/create-course', { users , tas }))
        })
    
})
router.post("/create-course", isLoggedIn, isTaLogged, (req, res, next) => {
    const { title, description, startDate, endDate, status, courseImg, students, leadTeacher } = req.body
    console.log(title,description,leadTeacher)
    // res.send(req.body)

    Course

        .create({ title, description, startDate, endDate, status, courseImg, students, leadTeacher })
        .then(()=>res.redirect("/course/list"))
        .catch(err => console.log(err))
})


router.post('/:id/delete',(req, res, next) => {
    const { id } = req.params
    Course
        .findByIdAndDelete(id)
        .then(() => res.redirect('/course/list'))
        .catch(err => console.log(err))
})

module.exports = router