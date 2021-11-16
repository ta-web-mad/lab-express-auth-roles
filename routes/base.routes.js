const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require("../middleware")
const { isPM, isProfile } = require("../utils")

const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.render("index")
})

router.get("/students", isLoggedIn, (req, res, next) => {
  User.find()
    .then(allUsers => res.render("students/students-list", {allUsers, isPM: isPM(req.session.currentUser)}))
    .catch(err => console.log(err))
})


router.get("/students/:id", (req, res, next) => {
  const { id } = req.params
  User.findById(id)
    .then(student => res.render("students/student-profile", {student}))
    .catch(err => console.log(err))
})


router.get("/students/disintigrate/:id", (req, res) => {
  const { id } = req.params

  User.findByIdAndDelete(id)
    .then(() => res.redirect("/students"))
    .catch(err => console.log(err))

})


router.get("/students/edit/:id",isLoggedIn, (req, res, next) => {
  const { id } = req.params
  User.findById(id)
    .then(student => {
      res.render("students/edit-student", {student, isPM: isPM(req.session.currentUser)})})
    .catch(err => console.log(err))
})


router.post("/students/edit/:id", isLoggedIn, (req, res) => {
  const { id } = req.params
  const { username, name, description, profileImg, role } = req.body

  User.findByIdAndUpdate(id, { username, name, description, profileImg, role }, { new: true })
    .then(user => res.redirect(`/students/${user._id}`))
    .catch(err => console.log(err))
})




router.get("/students/edit/:id",isLoggedIn, (req, res, next) => {
  const { id } = req.params
  if (User.findById(id) === user._id) {
    res.render("students/edit-student", {student, isPM: isPM(req.session.currentUser)})
    
  }
})



module.exports = router