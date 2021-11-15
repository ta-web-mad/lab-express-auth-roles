const router = require("express").Router()
const User = require("../models/User.model")
const { capitalizeText, checkMongoID, isPM } = require("../utils");
const { isLoggedIn, checkRoles } = require("../middlewares")

// Lista de estudiantes
router.get('/students', isLoggedIn, (req, res) => {
  User.find()
  .then(allUsers => res.render('students/students', {users: allUsers}))
  .catch(err => console.log(err))
})

// Detalles de cada estudiante
router.get('/students/:id', isLoggedIn, checkRoles('STUDENT', 'DEV', 'TA', 'PM'), (req, res) => {
  const { id } = req.params

  if (!checkMongoID(id)) {
    res.render("students/student-details", { errorMessage: "Este libro no existe en la DB" })
  }

  User.findById(id)
  .then(user => {

    //const isOwn = isOwner(user, req.session.currentUser)

    res.render("students/student-details", {
      loggedUser: req.session.currentUser,
      isOwn: id==req.session.currentUser._id,
      user,
      isPM: isPM(req.session.currentUser)
    })
  })
  .catch(err => console.log(err))

})

// Editar detalles de estudiante
router.get("/students/edit/:id", isLoggedIn, checkRoles('STUDENT', 'DEV', 'TA', 'PM'), (req, res) => {
  const { id } = req.params
  User.findById(id)
  .then((user => {

    //const isOwn = isOwner(user, req.session.currentUser)

    res.render("students/student-edit", {
      loggedUser: req.session.currentUser,
      user,
      isPM: isPM(req.session.currentUser)
    })
  }))
  .catch(err => console.log(err))
})

router.post("/students/:id", isLoggedIn, checkRoles('STUDENT', 'DEV', 'TA', 'PM'), (req, res) => {
  const { id } = req.params
  const { username, name, description, profileImg, role } = req.body
  console.log(req.body)

  User.findByIdAndUpdate(id, { username, name, description, profileImg, role }, { new: true })
    .then(user => res.redirect(`/students/${user.id}`))
    .catch(err => console.log(err))
})

// Eliminar estudiante
router.get("/students/delete/:id", isLoggedIn, checkRoles('STUDENT', 'DEV', 'TA', 'PM'), (req, res) => {
  const { id } = req.params
  User.findByIdAndDelete(id)
  .then(() => res.redirect("/students"))
  .catch(err => console.log(err))
})

module.exports = router
