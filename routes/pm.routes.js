const { isLoggedIn, checkRole } = require("../middleware/route-guard")
const User = require("../models/User.model")
const { isPm, isSameStudent} = require("../utils")

const router = require("express").Router()
 //PM delete
router.post("/estudiantes/:id", isLoggedIn, checkRole("PM"), (req, res, next) => {
    const stutendtId = req.params.id

    User
        .findByIdAndDelete(stutendtId)
        .then(()=> res.redirect("/estudiantes"))
        .catch(err => console.log(err))
})
 //PM edit render
router.get("/estudiantes/:id/editar", isLoggedIn,  checkRole("STUDENT", "PM"), (req, res, next) => {
    const studendtId = req.params.id
    
    User
        .findById(studendtId)
        .then(student => res.render("pm/student-edit", {
            student,
            isPm: isPm(req.session.currentUser),
            isSameStudent: isSameStudent(studendtId, req.session.currentUser._id)
        }))
        .catch(err => console.log(err))
})

//PM EDIT handle
router.post("/estudiantes/:id/editar", isLoggedIn, checkRole("PM"), (req, res, next) => {
    const studentId = req.params.id
    const {username, email, description, role} = req.body
   
    User
        .findByIdAndUpdate(studentId, {username, email, description, role}, {new:true})
        .then(updatedStudent => res.redirect(`/estudiantes/${updatedStudent._id}`) )
        .catch(err => console.log(err))
})





module.exports = router