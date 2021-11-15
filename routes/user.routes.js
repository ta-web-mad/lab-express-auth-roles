const router = require("express").Router();
const { isLoggedIn, checkRoles } = require("../middlewares")
const { capitalizeText, checkMongoID, isOwner, isAdmin } = require("../utils");
const User = require("../models/User.model")


//router.get("/students", (req, res, next) => res.render('auth/login', { errorMsg: 'Tienes que registrarte para entrar a ver todos los estudiantes' }));

router.get("/students", isLoggedIn, checkRoles("PM", "STUDENT"), (req, res, next) => {

  User.find()
  .then(allStudents => {
    console.log("estoy entrando a buscar", allStudents)
    res.render("user/list-students", {
      loggedUser: req.session.currentUser,
      allStudents,
      isAdmin: isAdmin(req.session.currentUser),
    })})

  .catch(err => console.log(err))

});

router.get("/students/:id", (req, res, next) => {
  const { id } = req.params

  User.findById(id)
  .then(details => {
    console.log("estoy a los detalles del estudiante", details)
    res.render("user/details", {details})})

  .catch(err => console.log(err))

});






module.exports = router;


// Cree un /studentspunto final que enumere todos los estudiantes actuales de la plataforma.
// Incluya un botón Ver perfil del estudiante para cada estudiante de la lista. Ese botón debe llevar al usuario a una /students/:idURL, donde debe representar una bonita página de perfil con la información del estudiante que coincide con la ID en la URL.
// Evite el acceso a estas rutas para cualquier visitante no registrado.