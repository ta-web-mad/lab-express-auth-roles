const router = require("express").Router();
const {isLoggedIn,checkRoles} = require("../middlewares")
const User = require("../models/User.model")
const { isPM } = require("../utils")

/* GET home page */

router.get("/students",isLoggedIn, (req, res, next) => {
    User.find()
    .then((allStudents) => {res.render("students/student-list",{allStudents});
})
    .catch((err)=> console.log(error))
});

router.get("/students/:id", isLoggedIn, (req,res,next) => {
    const {id} = req.params 
    const imPm = isPM(req.session.currentUser)
    console.log(imPm);
    User.findById(id)
    .then((student)=> res.render("students/student-detail",{student,imPm}))
})

router.get("/students/delete/:id",checkRoles("PM"),(req,res)=>{
   const {id} =req.params
   User.findByIdAndDelete(id)
   .then(()=> res.redirect("/"))
   .catch(err=> console.log(err))
 })

 router.get("/students/edit/:id", isLoggedIn,checkRoles("PM"),(req, res) => {
  const { id } = req.params

  User.findById(id)
    .then(student => res.render("students/student-edit", student))
    .catch(err => console.log(err))

})

router.post("/students/edit/:id", isLoggedIn, checkRoles("PM"),(req, res) => {
  const { id } = req.params
  const { name } = req.body

  User.findByIdAndUpdate(id, { name }, { new: true })
    .then(user => res.redirect(`/students/details/${User._id}`))
    .catch(err => console.log(err))
})
 

module.exports = router;
