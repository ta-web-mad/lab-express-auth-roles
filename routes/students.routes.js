const router = require("express").Router();
const mongoose = require("mongoose")
const { isLoggedIn } = require("../middlewares")
const User = require("../models/User.model")
const { isPm, isOwner } = require("../utils")


router.get("/students", isLoggedIn, (req, res, next) => {

    User.find()
      .then(allStudents => res.render("students/students-list", { allStudents }))
  
  });

  router.get("/students/:id", isLoggedIn,(req, res, next) => {
    const { id } =req.params
    User.findById(id)
    .then((student) => {
      res.render("students/student-details",  {isPm: isPm(req.session.currentUser), student, isOwner: isOwner(student, req.session.currentUser)})
    })
    .catch( err => req.redirect("/students", {err}))
  });

  router.get("/students/editar/:id", isLoggedIn,(req, res, next) => {

    const { id } =req.params
    User.findById(id)
    .then(student => res.render("students/student-editar",  {isPm: isPm(req.session.currentUser), student}))
    .catch( err => req.redirect("/students", {err}))
  });

  router.post("/students/editar/:id", isLoggedIn,(req, res, next) => {
    const { id } = req.params
    const { name, description, password, profileImg } = req.body
    User.findByIdAndUpdate(id, {name, description, password, profileImg }, { new: true })
    .then(student => res.render("students/student-editar",  {isPm: isPm(req.session.currentUser), student}))
    .catch( err => req.redirect("/students", {err}))

  });


  router.get("/students/borrar/:id", isLoggedIn,(req, res, next) => {
    const { id } =req.params
    User.findByIdAndDelete(id)
    .then(() => res.redirect("/students"))
    .catch(err => res.render("students/student-details", {err}))
    
  });

  router.get("/students/editar/:id/role/:newrole",isLoggedIn,(req, res, next) =>{
    const { id, newrole } =req.params
    User.findByIdAndUpdate(id, {role: newrole}, { new: true })
    .then(student => res.render("students/student-editar",  {isPm: isPm(req.session.currentUser), student}))
    .catch(err => res.render("students/student-editar",  {isPm: isPm(req.session.currentUser), student}))
  })

  

module.exports = router;