const router = require("express").Router()
const User = require("../models/User.model")
const Course = require("../models/Course.model")
const { isLoggedIn, checkRoles } = require("../middleware/route.guard")

router.get("/", isLoggedIn, (req, res) => {
    res.render("courses/list")
})

router.get("/create", isLoggedIn, checkRoles("TA"), (req, res) => {

    let devStudents = User
        .find({ role: "DEV" })
        .then(devStaff => devStaff)
        .catch(err => console.log(err))

    let taStudents = User
        .find({ role: "TA" })
        .then(taStaff => {
            return taStaff
        })
        .catch(err => console.log(err))

    Promise.all([devStudents, taStudents])
        .then(res.send({ devStudents, taStudents }))


})

module.exports = router
