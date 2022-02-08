const router = require("express").Router()

const { isLoggedIn } = require("../middleware/route-guard")

const User = require("../models/User.model")

const { isPM, isStudent } = require("../utils")

router.get("/", (req, res, next) => {
  res.render("index")
})

// ALL STUDENTS
router.get("/students", isLoggedIn, (req, res, next) => {
  User
    .find()
    .then(users => { res.render("users/allStudents", { users }) })
    .catch(err => next(err))
})


// STUDENT PROFILE
router.get("/students/:student_id", isLoggedIn, (req, res, next) => {

  const { student_id } = req.params

  User
    .findById(student_id)
    .then(user => res.render("users/student-profile", { user, isPM: isPM(req.session.currentUser) }))
    .catch(err => next(err))
})



//EDIT STUDENT
router.get("/students/:student_id/edit", isLoggedIn, (req, res, next) => {

  const { student_id } = req.params

  if (isPM(req.session.currentUser) || isStudent(student_id, req.session.currentUser.student_id)) {

    User
      .findById(student_id)
      .then(user => res.render("users/student-edit", { user }))
      .catch(err => next(err))
  }
})


router.post("/students/:student_id/edit", isLoggedIn, (req, res, next) => {

  const { student_id } = req.params
  const { username, email, profileImg, description, role } = req.body

  User
    .findByIdAndUpdate(student_id, { username, email, profileImg, description, role }, { new: true })
    .then(() => res.redirect("/students"))
    .catch(err => next(err))
})

// CAMBIAR ROL
router.post("/students/:student_id/editDev", isLoggedIn, (req, res, next) => {

  const { student_id } = req.params
  const { role } = req.body

  User
    .findByIdAndUpdate(student_id, { role: 'DEV' }, { new: true })
    .then(() => res.redirect("/students"))
    .catch(err => next(err))
})

router.post("/students/:student_id/editTA", isLoggedIn, (req, res, next) => {

  const { student_id } = req.params
  const { role } = req.body

  User
    .findByIdAndUpdate(student_id, { role: 'TA' }, { new: true })
    .then(() => res.redirect("/students"))
    .catch(err => next(err))
})


// DELETE STUDENT
router.post("/students/:student_id/delete", isLoggedIn, (req, res, next) => {

  const { student_id } = req.params

  User
    .findByIdAndDelete(student_id)
    .then(student => res.redirect("/students"))
    .catch(err => next(err))
})







module.exports = router