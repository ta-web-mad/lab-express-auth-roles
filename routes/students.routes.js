const router = require("express").Router()
const User = require("../models/User.model")

router.get('/',(req, res,next) => {

    User.find()
    .then(allStudents => res.render('students/students-list',{allStudents}))

});

router.get("/:id", (req, res, next) => {
    const { id } = req.params
    User.findById(id)
        .then((student) => res.render("students/students-details", student))
})

module.exports = router