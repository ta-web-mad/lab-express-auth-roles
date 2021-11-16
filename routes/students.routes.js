const router = require("express").Router();
const { isLoggedIn, checkRoles } = require("../middlewares")
const User = require("./../models/User.model");
const { isPm } = require("../utils");

/* GET home page */

router.get("/students", isLoggedIn, (req, res, next) => {
   User.find()
    .then((allStudents) =>{
        res.render("roles/students-list", {allStudents, isPm: isPm(req.session.currentUser)});
    })
    .catch((err) => console.error(err))
});


router.get("/students/:id", isLoggedIn, (req, res) => {
  const { id } = req.params
  
    User.findById(id)
    .then((student)=> res.render("roles/students-details", {student, isPm: isPm(req.session.currentUser)}))
    
  });


router.get("/students/delete/:id", checkRoles("PM"), (req, res) => {
  const { id } = req.params
  User.findByIdAndRemove(id)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

router.get("/students/edit/:id", isLoggedIn, checkRoles("PM"), (req, res) => {
  const { id } = req.params

  User.findById(id)
    .then(user => res.render("roles/students-edit", user))
    .catch(err => console.log(err))

})

router.post("/students/edit/:id", isLoggedIn, checkRoles("PM"),(req, res) => {
  const { id } = req.params
  const { name } = req.body

  User.findByIdAndUpdate(id, { name }, { new: true })
    .then(user => res.redirect(`/students/details/${User._id}`))
    .catch(err => console.log(err))
})


module.exports = router

