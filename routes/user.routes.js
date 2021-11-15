const router = require("express").Router()
const { isLoggedIn, checkRoles } = require("../middlewares")
const bcrypt = require('bcrypt')
const User = require("../models/User.model")
const { isPM } = require("../utils")


router.get("/", (req, res, next) => {

  User.find()
    .then(User => res.render("students/students", { User }))
    .catch(err => console.log(err))

});

router.get("/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params
  User
  .findById(id)
  .then((student) => {
      res.render('students/students-profile', {
      student,
      isPM: isPM(req.session.currentUser)
      })
  })
  .catch(err => console.log(err))
});
  
  router.post("/delete/:id", checkRoles("PM"), (req, res) => {
    const { id } = req.params
  
    User.findByIdAndDelete(id)
      .then(() => res.redirect("/"))
      .catch(err => console.log(err))
  
  })

  router.post("/edit/:id", checkRoles("PM"), (req, res) => {
    const { id } = req.params
    const { username, password, profileImg, description } = req.body
  
    User.findByIdAndUpdate(id, { username, password, profileImg, description }, { new: true })
    .then(() => res.redirect("/students"))
    .catch(err => console.log(err))
  })
  



module.exports = router