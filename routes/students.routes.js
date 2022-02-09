const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, IsUserPMM } = require("../middlewares/route-guard")
const { IsUserPM, isUserOwnProfile } = require("../utils")

router.get("/",IsUserPMM, (req, res, next) => {
        User
           .find()
           .then(allStudents => res.render("./students/list", {user:req.session.currentUser,PM:true, allStudents}))
           .catch(err=> next(err))
      })
  
  router.get("/:id", isLoggedIn, (req, res, next) => {
  const isPM = IsUserPM(req.session.currentUser)
  const isOwner = isUserOwnProfile(req.session.currentUser._id, req.params.id)
    User
     .findById(req.params.id) 
     .then(student => res.render("./students/profile", {isPM, student, isOwner}))
     .catch(err=> next(err))
  })
  
  
  
  
  router.post("/:id/delete", (req, res, next) => {
    User
     .findByIdAndDelete(req.params.id) 
     .then(()=>res.redirect('/students'))
     .catch(err=> next(err))
  })
  
  
  
  
  router.post("/:id/edit", (req, res, next) => {
  const isPM = IsUserPM(req.session.currentUser)
    User
     .findById(req.params.id) 
     .then(foundStudent=>res.render('./students/edit', {isPM, foundStudent}))
     .catch(err=> next(err))
  })
  
  router.post("/:id/edited", (req, res, next) => {
    const { _id, username, email, profileImg, description, role } = req.body
    User
     .findByIdAndUpdate(req.params.id, { _id, username, email, profileImg, description, role }) 
     .then(()=>res.redirect('/students'))
     .catch(err=> next(err))
  })
  
  
  
  router.post("/:id/makeTA", (req, res, next) => {
    User
     .findByIdAndUpdate(req.params.id, {role:'TA'}) 
     .then(()=>res.redirect(`/students/${req.params.id}`))
     .catch(err=> next(err))
  })
  
  router.post("/:id/makeStudent", (req, res, next) => {
    User
     .findByIdAndUpdate(req.params.id, {role:'STUDENT'}) 
     .then(()=>res.redirect(`/students/${req.params.id}`))
     .catch(err=> next(err))
  })
  
  router.post("/:id/makeDev", (req, res, next) => {
    User
     .findByIdAndUpdate(req.params.id, {role:'DEV'}) 
     .then(()=>res.redirect(`/students/${req.params.id}`))
     .catch(err=> next(err))
  })
  

module.exports = router
