const router = require("express").Router()
const { isLoggedIn, checkRoles } = require("../middlewares")
const mongoose = require('mongoose');
const User = require("../models/User.model");
const { isPM } = require("../utils");


router.get("/", isLoggedIn, (req, res, next) => {
    User.find()
    .then( allStudents => res.render("student/students-list", { allStudents, isPM: isPM(req.session.currentUser) }))
})

router.get("/students-list/:id", (req, res) => {
    const { id } = req.params

    User.findById( id )
    .then( (details, students) => res.render("student/students-details", { details } ))
    .catch(err => console.log(err))
})


module.exports = router