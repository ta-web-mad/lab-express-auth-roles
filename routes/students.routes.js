const router = require("express").Router()
const routes = require(".")
const User = require("../models/User.model")
const { nonLogged } = require('../middlewares')

router.get("/students", (req, res, next) => {
    User.find()
        .then((allStudents) => res.render("students/students-list", { allStudents }))

})

router.get("/students-profile/:id", nonLogged, (req, res, next) => {

    User.findById(req.params.id)
        .then((student) => res.render("students/students-profile", student))

})

router.get("/students-edit/:id", (req, res, next) => {

    User.findById(req.params.id)
        .then((student) => res.render("students/students-edit", student))
})

module.exports = router
