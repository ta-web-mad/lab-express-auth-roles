const router = require("express").Router()
const { isLoggedIn, checkRole } = require('../middleware/guard')// y ya se podrá usar este middle ware
const User = require("../models/User.model")
const { isPM } = require("../util")
const { isTA } = require("../util")

router.get('/conditional-render', isLoggedIn, (req, res, next) => {

  res.render('role-rendered', {
    user: req.session.currentUser,
    isPM: isPM(req.session.currentUser),
  })
})
// listado de estudiantes

router.get('/list', isLoggedIn, (req, res, next) => {
  User
    .find()
    .then(students => {
      //console.log('estudiantes ===>', students)
      res.render('student/list', { students })
    })
    .catch(err => console.log(err))
})


router.get("/profile/:student_id", isLoggedIn, (req, res, next) => {
  const { student_id } = req.params
  //console.log ("llegue aqui")
  User
    .findById(student_id)
    .then((student) => res.render("student/profile", { student, isPM: isPM(req.session.currentUser),isTA:isTA(req.session.currentUser) }))
})

router.get("/profile/:student_id"), isLoggedIn, checkRole('PM','TA'), (req, res, next) => {

  const { student_id } = req.params
  const { username, email, password, profileImg, description } = req.body
  User
    .findByIdAndUpdate(student_id, { username, email, password, profileImg, description }, { user: true })
    .then(() => res.redirect("student/edit", { user: req.session.currentUSer }))
    .catch(err => console.log(err))
}///no se porque no redirije bien, no se si es el boton en el hbs del perfil que no lo dirije o la direccion get

router.post("/profile/:student_id"), isLoggedIn, checkRole('PM'), (req, res, next) => {
  console.log(req.body)
  const { student_id } = req.params
  user
    .findByIdAndUpdateDelete(student_id)
    .then(() => res.redirect("student/list"))
    .catch(err => console.log(err))
}///no se porque no redirije bien, no se si es el boton en el hbs del perfil que no lo dirije o la direccion get

router.post("/profile/:student_id"), isLoggedIn, checkRole('PM'), (req, res, next) => {
  console.log(req.body)
  const { student_id } = req.params
  user
    .findByIdAndUpdate(student_id,{role:"TA"},{new:true})
    .then(() => res.redirect("student/list"))
    .catch(err => console.log(err))
}
module.exports = router
