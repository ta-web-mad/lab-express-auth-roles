const router = require("express").Router()
const { isLoggedIn } = require("../middleware")
const User = require("../models/User.model")


router.get("/", isLoggedIn, (req, res) => {

    User
    .find({role: "STUDENT"})
    .select("username")
    .then((students) => {
        res.render("students/student-list", {students})
    })
    .catch((err) => console.log(err))
})

router.get("/details/:id", isLoggedIn, (req, res) => {

    const { id } = req.params

    User
    .findById(id)
    .then((student) => {
        res.render("students/student-details", student)
    })
    .catch((err) => console.log(err))
})

module.exports = router
