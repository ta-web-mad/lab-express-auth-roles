const router = require("express").Router()

const { all } = require("express/lib/application")
const { isLoggedIn, checkRole } = require("../middleware/route-guard")
const User = require("../models/User.model")
const { isStudent, isPm, isSameStudent} = require("../utils")


// Student list
router.get("/estudiantes", isLoggedIn,  (req, res, next)=> {
    User
        .find({role: "STUDENT"})
        .then(allStudents => res.render("students/student-list", {allStudents}))
        .catch(error => next(error))
})

//Student profile
router.get("/estudiantes/:id", isLoggedIn, (req,res,next)=>{
    const userId = req.params.id
    
    User
    .findById(userId)
   
    .then(user =>  
        res.render("students/student-details", {
        user,
        isPm: isPm(req.session.currentUser),
        isSameStudent: isSameStudent(userId, req.session.currentUser._id)
        
    }))
    .catch(error => next(error))
})




module.exports = router