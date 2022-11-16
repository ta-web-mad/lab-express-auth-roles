const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn } = require("../middleware/route.guard")

router.get("/list", isLoggedIn, (req, res) => {
    if (!req.app.locals.isPM) {
        User
            .find({ role: "STUDENT" })
            .select({ username: 1, email: 1, profileImg: 1, description: 1, role: 1 })
            .then(students => res.render("students/student-list", { students }))
            .catch(err => console.log(err))
    } else {
        User
            .find()
            .select({ username: 1, email: 1, profileImg: 1, description: 1, role: 1 })
            .then(students => res.render("students/student-list", { students }))
            .catch(err => console.log(err))

    }

})

router.get("/:studentID", isLoggedIn, (req, res) => {
    let isStudent = false
    const { studentID } = req.params
    if (studentID == req.session.currentUser._id) isStudent = true

    User
        .findById(studentID)
        //.select({ username: 1, email: 1, profileImg: 1, description: 1, role: 1 })
        .then(student => res.render("students/student-profile", { student, isStudent }))
        .catch(err => console.log(err))
})

router.get("/:studentID/edit", isLoggedIn, (req, res) => {
    let isStudent = false
    const { studentID } = req.params
    if (studentID === req.session.currentUser._id) isStudent = true

    if (!req.app.locals.isPM && !isStudent) res.render("students/student-list", { errorMessage: "No tiene permisos para editar este usuario" })

    User
        .findById(studentID)
        .then(student => res.render("students/edit-student", { student, isStudent }))
        .catch(err => console.log(err))
})

router.post("/:studentID/edit", isLoggedIn, (req, res) => {
    const { studentID } = req.params
    let isStudent = false
    if (studentID === req.session.currentUser._id) isStudent = true

    if (!req.app.locals.isPM && !isStudent) res.render("students/student-list", { errorMessage: "No tiene permisos para editar este usuario" })
    const { email, username, profileImg, description } = req.body

    User.
        findByIdAndUpdate(studentID, { email, username, profileImg, description })
        .then(() => res.redirect("/students/list"))
        .catch(err => console.log(err))
})

router.post("/:studentID/delete", isLoggedIn, (req, res) => {
    const { studentID } = req.params

    if (!req.app.locals.isPM) res.render("students/student-list", { errorMessage: "No tiene permisos para eliminar usuarios" })

    User.
        findByIdAndDelete(studentID)
        .then(() => res.redirect("/students/list"))
        .catch((err) => console.log(err))
})

router.get("/:studentID/updateTA", isLoggedIn, (req, res) => {
    const { studentID } = req.params

    if (!req.app.locals.isPM) res.render("students/student-list", { errorMessage: "No tiene permisos para ascender a nadie" })

    User
        .findByIdAndUpdate(studentID, { role: "TA" })
        .then(() => res.redirect("/students/list"))
        .catch((err) => console.log(err))
})

router.get("/:studentID/updateDEV", isLoggedIn, (req, res) => {
    const { studentID } = req.params

    if (!req.app.locals.isPM) res.render("students/student-list", { errorMessage: "No tiene permisos para ascender a nadie" })

    User
        .findByIdAndUpdate(studentID, { role: "DEV" }, { next: true })
        .then(() => res.redirect("/students/list"))
        .catch((err) => console.log(err))
})
module.exports = router