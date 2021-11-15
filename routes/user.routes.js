const { capitalizeText, checkMongoID, isAdmin, isOwner } = require("../utils");
const { isLoggedIn, checkRoles } = require("../middlewares")
const User = require("../models/User.model")
const router = require("express").Router();

router.get("/students", isLoggedIn, (req, res) => {

    User.find()
      .then(allStudents => res.render("students/students-list", { allStudents }))
      .catch(err => console.log(err))

});

router.get("/students/:id", isLoggedIn, checkRoles("PM","STUDENT", "TA", "DEV"), (req, res) => {
    const { id } = req.params

    if (!checkMongoID(id)) {
      res.render("students/student-details", { errorMessage: "Este estudiante no existe en la DB" })
    }

    User.findById(id)
      .then(student => {
        res.render("students/student-details", {
            loggedUser: req.session.currentUser,
            student,
            capitalizeText, //no sé por qué esto no funciona =(
            isOwn: req.session.currentUser._id == id,
            isAdmin: isAdmin(req.session.currentUser)
          })
      })
      .catch(err => console.log(err))

  })


  router.get("/students/edit/:id", isLoggedIn, (req, res) => {
    const { id } = req.params
  
    User.findById(id)
      .then(user => res.render("students/student-edit", user))
      .catch(err => console.log(err))
  
  })
  
  router.post("/students/edit/:id", isLoggedIn, (req, res) => {
    const { id } = req.params
    const { nickname, name, description, role} = req.body
  
    User.findByIdAndUpdate(id, { nickname, name, description, role }, { new: true })
      .then(user => res.redirect(`/student/details/${user._id}`))
      .catch(err => console.log(err))
  })
  

module.exports = router; 


