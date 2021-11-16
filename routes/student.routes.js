const router = require("express").Router();
const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require("../middlewares")
const { isPM } = require("../utils")

router.get("/students", isLoggedIn, (req, res) => {

    User.find()
      .then(allStudents => res.render("students/students-list", { allStudents }))
      .catch(err => console.log(err))
  
  });

//DETALLES
router.get("/students/:id", (req, res) => {
    const { id } = req.params
  
    User.findById(id)
    
      .then(user => {

        res.render("students/student-details", {loggedUser: req.session.currentUser, user, isPM:  isPM(req.session.currentUser) })
      })
      .catch(err => console.log(err))
  
})


// EDIT
router.get("/students/edit/:id", (req, res) => {
    const { id } = req.params
  
    User.findById(id)
      .then(book => res.render("students/students-edit", book))
      .catch(err => console.log(err))
  
  })
  
  router.post("/students/edit/:id", isLoggedIn, checkRoles("PM"), (req, res) => {
    const { id } = req.params
    const { username, profileImg, description, role } = req.body
  
    User.findByIdAndUpdate(id, {username, profileImg, description, role }, { new: true })
      .then(user => res.redirect(`/students/${user._id}`))
      .catch(err => console.log(err))
  })

 


// DELETE
router.get("/students/delete/:id", checkRoles("PM"), (req, res) => {
    const { id } = req.params
  
    User.findByIdAndDelete(id)
      .then(() => res.redirect("students/students-list"))
      .catch(err => console.log(err))
  
  })

module.exports = router;