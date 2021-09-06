const router = require("express").Router()
const { isLoggedIn, checkRoles, checkIfCurrUser, checkIfCurrUserOrPM } = require("../middleware")
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

router.get("/detalles/:id", isLoggedIn, (req, res) => {

    const { id } = req.params


    User
    .findOne({role: "STUDENT", _id: id})
    .then((student) => {
        res.render("students/student-details", 
        { 
            student, 
            isPM: req.session.currentUser?.role === 'PM', 
            isCurrStudent: req.session.currentUser?._id === id 
        })
    })
    .catch((err) => console.log(err))
})

router.post("/borrar/:id", checkRoles("PM"), (req, res) => {
    const { id } = req.params

    User
    .findByIdAndDelete(id)
    .then(() => {
        res.redirect("/estudiantes")
    })
    .catch((err) => console.log(err))
    
})

router.get("/editar/:id", checkRoles("PM", "STUDENT"), checkIfCurrUserOrPM,  (req, res) => {
  const { id } = req.params
  
    User
    .findById(id)
    .then ((student) => {
        res.render("students/student-edit", {student, isPM: req.session.currentUser?.role === 'PM'} )
    })
    .catch((err) => console.log(err))

})

router.post("/editar/:id", checkRoles("PM"), (req, res) => {
    const { id } = req.params
    const { username, name, profileImg, description, role } = req.body

    User
    .findByIdAndUpdate(id, {username, name, profileImg, description, role})
    //revisar que si ya no es estudiante no redireccione a la lista de estudiantes
    .then(() => res.redirect(`/estudiantes`))
    .catch((err) => console.log(err))
}) 

router.post("/cambio-rol/:id/",  checkRoles("PM"), (req, res) => {

    const { id } = req.params
    const { role } = req.query

    User
    .findOneAndUpdate({role: "STUDENT", _id: id}, {role})
    .then(() => res.redirect(`/estudiantes`))
    .catch((err) => console.log(err))
})

module.exports = router
