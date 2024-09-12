const router = require("express").Router()
const { isLoggedIn } = require("../middleware/route-guard");
const User = require("../models/User.model")

//LISTA DE ESTUDIANTES 

router.get("/students", (req, res, next) => {

    User
    .find()
    .then(allStudents => res.render("users/lista-student", {allStudents}))
    .catch(err => console.log(err))

 
})

// perfil
 router.get("/students/:id", isLoggedIn, (req, res, next) => {
    
   const { id } = req.params;

 User
    .findById(id)
   .then(students => {
    res.render("users/student-details", students);
    })
   .catch((err) => console.log(err))
 }); 










 

module.exports = router
