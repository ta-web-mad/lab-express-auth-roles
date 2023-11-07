const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkUser } = require("../middleware/route-guard")
const { isLoggedOut } = require("../middleware/route-guard")
const { checkRole } = require("../middleware/route-guard")


// Students list

router.get("/alumnos", isLoggedIn, (req, res, next) => {

    User
        .find({ role: "STUDENT" })
        .then(students => res.render("students/list", { students }))
        .catch(err => console.log(err))

})

// Students detail list

router.get("/alumnos/:user_id", isLoggedIn, (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(student => res.render("students/details", {
            student: student,
            isPM: req.session.currentUser.role === "PM"
        }))
        .catch(err => console.log(err))
})

router.get("/alumnos/editar/:user_id", isLoggedIn, checkUser('PM'), (req, res) => {

    const { user_id } = req.params

    //creo que la he líado aquí
    User
        .findById(user_id)
        .then(student => res.render("students/edit", {
            student: student,
            isPM: req.session.currentUser.role === "PM",
            isUser: req.session.currentUser.role === "STUDENT"
        }))
        .catch(err => console.log(err))
})

router.post("/alumnos/editar/:user_id", isLoggedIn, checkUser('PM'), (req, res) => {

    const { email, username, imageURL, description } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { email, username, imageURL, description })
        .then(() => res.redirect(`/alumnos/${user_id}`))
        .catch(err => console.log(err))
})

router.post("/alumnos/eliminar/:user_id", isLoggedIn, checkRole('PM'), (req, res) => {

    const { user_id } = req.params


    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect("/alumnos"))
        .catch(err => console.log(err))
})

router.post("/alumnos/roles/:user_id/TA", isLoggedIn, checkRole("PM"), (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { role: "TA" })
        .then(() => res.redirect(("/alumnos")))
        .catch(err => console.log(err))
})

router.post("/alumnos/roles/:user_id/DEV", isLoggedIn, checkRole("PM"), (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { role: "DEV" })
        .then(() => res.redirect(("/alumnos")))
        .catch(err => console.log(err))
})

module.exports = router
