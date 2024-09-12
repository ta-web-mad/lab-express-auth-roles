const router = require("express").Router()
const User = require("../models/User.model")
const {roleValidation} = require("../middleware/roleValidation.middleware")
const {sameId} = require("../middleware/sameStudentId.middleware")

const {STUDENT, ROLES, PM, TA, DEV} =  require("../const/user.const")


router.get("/", roleValidation(ROLES), (req, res, next) => {
    User.find({role: STUDENT})
    .then((foundStudents)=>{
      res.render("students", {foundStudents})
    }) })
    
    
    router.get("/:id",roleValidation(ROLES), (req, res, next) => {
      let canPress = false
      let canDelete = false
      if(req.params.id === req.session.user._id || req.session.user.role === PM) {
        canPress = true
      }
      if(req.session.user.role === PM) {
        canDelete = true
      }
      const studentsId = req.params.id
      User.findById(studentsId) 
      .then((student)=> {
        res.render("stdProfile", {student, canPress, canDelete })
      })
    })
    
    router.get("/:id/edit",(req, res, next) => {
      const studentsId = req.params.id
      if(req.session.user){
        if(studentsId === req.session.user._id || req.session.user.role === PM) {
        User.findById(studentsId) 
      .then((student)=> {
        res.render("editStudent", student)
      })}
    } else {
        res.render ("/iniciar-sesion", {errMessage: 'No tienes permisos para editar'})
    }
      
      
    })

    router.get("/:id/delete", roleValidation([PM]),(req, res, next) => {
      const studentsId = req.params.id
      User.findByIdAndRemove(studentsId) 
      .then(()=> {
        res.render("students")
      })
    })
    
    router.post("/:id/edit", (req, res, next) => {
      const studentsId = req.params.id
      const {description, username, role} = req.body
      User.findByIdAndUpdate(studentsId, {description, username, role},{new: true})
      .then((user)=> {
        res.render("stdProfile", user)
      })
    })

    


module.exports = router