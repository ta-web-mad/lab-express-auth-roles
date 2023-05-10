const router = require("express").Router()
const { isLoggedIn, checkRoles, checkIfOwnerOrPM } = require("../middlewares/route-guard")
const User = require("../models/User.model")

router.get('/students', isLoggedIn, (req, res, next) => {
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
      }
      User
      .find({role: "STUDENT"})
      .then(user => {
        res.render('list/students', {user, userRole})})
      .catch(err => console.log(err))
    })
    
router.get('/students/:_id', isLoggedIn, (req, res, next)=> {

    const {_id} = req.params

    const userRole = {
            isPM: req.session.currentUser?.role === 'PM',
            isOwner: req.session.currentUser?._id === _id
        }

    User
    .findById(_id)
    .then( student => res.render('list/detail', {student, userRole}))
    .catch( err=>console.log(err) )
})

router.get('/students/:_id/edit', checkIfOwnerOrPM, (req, res, next) => {
   const {_id} = req.params 
   const userRole = {
    isPM: req.session.currentUser?.role === 'PM',
  }
    User
    .findById(_id)
    .then(student => res.render('editUser/edit-user', student))
    .catch(err => console.log(err))
})

router.post('/students/:_id/edit',checkIfOwnerOrPM, (req, res, next) => {
   const {_id} = req.params
   const {username, email, description, profileImg} = req.body

     User
    .findByIdAndUpdate(_id, {username, email, description,profileImg})
    .then(() => res.redirect(`/students`))
    .catch(err => console.log(err)) 
})

router.post('/students/:_id/makeDEV', checkRoles("PM"), (req, res, next) => {

    const { _id} = req.params

    User
   .findByIdAndUpdate(_id , {role: "DEV"})
   .then(res.redirect('/students'))
   .catch(err => console.log(err)) 
})

router.post('/students/:_id/makeTA', checkRoles("PM"), (req, res, next) => {

    const { _id } = req.params
  User
   .findByIdAndUpdate(_id , {role: "TA"})
   .then(res.redirect('/students'))
   .catch(err => console.log(err))  
})

router.post('/students/:_id/delete', checkRoles("PM"), (req, res, next) => {
     const { _id } = req.params
   User
    .findByIdAndDelete(_id)
    .then(() => res.redirect('/students'))
    .catch(err => console.log(err)) 
})

module.exports = router