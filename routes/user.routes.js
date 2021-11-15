const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require("../middlewares");

// Users show

router.get('/estudiantes', isLoggedIn, (req, res) => {
    User.find()
        .then(student => res.render('users/students', { student }))
        .catch(err => console.log(err))
})


// Users details

router.get('/estudiantes/:id', isLoggedIn, (req, res) => {
    const { id } = req.params
    User.findById(id)
    .then(student => res.render('users/student-details', student))
    .catch(err => console.log(err))

})






module.exports = router