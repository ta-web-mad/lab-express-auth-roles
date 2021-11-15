const { capitalizeText, checkMongoID, isAdmin, isOwner } = require("../utils");
const { isLoggedIn, checkRoles } = require("../middlewares")
const router = require("express").Router();
// const { isLoggedIn, checkRoles } = require("../middlewares")
const User = require("../models/User.model")

//Listado de estudiantes
router.get("/students", isLoggedIn, (req, res) => {

    User.find()
      .then(allStudents => res.render("students/student-list", { allStudents }))
      .catch(err => console.log(err))
  
});

//Detalles
router.get("/students/:id", isLoggedIn, checkRoles("PM","STUDENT", "TA", "DEV"), (req, res) => {
    const { id } = req.params
  
    if (!checkMongoID(id)) {
      res.render("students/student-details", { errorMessage: "Este libro no existe en la DB" })
    }

    User.findById(id)
      .then(student => {
        // const isOwn = isOwner(book, req.session.currentUser)
        res.render("students/student-details", {
            loggedUser: req.session.currentUser,
            student,
            isOwn: req.session.currentUser._id == id,
            isAdmin: isAdmin(req.session.currentUser)
          })
      })
      .catch(err => console.log(err))
  
  })


//Edit
router.get("/students/edit/:id", isLoggedIn, checkRoles("PM","STUDENT", "TA", "DEV"), (req, res) => {
    const { id } = req.params

    User.findById(id)
        .then(student => res.render("students/student-edit", {
            loggedUser: req.session.currentUser,
            student,
            isAdmin: isAdmin(req.session.currentUser)
        }))
        .catch(err => console.log(err))
})

router.post("/students/edit/:id", isLoggedIn, (req, res) => {
    const { id } = req.params
    const { username, name, profileImg, description, role } = req.body

    Book.findByIdAndUpdate(id, { username, name, profileImg, description, role }, { new: true })
        .then(student => res.redirect(`/students/${student._id}`))
        .catch(err => console.log(err))
})

//Delete
router.get("/students/delete/:id", isLoggedIn, (req, res) => {
    const { id } = req.params
    User.findByIdAndDelete(id)
        .then(() => res.redirect("/students"))
        .catch(err => console.log(err))
  })



module.exports = router;