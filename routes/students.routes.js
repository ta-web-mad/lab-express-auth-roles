const router = require("express").Router()
const { isLoggedIn, checkRoles, checkIfCurrUser, checkIfCurrUserOrPM, checkId } = require("../middleware")
const {isRole} = require("../utils")
const User = require("../models/User.model")


router.get("/", isLoggedIn, (req, res) => {

    User
    .find({role: "STUDENT"})
    .select("username")
    .then((students) => {
        if(students.length !== 0) {
            res.render("students/student-list", {students})
        } else {
            res.redirect("/")
        }
    })
    .catch((err) => console.log(err))
})

router.get("/detalles/:id", checkId, isLoggedIn, (req, res) => {

    const { id } = req.params


    User
    .findOne({role: "STUDENT", _id: id})
    .then((student) => {
        res.render("students/student-details", 
        { 
            student,    
            isPM: isRole("PM", req), 
            isCurrStudent: req.session.currentUser?._id === id 
        })
    })
    .catch((err) => console.log(err))
})

router.post("/borrar/:id", checkId, checkRoles("PM"), (req, res) => {
    const { id } = req.params

    User
    .findByIdAndDelete(id)
    .then(() => {
        res.redirect("/estudiantes")
    })
    .catch((err) => console.log(err))
    
})

router.get("/editar/:id", checkId, checkRoles("PM", "STUDENT"), checkIfCurrUserOrPM,  (req, res) => {
  const { id } = req.params
  
    User
    .findById(id)
    .then ((student) => {
        res.render("students/student-edit", {
            student, 
            //isPM: req.session.currentUser?.role === 'PM',
            isPM: isRole("PM", req)
        })
    })
    .catch((err) => console.log(err))

})

router.post("/editar/:id", checkId, checkRoles("PM", "STUDENT"), checkIfCurrUserOrPM, (req, res) => {
    const { id } = req.params
    const { username, name, profileImg, description, role } = req.body

    User
    .findByIdAndUpdate(id, {username, name, profileImg, description, role})
    //revisar que si ya no es estudiante no redireccione a la lista de estudiantes
    .then(() => res.redirect(`/estudiantes`))
    .catch((err) => console.log(err))
}) 

router.post("/cambio-rol/:id/", checkId, checkRoles("PM"), (req, res) => {

    const { id } = req.params
    const { role } = req.query

    User
    .findOneAndUpdate({role: "STUDENT", _id: id}, {role})
    .then(() => res.redirect(`/estudiantes`))
    .catch((err) => console.log(err))
})

module.exports = router
