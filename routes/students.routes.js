const express = require("express")
const router = express.Router()

const User = require("../models/User.model")
const { isLoggedIn, checkRole, checkPMorOwner } = require("../middleware/route-guard")


router.get("/list", isLoggedIn, (req, res) => {
    const { _id } = req.params

    console.log("este es el del user conectado", req.session.currentUser._id)
    console.log("este es el id del perfil que estas viendo", _id)

    User
        .find({ role: "STUDENT" })
        .then(student => res.render("list",
            {
                student: student,
                isAdminOrOwner: req.session.currentUser.role === "PM" || req.session.currentUser._id === student._id,
            }
        ))
        .catch(err => console.log("ERROR", err))
})

router.get("/student/:_id", isLoggedIn, (req, res) => {
    const { _id } = req.params
    User
        .findById(_id)
        .then(student => res.render("student-info", student))
        .catch(err => console.log("ERROR", err))
})

router.get("/student/editar/:_id", isLoggedIn, checkPMorOwner, (req, res) => {
    const { _id } = req.params

    User
        .findById(_id)
        .then(student => res.render("edit-student", student))
        .catch(err => console.log("ERROR", err))

})

router.post("/student/editar/:_id", isLoggedIn, checkPMorOwner, (req, res) => {
    const { username, email, password, description, role } = req.body
    const { _id } = req.params
    User
        .findByIdAndUpdate(_id, { username, email, password, description, role })
        .then(() => res.redirect("/list"))
        .catch(err => console.log("ERROR", err))
})


router.post("/student/eliminar/:_id", isLoggedIn, checkRole("PM"), (req, res) => {
    const { _id } = req.params
    User
        .findByIdAndDelete(_id)
        .then(() => res.redirect("/list"))
        .catch(err => console.log("ERROR", err))
})

router.post("/student/editar/:_id/change", isLoggedIn, checkRole("PM"), (req, res) => {
    const { role } = req.body
    const { _id } = req.params
    User
        .findByIdAndUpdate(_id, { role })
        .then(() => res.redirect("/list"))
        .catch(err => console.log("ERROR", err))
})


module.exports = router