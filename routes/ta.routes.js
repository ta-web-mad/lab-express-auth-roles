const router = require("express").Router()
const User = require("../models/User.model")
const Course = require("../models/Course.model")




router.get("/courses-create", (req, res) => {
    res.render("courses/courses-create-page")
})

router.post("/courses-create", (req, res) => {
    const {title,leadTeacher, ta, description, status, students} = req.body
    
    console.log(title,leadTeacher, ta, description, status, students)
    
    Course
    .create({title,leadTeacher, ta, description, status, students})
    .then(course=> console.log("Curso creado en BBDD:", course))
    .catch(err => console.log(err))
    
})


router.get("/courses", (req, res) => {

    
   Course.find()
   .then(courses => res.render("courses/courses-list-page",{courses} ))
   .catch(err => console.log(err))

})


module.exports = router
