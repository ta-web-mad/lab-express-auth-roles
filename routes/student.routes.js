const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRoles, checkOwnerOrPm } = require("../middlewares/route.guard")



router.get("/students", isLoggedIn , (req, res, next) => {

  User
  .find({ "role": { "$ne": "PM" } })
  .then(students => res.render("students/list-page", {students}))
  .catch(err => console.log(err))

})



router.get("/student/:id_student", isLoggedIn , (req, res, next)=>{
  const {id_student} = req.params

  const userRole = {
    isProjectManager : req.session.currentUser?.role === 'PM',
    isOwner: req.session.currentUser?._id === id_student
  }

    User
    .findById(id_student)
    .then(student => res.render("students/profile-page", {student, userRole}))
    .catch(err => console.log(err))
})





router.get("/student/:id_student/edit", isLoggedIn , checkOwnerOrPm, (req, res) => {

    const {id_student} = req.params
   
    User
    .findById(id_student)
    .then(student => res.render("students/profile-edit-page", student))
    .catch(err => console.log(err))

})




router.post("/student/:id_student/edit", isLoggedIn, checkOwnerOrPm, (req, res) => {
    const {id_student} = req.params
    const {username, profileImg, description} = req.body

    User
    .findByIdAndUpdate(id_student, { username, profileImg, description })
    .then(() => res.redirect(`/student/${id_student}`))
    .catch(err => console.log(err))



})


module.exports = router
