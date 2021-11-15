const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require("../middlewares");
const { isPm } = require("../utils")

// Users show

router.get('/estudiantes', isLoggedIn, (req, res) => {
    User.find()
        .then(student => res.render('users/students', { student }))
        .catch(err => console.log(err))
})


// Users details

router.get('/estudiantes/:id', isLoggedIn, (req, res) => {
    const { id } = req.params
    const isPM = isPm(req.session.currentUser)

    User.findById(id)
        .then(student => {
            res.render('users/student-details', { student, isPM })
        })
        .catch(err => console.log(err))

})


// User delete

router.get('/estudiantes/borrar/:id', isLoggedIn, checkRoles("PM"), (req, res) => {

    const { id } = req.params

    User.findByIdAndDelete(id)
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))

})


// User edit

router.get('/estudiantes/editar/:id', isLoggedIn, checkRoles("PM"), (req, res) => {

    const { id } = req.params
    const isPM = isPm(req.session.currentUser)

    console.log("----------------------------------------------", id)
    
    User.findById(id)
        .then(student => res.render("users/student-edit", {student, isPM}))
        .catch(err => console.log(err))

})


router.post('/estudiantes/editar/:id', isLoggedIn, checkRoles("PM"), (req, res) => {

    const {id} = req.params
    const { role } = req.body
    
    User.findByIdAndUpdate(id, { role }, {new: true})
        .then(student => res.render(`/users/student-details/${student._id}`))
        .catch(err => console.log(err))

})









module.exports = router




















// NO SIRVE PARA NADA EN PRINCIPIO

// router.get("/", isLoggedIn, checkRoles("PM"), (req, res, next) => {

//     User.find()
//         .then(allUsers => res.render("users/students",
//             {
//                 loggedUser: req.session.currentUser,
//                 allUsers,
//                 isPm: isPm(req.session.currentUser)
//             }))


// });