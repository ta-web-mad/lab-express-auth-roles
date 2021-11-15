const { isLoggedIn, checkRoles } = require("../middlewares")
const User = require("../models/User.model")
const { isPM } = require("../utils")

const router = require("express").Router()

router.get("/students/delete/:id", checkRoles("PM"), (req, res) => {
    const { id } = req.params
  
    User.findByIdAndDelete(id)
      .then((deleteStudent) => res.redirect("/student/delete-students", { deleteStudent }))
      .catch(err => console.log(err))
})

router.get("/students/edit/:id", isLoggedIn, checkRoles("PM"), (req, res) => {
    const { id } = req.params
  
    User.findById(id)
      .then(editStudent => res.render("student/edit-student", { editStudent }))
      .catch(err => console.log(err))
  })

router.post("/students/edit/:id", isLoggedIn ,checkRoles("PM"), (req, res) => {
    const { id } = req.params
    const { username, role } = req.body
  
    User.findByIdAndUpdate(id, { username, role }, { new: true })
      .then(res.redirect("/students"))
      .catch(err => console.log(err))
  })

module.exports = router

// isOwn : students.id == req.session.currentUser._id