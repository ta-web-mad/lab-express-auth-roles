const router = require("express").Router()
const { isLoggedIn, checkRoles, isOwner } = require("../middlewares/route.guard")
const User = require("./../models/User.model")


router.get("/students", isLoggedIn, (req, res, next) => {
    const currentUser = req.session.currentUser
    console.log(currentUser)
    User
        .find()
        .then(users => res.render("students/students-list", { users, currentUser }))
        .catch(err => console.log("el erro es ======> ", err))
})

router.get("/:id", isLoggedIn, (req, res, next) => {
    const userRole = {
        isPm: req.session.currentUser?.userRoles === "PM"
    }
    const { id } = req.params
    const isOwner = {

        is: (id == req.session.currentUser._id) ? true : false
    }
    User
        .findById(id)
        .then(user => res.render("students/student-details", { user, userRole, isOwner }))
        .catch(err => console.log("el erro es ======> ", err))
})

router.get("/:id/editar", isLoggedIn, isOwner, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(user => res.render("students/student-edit", user))
        .catch(err => console.log("ERROR =====> ", err))
})

router.post("/:id/editar", isLoggedIn, isOwner, (req, res, next) => {
    const { id } = req.params
    const { username, email, profileImage, description, userRoles } = req.body
    User
        .findByIdAndUpdate(id, { username, email, profileImage, description, userRoles })
        .then(() => res.redirect("/students"))
        .catch(err => console.log("ERROR =====> ", err))
})
module.exports = router
